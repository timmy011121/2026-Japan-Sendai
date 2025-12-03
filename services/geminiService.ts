import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSpotInfo(spotName: string): Promise<string> {
  try {
    const prompt = `
      Tell me a short, fascinating story, historical fact, or a "secret tip" about ${spotName} in Japan.
      Target audience: A traveler from Taiwan.
      Language: Traditional Chinese (Taiwan).
      Keep it under 150 words. Be engaging and magazine-style.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "目前無法取得資訊，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 導遊目前休息中，請檢查網路連線。";
  }
}
