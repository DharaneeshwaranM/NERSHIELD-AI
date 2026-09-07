"""
NER-SHIELD AI — Authentication API Endpoints
Provides JWT token creation, demo logins, and role validation.
"""
from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from app.core.security import create_access_token, verify_password, get_password_hash
from app.schemas.schemas import Token, LoginRequest, UserOut

router = APIRouter()

DEMO_USERS = {
    "admin@nershield.gov.in": {
        "id": "USR-001",
        "email": "admin@nershield.gov.in",
        "password_hash": get_password_hash("NerShield@2024"),
        "full_name": "Dr. Arvind Sharma (MDoNER Super Admin)",
        "role": "super_admin",
        "state": "Central"
    },
    "control.meghalaya@nershield.gov.in": {
        "id": "USR-002",
        "email": "control.meghalaya@nershield.gov.in",
        "password_hash": get_password_hash("NerShield@2024"),
        "full_name": "R. Lyngdoh (Meghalaya Control Room)",
        "role": "control_room",
        "state": "Meghalaya"
    },
    "fleet.assam@nershield.gov.in": {
        "id": "USR-003",
        "email": "fleet.assam@nershield.gov.in",
        "password_hash": get_password_hash("NerShield@2024"),
        "full_name": "Biren Gogoi (Assam Fleet Manager)",
        "role": "logistics_manager",
        "state": "Assam"
    },
    "field.arunachal@nershield.gov.in": {
        "id": "USR-004",
        "email": "field.arunachal@nershield.gov.in",
        "password_hash": get_password_hash("NerShield@2024"),
        "full_name": "T. Khandu (Arunachal Field Officer)",
        "role": "field_officer",
        "state": "Arunachal Pradesh"
    }
}


@router.post("/login", response_model=Token)
async def login(credentials: LoginRequest):
    user = DEMO_USERS.get(credentials.email.lower())
    if not user:
        # Allow any password in prototype demo mode if email matches pattern, or verify hash
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. Use demo account: admin@nershield.gov.in / NerShield@2024"
        )

    if not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password."
        )

    token = create_access_token(
        data={"sub": user["id"], "email": user["email"], "role": user["role"]}
    )

    return Token(
        access_token=token,
        token_type="bearer",
        role=user["role"],
        user_id=user["id"],
        full_name=user["full_name"]
    )


@router.get("/me")
async def get_current_user():
    return DEMO_USERS["admin@nershield.gov.in"]
