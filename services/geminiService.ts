import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateEventHype = async (eventTitle: string, baseDescription: string): Promise<string> => {
  if (!ai) return baseDescription;

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a creative copywriter for a futuristic, cyberpunk-themed event platform called "Floating Worlds".
      Write a short, immersive, and cinematic paragraph (max 60 words) describing the event titled "${eventTitle}".
      Use words related to light, sound, immersion, and future.
      Base context: ${baseDescription}.
      Do not use hashtags.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || baseDescription;
  } catch (error) {
    console.error("Gemini generation failed", error);
    return baseDescription;
  }
};
