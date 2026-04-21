"use server";

import { generateGeminiText } from "@/lib/gemini";
import { PORTFOLIO_CONTEXT } from "@/utils/ai-context";
import type { GeminiMessage } from "@/lib/gemini";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  status: "success" | "error";
  message: string;
}

const DEFAULT_CHAT_ERROR =
  "I can't answer that right now. Please try again in a moment.";

export async function askPortfolioChat(
  messages: ChatMessage[],
): Promise<ChatResponse> {
  const sanitizedMessages: GeminiMessage[] = messages
    .filter((message) => message.content.trim())
    .slice(-12)
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      text: message.content.trim(),
    }));

  try {
    const message = await generateGeminiText({
      prompt: sanitizedMessages.at(-1)?.text || "",
      systemInstruction: `You are Ivan Assistant speaking on Ivan Xara's portfolio.

Your job is to answer as Ivan's assistant, representing him professionally.
Do not speak as if you are Ivan.
Refer to Ivan in the third person.
The tone should feel clear, human, confident, and professional, without sounding stiff or corporate.
Use small, easy-to-understand sentences and simple wording.
Only give a longer answer if the user explicitly asks for more detail, a deeper explanation, or a more complete breakdown.
Do not over-explain.
Do not sound robotic, generic, or overly promotional.
Only use the portfolio context below. If something is missing, say so plainly.

Rules: Keep answers short by default ( 1-3 lines ), if necessary use more.

${PORTFOLIO_CONTEXT}`,
      messages: sanitizedMessages,
      responseMimeType: "text/plain",
      maxOutputTokens: 320,
      temperature: 0.55,
    });

    return {
      status: "success",
      message,
    };
  } catch (error) {
    return {
      status: "error",
      message: DEFAULT_CHAT_ERROR,
    };
  }
}
