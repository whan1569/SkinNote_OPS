from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SupplierCreate(BaseModel):
    supplier_name: str
    manager_name: str | None = None
    phone: str | None = None
    email: str | None = None
    status: str = "사용중"


class SupplierUpdate(BaseModel):
    supplier_name: str | None = None
    manager_name: str | None = None
    phone: str | None = None
    email: str | None = None
    status: str | None = None


class SupplierResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    supplier_code: str
    supplier_name: str
    manager_name: str | None
    phone: str | None
    email: str | None
    status: str
    created_at: datetime
    updated_at: datetime
