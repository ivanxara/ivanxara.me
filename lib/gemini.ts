import "server-only";

import {
  GoogleGenerativeAI,
  type Schema as GeminiSchema,
} from "@google/generative-ai";

export type GeminiRole = "user" | "model";

export type GeminiMessage = {
  role: GeminiRole;
  text: string;
};

export type GenerateGeminiContentParams = {
  prompt: string;
  systemInstruction: string;
  responseMimeType?: string;
  responseSchema?: GeminiSchema;
  messages?: GeminiMessage[];
  model?: string;
  maxOutputTokens?: number;
  temperature?: number;
};

const DEFAULT_MODEL = "gemini-3-flash-preview";

const normalizeJsonText = (text: string) =>
  text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

const buildContents = ({
  prompt,
  messages,
}: Pick<GenerateGeminiContentParams, "prompt" | "messages">) => {
  if (messages?.length) {
    return messages
      .filter((m) => m.text.trim())
      .map((m) => ({ role: m.role, parts: [{ text: m.text.trim() }] }));
  }

  return [
    {
      role: "user" as const,
      parts: [{ text: prompt }],
    },
  ];
};

const runGeneration = async ({
  prompt,
  systemInstruction,
  responseMimeType = "text/plain",
  responseSchema,
  messages = [],
  model = process.env.GEMINI_MODEL ?? DEFAULT_MODEL,
  temperature = 0.2,
}: GenerateGeminiContentParams) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const geminiModel = new GoogleGenerativeAI(apiKey).getGenerativeModel({
    model,
    systemInstruction,
    generationConfig: {
      temperature,
      responseMimeType,
      responseSchema,
    },
  });

  const result = await geminiModel.generateContent({
    contents: buildContents({ prompt, messages }),
  });
  
  const text = result.response.text().trim();
  if (!text) throw new Error("Empty model response");

  return text;
};

export const generateGeminiText = (params: GenerateGeminiContentParams) =>
  runGeneration(params);

export const generateGeminiContent = async (
  params: GenerateGeminiContentParams,
) => {
  const raw = await runGeneration({
    ...params,
    responseMimeType: params.responseMimeType ?? "application/json",
  });

  const text = normalizeJsonText(raw);

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (!match) throw new Error(`Non-JSON model response: ${raw}`);
    return JSON.parse(match[0]);
  }
};
