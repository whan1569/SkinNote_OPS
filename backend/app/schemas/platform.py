from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PlatformCreate(BaseModel):
    platform_name: str
    type: str | None = None
    commission_rate: float | None = None
    status: str = "사용중"


class PlatformUpdate(BaseModel):
    platform_name: str | None = None
    type: str | None = None
    commission_rate: float | None = None
    status: str | None = None


class PlatformResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    platform_code: str
    platform_name: str
    type: str | None
    commission_rate: float | None
    status: str
    created_at: datetime
    updated_at: datetime
