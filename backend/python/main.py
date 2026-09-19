from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator
import hashlib
import hmac
import os
import time
import uuid

app = FastAPI(title="Aurum Reserve API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)


class Payload(BaseModel):
    name: str = Field(min_length=1)
    email: EmailStr
    company: str = Field(min_length=1)
    budget: int = Field(ge=0, le=100)
    timeline: int = Field(ge=0, le=100)
    team: int = Field(ge=0, le=100)
    message: str = Field(min_length=20)

    @field_validator("name", "company", "message")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()


class Assessment(BaseModel):
    score: int = Field(ge=0, le=100)
    tier: str = Field(min_length=1)


class LeadRequest(BaseModel):
    payload: Payload
    assessment: Assessment


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/leads", status_code=201)
def create_lead(request: LeadRequest) -> dict[str, object]:
    canonical = request.model_dump_json()
    secret = os.getenv("LEAD_HMAC_SECRET", "dev-secret").encode()
    integrity = hmac.new(secret, canonical.encode(), hashlib.sha256).hexdigest()

    return {
        "status": "accepted",
        "id": str(uuid.uuid4()),
        "integrity": integrity,
        "score": request.assessment.score,
        "received_at": int(time.time()),
    }
