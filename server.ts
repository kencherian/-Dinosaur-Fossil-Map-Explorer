/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { DINOSAUR_DB } from "./data/dinosaurData";

async function startServer() {
  const app = express();
  app.set("trust proxy", 2);
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/dinosaur-data", async (req, res): Promise<any> => {
    const { query } = req.body || {};
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Missing query parameter." });
    }

    const matchedLocal = DINOSAUR_DB.find(
      (d) => d.name.toLowerCase() === query.toLowerCase().trim()
    );

    // If query matches pre-researched dinosaur archive, return immediately for instant UI
    if (matchedLocal) {
      return res.json({ data: matchedLocal, source: "verified_paleo_db" });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "API key is not configured and specimen not found in local database.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const promptConfig = {
      contents: {
        parts: [
          {
            text: `Act as a highly accurate paleontological database. Provide detailed scientific information for the dinosaur or prehistoric creature: "${query}". Include its taxonomy, a comprehensive scientific summary, specific metadata (diet, threat level, etc.), and all major known fossil sites where it has been discovered (must be factually true, with a minimum of 5 sites). For each site, include highly specific geographic coordinates, geological context, inventory of features (skulls, footprints, etc.), and stats.`,
          },
        ],
      },
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The formalized taxon name." },
            summary: { type: Type.STRING, description: "A detailed scientific summary of the creature." },
            metadata: {
              type: Type.OBJECT,
              properties: {
                threatLevel: { type: Type.STRING },
                threatScore: { type: Type.INTEGER, description: "1-5 scale" },
                diet: { type: Type.STRING },
                packBehavior: { type: Type.STRING },
                integument: { type: Type.STRING },
                flight: { type: Type.STRING },
                osteologicalCompleteness: { type: Type.INTEGER, description: "0-100 percentage" },
              },
              required: [
                "threatLevel",
                "threatScore",
                "diet",
                "packBehavior",
                "integument",
                "flight",
                "osteologicalCompleteness",
              ],
            },
            sites: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the fossil site or formation" },
                  coordinates: {
                    type: Type.OBJECT,
                    properties: {
                      lat: { type: Type.NUMBER },
                      lng: { type: Type.NUMBER },
                    },
                    required: ["lat", "lng"],
                  },
                  geologicalContext: {
                    type: Type.OBJECT,
                    properties: {
                      era: { type: Type.STRING },
                      period: { type: Type.STRING },
                      climate: { type: Type.STRING },
                      age: { type: Type.STRING },
                    },
                    required: ["era", "period", "climate", "age"],
                  },
                  inventory: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        category: {
                          type: Type.STRING,
                          enum: ["skull", "skeleton", "footprint", "environment"],
                        },
                      },
                      required: ["name", "description", "category"],
                    },
                  },
                  stats: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        label: { type: Type.STRING },
                        value: { type: Type.STRING },
                        subtext: { type: Type.STRING },
                        iconType: {
                          type: Type.STRING,
                          enum: ["era", "geology", "discovery", "status"],
                        },
                      },
                      required: ["label", "value", "subtext", "iconType"],
                    },
                  },
                },
                required: ["name", "coordinates", "geologicalContext", "inventory", "stats"],
              },
            },
          },
          required: ["name", "summary", "metadata", "sites"],
        },
      },
    };

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        ...promptConfig,
      });
    } catch (err: any) {
      console.warn("[Backend] gemini-3.8-flash call failed, trying gemini-3.1-flash-lite fallback:", err?.message || err);
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          ...promptConfig,
        });
      } catch (fallbackErr: any) {
        console.warn("[Backend] gemini-3.1-flash-lite fallback also failed, using verified database entry:", fallbackErr?.message || fallbackErr);
        if (matchedLocal) {
          return res.json({ data: matchedLocal, source: "verified_paleo_db" });
        }
        return res.status(500).json({ error: fallbackErr?.message || "Failed to generate dinosaur data." });
      }
    }

    try {
      const resultText = response?.text;
      if (resultText) {
        const parsed = JSON.parse(resultText);
        return res.json({ data: parsed, source: "gemini_live" });
      }
    } catch (parseErr) {
      console.warn("[Backend] JSON parse error on model output, falling back to local DB:", parseErr);
    }

    if (matchedLocal) {
      return res.json({ data: matchedLocal, source: "verified_paleo_db" });
    }
    return res.json({ data: null });
  });

  app.post("/api/taxa-blueprint", async (req, res): Promise<any> => {
    try {
      const { taxaName } = req.body || {};
      if (!taxaName || typeof taxaName !== "string") {
        return res.status(400).json({ error: "Missing taxaName parameter." });
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        return res.json({
          url: null,
          quotaExceeded: false,
          message: "API key is not configured.",
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-image",
          contents: {
            parts: [
              {
                text: `A highly accurate, scientifically-detailed photorealistic depiction of a single ${taxaName}, shown in full-body profile. The dinosaur exhibits realistic, anatomically correct skin textures, scales, and natural organic colorations based on modern paleontological reconstructions. Set against a completely plain, solid white #ffffff background with no textures, shadows, or environment. No text, labels, or scale figures.`,
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const mimeType = part.inlineData.mimeType || "image/png";
            const base64Data = `data:${mimeType};base64,${part.inlineData.data}`;
            return res.json({ url: base64Data, quotaExceeded: false });
          }
        }
        return res.json({ url: null, quotaExceeded: false });
      } catch (err: any) {
        const errMsg = err?.message || String(err);
        const isQuota =
          errMsg.includes("429") ||
          errMsg.includes("RESOURCE_EXHAUSTED") ||
          errMsg.includes("quota") ||
          errMsg.includes("limit: 0");

        console.warn(`[Backend] Image generation failed for ${taxaName} (Quota exceeded: ${isQuota}):`, errMsg);

        return res.json({
          url: null,
          quotaExceeded: isQuota,
          error: isQuota
            ? "Free-tier daily quota limit reached for image generation. Technical field sketch active."
            : "Reconstruction unavailable. Technical field sketch active.",
        });
      }
    } catch (error: any) {
      console.error("[Backend] Error generating taxa blueprint:", error);
      return res.json({
        url: null,
        quotaExceeded: true,
        error: error.message || "Failed to generate taxa blueprint.",
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(["/server.cjs", "/server.cjs.map"], (_req: any, res: any) => res.status(404).end());
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Backend] Server running on http://localhost:${PORT}`);
  });
}

startServer();
