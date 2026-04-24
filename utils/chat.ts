"use server";

import { headers } from "next/headers";
import { generateGeminiText } from "@/lib/gemini";
import { createAdminClient } from "@/lib/supabase/admin";
import { PORTFOLIO_CONTEXT } from "@/utils/ai-context";
import type { GeminiMessage } from "@/lib/gemini";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  status: "success" | "error" | "rate_limited";
  message: string;
  retryAfterSeconds?: number;
}

export interface ChatRequestMetadata {
  visitorId: string;
  chatSessionId: string;
}

const DEFAULT_CHAT_ERROR =
  "I can't answer that right now. Please try again in a moment.";
const MAX_PROMPT_LENGTH = 1000;
const SESSION_COOLDOWN_SECONDS = 3;
const VISITOR_LIMIT_PER_MINUTE = 6;
const VISITOR_LIMIT_PER_HOUR = 20;
const IP_LIMIT_PER_10_MINUTES = 20;
const CHAT_LOG_TABLE = "portfolio_chat_user_prompts";

function getIsoDateOffset({
  minutes = 0,
  hours = 0,
  seconds = 0,
}: {
  minutes?: number;
  hours?: number;
  seconds?: number;
}) {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  date.setHours(date.getHours() - hours);
  date.setSeconds(date.getSeconds() - seconds);
  return date.toISOString();
}

function getClientIp(forwardedFor: string | null, realIp: string | null) {
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return realIp?.trim() || null;
}

function getLatestUserPrompt(messages: ChatMessage[]) {
  return (
    [...messages]
      .reverse()
      .find((message) => message.role === "user" && message.content.trim())
      ?.content.trim() ?? ""
  );
}

function getMessageIndex(messages: ChatMessage[]) {
  return messages.filter((message) => message.role === "user").length;
}

async function getRateLimitState({
  visitorId,
  chatSessionId,
  ipAddress,
}: {
  visitorId: string;
  chatSessionId: string;
  ipAddress: string | null;
}) {
  const supabase = createAdminClient();
  const [
    recentSessionResult,
    visitorMinuteResult,
    visitorHourResult,
    ipWindowResult,
  ] = await Promise.all([
    supabase
      .from(CHAT_LOG_TABLE)
      .select("created_at", { count: "exact" })
      .eq("chat_session_id", chatSessionId)
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from(CHAT_LOG_TABLE)
      .select("*", { count: "exact", head: true })
      .eq("visitor_id", visitorId)
      .gte("created_at", getIsoDateOffset({ minutes: 1 })),
    supabase
      .from(CHAT_LOG_TABLE)
      .select("*", { count: "exact", head: true })
      .eq("visitor_id", visitorId)
      .gte("created_at", getIsoDateOffset({ hours: 1 })),
    ipAddress
      ? supabase
          .from(CHAT_LOG_TABLE)
          .select("*", { count: "exact", head: true })
          .eq("ip_address", ipAddress)
          .gte("created_at", getIsoDateOffset({ minutes: 10 }))
      : Promise.resolve({ count: 0, error: null }),
  ]);

  if (recentSessionResult.error) {
    throw recentSessionResult.error;
  }

  if (visitorMinuteResult.error) {
    throw visitorMinuteResult.error;
  }

  if (visitorHourResult.error) {
    throw visitorHourResult.error;
  }

  if (ipWindowResult.error) {
    throw ipWindowResult.error;
  }

  const latestSessionMessage = recentSessionResult.data?.[0];

  if (latestSessionMessage?.created_at) {
    const elapsedMs =
      Date.now() - new Date(latestSessionMessage.created_at).getTime();
    const retryAfterSeconds = Math.ceil(
      (SESSION_COOLDOWN_SECONDS * 1000 - elapsedMs) / 1000,
    );

    if (retryAfterSeconds > 0) {
      return {
        limited: true,
        retryAfterSeconds,
        internalReason: "Session cooldown limit reached",
        userMessage: `Please wait ${retryAfterSeconds}s before sending another message.`,
      };
    }
  }

  if ((visitorMinuteResult.count ?? 0) >= VISITOR_LIMIT_PER_MINUTE) {
    return {
      limited: true,
      retryAfterSeconds: 60,
      internalReason: "Visitor minute limit reached",
      userMessage: "Too many messages in a short time. Please wait a minute.",
    };
  }

  if ((visitorHourResult.count ?? 0) >= VISITOR_LIMIT_PER_HOUR) {
    return {
      limited: true,
      retryAfterSeconds: 60 * 10,
      internalReason: "Visitor hourly limit reached",
      userMessage:
        "This chat has hit its hourly limit. Please try again a bit later.",
    };
  }

  if ((ipWindowResult.count ?? 0) >= IP_LIMIT_PER_10_MINUTES) {
    return {
      limited: true,
      retryAfterSeconds: 60 * 10,
      internalReason: "IP limit reached",
      userMessage:
        "Too many requests from this connection. Please try again later.",
    };
  }

  return {
    limited: false,
  };
}

async function savePortfolioChatLog({
  visitorId,
  chatSessionId,
  ipAddress,
  messageIndex,
  userPrompt,
  systemResponse,
  status,
  errorMessage,
}: {
  visitorId: string;
  chatSessionId: string;
  ipAddress: string | null;
  messageIndex: number;
  userPrompt: string;
  systemResponse: string;
  status: ChatResponse["status"];
  errorMessage?: string | null;
}) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from(CHAT_LOG_TABLE)
      .insert({
        visitor_id: visitorId,
        chat_session_id: chatSessionId,
        ip_address: ipAddress,
        message_index: messageIndex,
        user_prompt: userPrompt,
        system_response: systemResponse,
        status,
        error_message: errorMessage ?? null,
      });

    if (error) {
      console.error("Failed to save portfolio chat log:", error.message);
    }
  } catch (error) {
    console.error("Failed to initialize portfolio chat log:", error);
  }
}

