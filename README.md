# AWS Service Comparison

A full-stack web app to browse and compare AWS services side-by-side.

## Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Frontend | React 18 + TypeScript, Vite |
| Backend  | Python FastAPI + Uvicorn    |
| Styling  | Plain CSS (no framework)    |

## Features

- **20 AWS services** across 7 categories: Compute, Storage, Database, Networking, AI & ML, Security, Analytics
- Filter by category and search by name, description, or feature
- **Select up to 3 services** and compare them in a full side-by-side table
- Each service includes: description, key features, use cases, pricing model, pricing notes, free tier info, and docs link

## Project Structure

```
cloud-service-comparison/
├── backend/
│   ├── main.py           # FastAPI app
│   ├── data.py           # AWS service data
│   ├── requirements.txt
│   └── venv/             # Python virtual environment
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   ├── types/index.ts
│   │   └── components/
│   │       ├── Header.tsx
│   │       ├── CategoryFilter.tsx
│   │       ├── SearchBar.tsx
│   │       ├── ServiceCard.tsx
│   │       └── ComparePanel.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## Getting Started

### 1. Start the Backend

```bash
# From the project root (Windows PowerShell)
.\backend\venv\Scripts\uvicorn.exe main:app --reload --app-dir backend
```

Or activate the venv first:

```powershell
.\backend\venv\Scripts\Activate.ps1
cd backend
uvicorn main:app --reload
```

The API will be available at **http://localhost:8000**

API docs (auto-generated): **http://localhost:8000/docs**

### 2. Start the Frontend

```bash
cd frontend
npm run dev
```

The app will be available at **http://localhost:5173**

> Vite proxies all `/api/*` requests to `http://localhost:8000`, so both servers must be running.

## API Endpoints

| Method | Endpoint               | Description                            |
|--------|------------------------|----------------------------------------|
| GET    | `/api/services`        | All services (optional `?category=`)   |
| GET    | `/api/services/{id}`   | Single service by ID                   |
| GET    | `/api/categories`      | List of all categories                 |

## Adding More Services

Edit `backend/data.py` and add a new entry to the `AWS_SERVICES` list with the following fields:

```python
{
    "id": "unique-id",
    "name": "Service Name",
    "category": "One of the existing categories",
    "description": "...",
    "key_features": ["...", "..."],
    "use_cases": ["...", "..."],
    "pricing_notes": "...",
    "pricing_model": "...",
    "free_tier": "...",
    "docs_url": "https://docs.aws.amazon.com/..."
}
```
