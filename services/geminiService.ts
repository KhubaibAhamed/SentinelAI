
import { GoogleGenAI, Type } from "@google/genai";
import { ClassificationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const classifyText = async (text: string): Promise<ClassificationResult> => {
  const startTime = performance.now();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following text for toxicity. Provide scores between 0 and 1 for labels: toxic, severe_toxic, obscene, threat, insult, identity_hate. Also identify specific spans (start/end character indices) that trigger these labels. Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scores: {
              type: Type.OBJECT,
              properties: {
                toxic: { type: Type.NUMBER },
                severe_toxic: { type: Type.NUMBER },
                obscene: { type: Type.NUMBER },
                threat: { type: Type.NUMBER },
                insult: { type: Type.NUMBER },
                identity_hate: { type: Type.NUMBER }
              },
              required: ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
            },
            spans: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  start: { type: Type.INTEGER },
                  end: { type: Type.INTEGER },
                  label: { type: Type.STRING },
                  text: { type: Type.STRING }
                },
                required: ["start", "end", "label", "text"]
              }
            },
            explanation: { type: Type.STRING }
          },
          required: ["scores", "spans", "explanation"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    const endTime = performance.now();

    return {
      ...data,
      modelVersion: "sentinel-v2.1-gemini-backbone",
      latencyMs: Math.round(endTime - startTime)
    };
  } catch (error) {
    console.error("Classification error:", error);
    throw error;
  }
};