export async function askPortfolioChat(
  messages: ChatMessage[],
  metadata: ChatRequestMetadata,
): Promise<ChatResponse> {
  const userPrompt = getLatestUserPrompt(messages);
  const messageIndex = getMessageIndex(messages);
  const headerStore = await headers();
  const ipAddress = getClientIp(
    headerStore.get("x-forwarded-for"),
    headerStore.get("x-real-ip"),
  );
  const sanitizedMessages: GeminiMessage[] = messages
    .filter((message) => message.content.trim())
    .slice(-12)
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      text: message.content.trim(),
    }));

  try {
    if (!userPrompt) {
      return {
        status: "error",
        message: DEFAULT_CHAT_ERROR,
      };
    }

    if (userPrompt.length > MAX_PROMPT_LENGTH) {
      const message = `Please keep the message under ${MAX_PROMPT_LENGTH} characters.`;

      await savePortfolioChatLog({
        visitorId: metadata.visitorId,
        chatSessionId: metadata.chatSessionId,
        ipAddress,
        messageIndex,
        userPrompt,
        systemResponse: message,
        status: "error",
        errorMessage: "Prompt exceeded max length",
      });

      return {
        status: "error",
        message,
      };
    }

    const rateLimitState = await getRateLimitState({
      visitorId: metadata.visitorId,
      chatSessionId: metadata.chatSessionId,
      ipAddress,
    });

    if (rateLimitState.limited) {
      const rateLimitedMessage =
        rateLimitState.userMessage ??
        "Too many requests right now. Please try again shortly.";
      const internalReason =
        rateLimitState.internalReason ?? "Rate limit triggered";

      await savePortfolioChatLog({
        visitorId: metadata.visitorId,
        chatSessionId: metadata.chatSessionId,
        ipAddress,
        messageIndex,
        userPrompt,
        systemResponse: rateLimitedMessage,
        status: "rate_limited",
        errorMessage: internalReason,
      });

      return {
        status: "rate_limited",
        message: rateLimitedMessage,
        retryAfterSeconds: rateLimitState.retryAfterSeconds,
      };
    }

    const message = await generateGeminiText({
      prompt: sanitizedMessages.at(-1)?.text || "",
      systemInstruction: `You are Ivan Assistant on Ivan Xará's portfolio.

Role:
- Answer as a knowledgeable assistant about Ivan.
- Never pretend to be Ivan.
- Refer to Ivan in the third person.

Tone:
- Sound natural, warm, and human.
- Sound slightly informal, relaxed, and easy to talk to.
- Sound like a real person explaining Ivan's work, not like a corporate bio or AI-generated summary.
- Prefer plain English, short sentences, and everyday wording.
- Be confident without sounding promotional or exaggerated.
- Avoid robotic wording, resume language, polished slogans, and generic filler.

Style:
- Keep default answers very short: usually 1 to 2 sentences.
- Stay within 1 to 4 lines unless the user clearly asks for more detail, a breakdown, an explanation, or examples.
- If the question is simple, answer with the shortest useful reply.
- Use longer answers only when the user explicitly wants depth.
- Default to natural prose, not bullet points, unless the question clearly needs a list.
- Vary sentence openings so responses do not feel templated.
- If the user asks a casual question, answer casually.
- Do not use em dashes or dash-based phrasing inside sentences.
- Avoid sentence structures that sound too polished or too "written by AI".
- Prefer direct, conversational phrasing over layered summaries.

Accuracy:
- Only use the knowledge base below.
- If something is missing or uncertain, say so plainly instead of guessing.
- Do not invent metrics, company details, project details, or personal traits.
- For private projects, clearly say the repository or code cannot be shared.
- When relevant, include full direct links for LinkedIn, GitHub, email, or public repositories.

Good response examples:
- "Ivan is really strong when the work sits between business needs and implementation."
- "zoho2git probably stands out the most because it solved a real problem inside the Zoho ecosystem."
- "Most of his day-to-day work is around Zoho CRM and Zoho Creator, with Next.js and Supabase coming in when the product needs more flexibility."

Avoid responses like:
- "Ivan is a highly motivated professional with a strong passion for technology."
- "He excels in dynamic environments and delivers innovative solutions."
- "As an AI assistant, I can tell you..."
- "Ivan is strongest where business logic, operations, and implementation meet."
- "discipline-like version control and global search into the Zoho ecosystem"

Length examples:
- Good for normal questions: "He is strongest where business needs and implementation meet. That mix shows up a lot in his Zoho and product work."
- Good for direct questions: "zoho2git probably stands out most. It solved a real problem inside the Zoho ecosystem."
- Only go longer when the user asks something like "can you explain more?", "give me a breakdown", or "tell me in detail".

${PORTFOLIO_CONTEXT}`,
      messages: sanitizedMessages,
      responseMimeType: "text/plain",
      maxOutputTokens: 220,
      temperature: 0.7,
    });

    await savePortfolioChatLog({
      visitorId: metadata.visitorId,
      chatSessionId: metadata.chatSessionId,
      ipAddress,
      messageIndex,
      userPrompt,
      systemResponse: message,
      status: "success",
    });

    return {
      status: "success",
      message,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Gemini error";

    await savePortfolioChatLog({
      visitorId: metadata.visitorId,
      chatSessionId: metadata.chatSessionId,
      ipAddress,
      messageIndex,
      userPrompt,
      systemResponse: DEFAULT_CHAT_ERROR,
      status: "error",
      errorMessage,
    });

    return {
      status: "error",
      message: DEFAULT_CHAT_ERROR,
    };
  }
}
