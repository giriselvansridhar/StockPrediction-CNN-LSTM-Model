const API_BASE = "";
export async function predict(symbol: string): Promise<PredictOut> {
  const url = `/api/predict?symbol=${encodeURIComponent(symbol)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
