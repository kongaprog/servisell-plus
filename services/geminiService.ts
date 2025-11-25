import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosticResult, PartType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeProblem = async (userDescription: string): Promise<DiagnosticResult> => {
  if (!apiKey) {
    return {
      analysis: "Clave de API no configurada. Por favor contacte al soporte.",
      suggestedPartType: null
    };
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Eres un técnico experto en reparación de dispositivos móviles y laptops llamado Yasmani.
      El usuario te describirá un problema.
      Tu trabajo es:
      1. Identificar brevemente qué podría estar fallando en tono técnico pero amigable (máximo 2 oraciones).
      2. Clasificar el problema en una de las siguientes categorías de repuestos: Pantalla, Batería, Puerto de Carga, Almacenamiento, Memoria RAM, u Otros.
      
      Descripción del usuario: "${userDescription}"
      
      Devuelve la respuesta estrictamente en formato JSON.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            suggestedPartType: { type: Type.STRING } // Should match PartType enum values closely
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    
    // Normalize the part type to our enum
    let normalizedPart: PartType | null = null;
    const suggested = result.suggestedPartType;

    if (suggested) {
      if (suggested.includes('Pantalla')) normalizedPart = PartType.SCREEN;
      else if (suggested.includes('Batería')) normalizedPart = PartType.BATTERY;
      else if (suggested.includes('Carga')) normalizedPart = PartType.PORT;
      else if (suggested.includes('Almacenamiento') || suggested.includes('Disco')) normalizedPart = PartType.STORAGE;
      else if (suggested.includes('RAM') || suggested.includes('Memoria')) normalizedPart = PartType.RAM;
      else normalizedPart = PartType.OTHER;
    }

    return {
      analysis: result.analysis || "No pude diagnosticar el problema con exactitud.",
      suggestedPartType: normalizedPart
    };

  } catch (error) {
    console.error("Error calling Gemini:", error);
    return {
      analysis: "Hubo un error al conectar con el asistente inteligente. Intenta nuevamente.",
      suggestedPartType: null
    };
  }
};