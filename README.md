# Stock CNN Unified Project

This zip contains a **FastAPI backend** and a **Vite React frontend** wired together.

## How to run

### 1) Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

### 2) Frontend
```bash
cd ../frontend
npm install
npm run dev
```
The app expects the backend at `http://localhost:8000`. To change it, set `VITE_API_BASE` in a `.env` file.

## Endpoints
- `GET /api/predict?symbol=AAPL` → returns `{-1,0,1}` signal, confidence, and the chart image (cumulative return on black + volume panel).
  - Charts enforce the spec: 260 trading days, cumulative return from Adj Close on top, volume below, minimal axes.

> Notes
- The prediction is a placeholder heuristic in `app.py` (`_dummy_classifier`) so you can integrate your CNN later. Drop your trained model into `backend/models` and replace the function with real inference.
- You can extend the backend to implement dataset generation and training exactly as in the problem statement.