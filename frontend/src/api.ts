export type PredictOut = { symbol: string; signal: number; confidence: number; image_b64: string; };

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function predict(symbol: string): Promise<PredictOut> {
  const url = `${API_BASE}/api/predict?symbol=${encodeURIComponent(symbol)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}