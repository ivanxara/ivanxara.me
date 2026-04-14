import "server-only";

type GeminiInlineFile = {
  data: string;
  mimeType: string;
};

type GeminiRole = "user" | "model";

type GeminiMessage = {
  role: GeminiRole;
  text: string;
};

type GenerateGeminiContentParams = {
  prompt: string;
  systemInstruction: string;
  inlineFiles?: GeminiInlineFile[];
  responseMimeType?: string;
  responseSchema?: Record<string, unknown>;
  messages?: GeminiMessage[];
  model?: string;
  maxOutputTokens?: number;
  temperature?: number;
};

type GeminiPart = {
  text?: string;
  inlineData?: {
    data: string;
    mimeType: string;
  };
};

type GeminiCandidate = {
  finishReason?: string;
  content?: {
    parts?: GeminiPart[];
  };
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
  error?: {
    message?: string;
  };
};

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-3.1-flash-lite-preview";
const INCOMPLETE_ENDING_PATTERN = /[\(\["'/:,-]\s*$/;

const extractGeminiText = (data: GeminiResponse) =>
  data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

const shouldRetryIncompleteResponse = (
  text: string,
  finishReason?: string,
  maxOutputTokens?: number,
) => {
  if (!text) {
    return false;
  }

  if (finishReason === "MAX_TOKENS") {
    return true;
  }

  if ((maxOutputTokens || 0) < 300) {
    return false;
  }

  return INCOMPLETE_ENDING_PATTERN.test(text);
};

const normalizeJsonText = (text: string) =>
  text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

export const generateGeminiText = async ({
  prompt,
  systemInstruction,
  inlineFiles = [],
  responseMimeType = "text/plain",
  responseSchema,
  messages = [],
  model = process.env.GEMINI_MODEL || DEFAULT_MODEL,
  maxOutputTokens = 220,
  temperature = 0.5,
}: GenerateGeminiContentParams) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const contents =
    messages.length > 0
      ? messages
          .filter((message) => message.text.trim())
          .map((message) => ({
            role: message.role,
            parts: [{ text: message.text.trim() }],
          }))
      : [
          {
            role: "user" as const,
            parts: [
              { text: prompt },
              ...inlineFiles.map((file) => ({
                inlineData: {
                  data: file.data,
                  mimeType: file.mimeType,
                },
              })),
            ],
          },
        ];

  const response = await fetch(`${GEMINI_API_URL}/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemInstruction }],
      },
      contents,
      generationConfig: {
        temperature,
        maxOutputTokens,
        responseMimeType,
        responseSchema,
      },
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as GeminiResponse;

  if (!response.ok) {
    throw new Error(data.error?.message || "Gemini request failed");
  }

  const text = extractGeminiText(data);
  const finishReason = data.candidates?.[0]?.finishReason;

  if (!text) {
    throw new Error("Empty model response");
  }

  if (shouldRetryIncompleteResponse(text, finishReason, maxOutputTokens)) {
    const retryResponse = await fetch(
      `${GEMINI_API_URL}/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: `${systemInstruction}\n\nReturn one complete answer. Do not stop mid-sentence, mid-list, or after an opening parenthesis.`,
              },
            ],
          },
          contents,
          generationConfig: {
            temperature,
            maxOutputTokens: Math.max(maxOutputTokens * 2, 600),
            responseMimeType,
            responseSchema,
          },
        }),
        cache: "no-store",
      },
    );

    const retryData = (await retryResponse.json()) as GeminiResponse;

    if (!retryResponse.ok) {
      throw new Error(retryData.error?.message || "Gemini retry failed");
    }

    const retryText = extractGeminiText(retryData);

    if (retryText) {
      return retryText;
    }
  }

  return text;
};

export const generateGeminiContent = async (
  params: GenerateGeminiContentParams,
) => {
  const text = await generateGeminiText({
    ...params,
    responseMimeType: params.responseMimeType || "application/json",
  });

  const normalizedText = normalizeJsonText(text);

  try {
    return JSON.parse(normalizedText);
  } catch {
    const match = normalizedText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);

    if (!match) {
      throw new Error(`Non-JSON model response: ${text}`);
    }

    return JSON.parse(match[0]);
  }
};

export type { GenerateGeminiContentParams, GeminiInlineFile, GeminiMessage };
