from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ProductCreate(BaseModel):
    product_name: str = Field(..., examples=["센텔라 크림"])
    sku: str = Field(..., examples=["SKU-CREAM-001"])
    category: str | None = Field(None, examples=["스킨케어"])
    brand: str | None = Field(None, examples=["SkinNote"])


class ProductUpdate(BaseModel):
    product_name: str | None = None
    sku: str | None = None
    category: str | None = None
    brand: str | None = None


class ProductResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    product_code: str
    product_name: str
    sku: str
    category: str | None
    brand: str | None
    created_at: datetime
    updated_at: datetime
