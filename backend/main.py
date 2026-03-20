from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from data import AWS_SERVICES, CATEGORIES

app = FastAPI(title="AWS Service Comparison API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/categories")
def get_categories():
    return {"categories": CATEGORIES}


@app.get("/api/services")
def get_services(category: Optional[str] = Query(default=None)):
    services = AWS_SERVICES
    if category:
        services = [s for s in services if s["category"].lower() == category.lower()]
    return {"services": services, "total": len(services)}


@app.get("/api/services/{service_id}")
def get_service(service_id: str):
    service = next((s for s in AWS_SERVICES if s["id"] == service_id), None)
    if not service:
        raise HTTPException(status_code=404, detail=f"Service '{service_id}' not found")
    return service
