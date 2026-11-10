import { PaleoData, SiteMarker } from "../types";
import { DINOSAUR_DB, DinosaurDatabaseEntry } from "../data/dinosaurData";

// In-memory cache to prevent redundant API calls for the same taxa/sites
const blueprintCache: Record<string, string> = {};
const textDataCache: Record<string, DinosaurDatabaseEntry> = {};

/**
 * Generic retry wrapper for transient network/API issues.
 * Quota-exhausted errors with 0-limit or 404s are failed immediately to prevent UI lag.
 */
const withRetry = async <T>(fn: () => Promise<T>, maxRetries = 2, initialDelay = 1200): Promise<T> => {
  let lastError: any;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const errorMsg = error?.message?.toLowerCase() || "";
      
      const isPermanentError =
        errorMsg.includes("limit: 0") ||
        errorMsg.includes("per day") ||
        errorMsg.includes("daily") ||
        errorMsg.includes("404") ||
        errorMsg.includes("not_found") ||
        errorMsg.includes("no longer available");

      // Never retry permanent or daily-quota exhausted errors
      if (isPermanentError) {
        throw error;
      }

      const isTransientError =
        errorMsg.includes("429") ||
        error?.status === 429 ||
        errorMsg.includes("exhausted");

      if (isTransientError && attempt < maxRetries - 1) {
        const delay = initialDelay * (attempt + 1);
        console.warn(`Transient rate limit hit. Brief pause (${delay}ms) before attempt ${attempt + 2}...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
};

/**
 * GEMINI API (Server-side proxy): Fetches live data for a specific dinosaur using Structured Outputs.
 */
export const generateLiveDinosaurData = async (query: string): Promise<DinosaurDatabaseEntry | null> => {
  const normalizedQuery = query.toLowerCase().trim();
  if (textDataCache[normalizedQuery]) {
    return textDataCache[normalizedQuery];
  }

  // Pre-check local DB for instantaneous initial load and reliability
  const localMatch = DINOSAUR_DB.find((d) => d.name.toLowerCase() === normalizedQuery);

  try {
    const data = await withRetry(async () => {
      const response = await fetch("/api/dinosaur-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const result = await response.json();
      if (result?.data) {
        textDataCache[normalizedQuery] = result.data as DinosaurDatabaseEntry;
        return result.data as DinosaurDatabaseEntry;
      }
      return null;
    });

    if (data) return data;
  } catch (err: any) {
    console.warn(`[Client] Live dinosaur data fetch notice for "${query}":`, err?.message || err);
  }

  // If live fetch was unsuccessful, use verified local database entry
  if (localMatch) {
    textDataCache[normalizedQuery] = localMatch;
    return localMatch;
  }

  return null;
};

/**
 * GEMINI API (with local fallback): Finds site markers for a specific dinosaur.
 */
export const fetchSitesForQuery = async (query: string): Promise<SiteMarker[]> => {
  let dino: DinosaurDatabaseEntry | null = null;
  try {
    dino = await generateLiveDinosaurData(query);
  } catch (err) {
    console.warn("Live data fetch notice, using verified local repository", err);
  }

  if (!dino) {
    dino = DINOSAUR_DB.find((d) => d.name.toLowerCase() === query.toLowerCase().trim()) || null;
  }

  if (!dino) return [];

  return dino.sites.map((site, index) => ({
    name: site.name,
    lat: site.coordinates.lat,
    lng: site.coordinates.lng,
    id: `${dino!.name.replace(/\s/g, "-")}-${index}`,
  }));
};

/**
 * GEMINI API (with local fallback): Retrieves full PaleoData for a site/dino combo.
 */
export const fetchPaleoData = async (siteName: string, speciesName: string): Promise<PaleoData | null> => {
  let dino: DinosaurDatabaseEntry | null = null;
  try {
    dino = await generateLiveDinosaurData(speciesName);
  } catch (err) {
    console.warn("Live data fetch notice, using verified local repository", err);
  }

  if (!dino) {
    dino = DINOSAUR_DB.find((d) => d.name.toLowerCase() === speciesName.toLowerCase().trim()) || null;
  }

  if (!dino) return null;

  const site = dino.sites.find((s) => s.name === siteName) || dino.sites[0];

  return {
    name: site.name,
    coordinates: site.coordinates,
    summary: dino.summary,
    geologicalContext: site.geologicalContext,
    stats: site.stats,
    metadata: dino.metadata,
    features: site.inventory,
  };
};

/**
 * GEMINI API (Server-side proxy): Generates a technical scientific illustration or photoreal reconstruction.
 */
export const generateTaxaBlueprint = async (taxaName: string): Promise<string | null> => {
  if (blueprintCache[taxaName]) {
    return blueprintCache[taxaName];
  }

  try {
    const response = await fetch("/api/taxa-blueprint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taxaName }),
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    if (result?.url) {
      blueprintCache[taxaName] = result.url;
      return result.url;
    }

    if (result?.quotaExceeded) {
      console.info(`[Client] Image quota limit reached for ${taxaName}; displaying technical specimen blueprint.`);
    }

    return null;
  } catch (err) {
    console.warn(`[Client] Notice for ${taxaName} reconstruction:`, err);
    return null;
  }
};
