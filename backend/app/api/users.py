"""
NER-SHIELD AI — Users Management API Endpoints
"""
from typing import List
from fastapi import APIRouter, HTTPException
from app.schemas.schemas import UserOut, UserCreate

router = APIRouter()

USERS_DB = [
    {"id": "USR-001", "email": "admin@nershield.gov.in", "full_name": "Dr. Arvind Sharma", "role": "super_admin", "state": "Central", "is_active": True},
    {"id": "USR-002", "email": "control.meghalaya@nershield.gov.in", "full_name": "R. Lyngdoh", "role": "control_room", "state": "Meghalaya", "is_active": True},
    {"id": "USR-003", "email": "fleet.assam@nershield.gov.in", "full_name": "Biren Gogoi", "role": "logistics_manager", "state": "Assam", "is_active": True},
    {"id": "USR-004", "email": "field.arunachal@nershield.gov.in", "full_name": "T. Khandu", "role": "field_officer", "state": "Arunachal Pradesh", "is_active": True},
]


@router.get("/", response_model=List[UserOut])
async def list_users():
    return USERS_DB


@router.post("/", response_model=UserOut)
async def create_user(user_in: UserCreate):
    new_user = {
        "id": f"USR-00{len(USERS_DB) + 1}",
        "email": user_in.email,
        "full_name": user_in.full_name,
        "role": user_in.role,
        "state": user_in.state,
        "is_active": True,
    }
    USERS_DB.append(new_user)
    return new_user
