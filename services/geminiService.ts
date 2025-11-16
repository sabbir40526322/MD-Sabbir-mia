
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeIpWithGemini = async (ipInfo: any): Promise<{ score: number; analysis: string }> => {
  try {
    const prompt = `
      Analyze the following IP information and provide a risk score from 0 (very low risk) to 100 (very high risk).
      Also provide a brief analysis explaining the score. Consider factors like if the ISP or organization sounds like a hosting provider, data center, or VPN service (e.g., "DigitalOcean", "OVH", "ExpressVPN"). A residential ISP (e.g., "Comcast", "Verizon") is generally lower risk.
      IP Information: ${JSON.stringify(ipInfo, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: "A risk score from 0 to 100."
            },
            analysis: {
              type: Type.STRING,
              description: "A brief analysis of the IP's risk profile."
            }
          }
        }
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error analyzing IP with Gemini:", error);
    throw new Error("Failed to get AI analysis for the IP address.");
  }
};

export const findAddressByZipWithGemini = async (zip: string): Promise<{ locations: { name: string; address: string }[] }> => {
    try {
        const prompt = `Provide up to 5 example public locations or well-known places for the US ZIP code "${zip}". Do not invent addresses. If you cannot find any, return an empty array.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        locations: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    address: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error finding addresses with Gemini:", error);
        throw new Error("Failed to get AI-powered location examples.");
    }
};

export const analyzeUaWithGemini = async (ua: string): Promise<{ browser: string; os: string; device: string; type: string; raw: string }> => {
    try {
        const prompt = `Parse this User Agent string and provide details: "${ua}"`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        browser: { type: Type.STRING, description: "Browser name and version (e.g., Chrome 108.0)" },
                        os: { type: Type.STRING, description: "Operating System and version (e.g., Windows 10)" },
                        device: { type: Type.STRING, description: "Device name or model (e.g., iPhone, Pixel 6)" },
                        type: { type: Type.STRING, description: "Device type (e.g., Mobile, Desktop, Tablet)" },
                        raw: { type: Type.STRING, description: "The original raw user agent string" }
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error analyzing User Agent with Gemini:", error);
        throw new Error("Failed to get AI analysis for the User Agent.");
    }
};

export const analyzeEmailWithGemini = async (email: string): Promise<{ isDisposable: boolean; analysis: string; isValidFormat: boolean; }> => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isDisposable: false, analysis: "Invalid email format.", isValidFormat: false };
        }

        const domain = email.split('@')[1];
        const prompt = `Analyze the domain "${domain}" from the email address provided. Is this a known temporary, disposable, or high-risk email domain? Provide a brief analysis.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isDisposable: { type: Type.BOOLEAN, description: "True if the domain is likely disposable or high-risk." },
                        analysis: { type: Type.STRING, description: "A brief analysis of the domain." }
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return { ...result, isValidFormat: true };
    } catch (error) {
        console.error("Error analyzing email with Gemini:", error);
        throw new Error("Failed to get AI analysis for the email address.");
    }
};
