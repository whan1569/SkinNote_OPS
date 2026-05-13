from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.platform_price import (
    PlatformPriceCreate,
    PlatformPriceResponse,
    PlatformPriceUpdate,
)
from app.services.platform_price_service import (
    PlatformPriceService,
)

router = APIRouter(
    prefix="/platform-prices",
    tags=["Platform Prices"],
)

service = PlatformPriceService()


@router.get(
    "",
    response_model=list[PlatformPriceResponse],
)
def get_platform_prices(
    db: Session = Depends(get_db),
):
    return service.get_platform_prices(db)


@router.get(
    "/{platform_price_code}",
    response_model=PlatformPriceResponse,
)
def get_platform_price(
    platform_price_code: str,
    db: Session = Depends(get_db),
):
    return service.get_platform_price(
        db,
        platform_price_code,
    )


@router.post(
    "",
    response_model=PlatformPriceResponse,
)
def create_platform_price(
    data: PlatformPriceCreate,
    db: Session = Depends(get_db),
):
    return service.create_platform_price(
        db,
        data,
    )


@router.patch(
    "/{platform_price_code}",
    response_model=PlatformPriceResponse,
)
def update_platform_price(
    platform_price_code: str,
    data: PlatformPriceUpdate,
    db: Session = Depends(get_db),
):
    return service.update_platform_price(
        db,
        platform_price_code,
        data,
    )


@router.delete("/{platform_price_code}")
def delete_platform_price(
    platform_price_code: str,
    db: Session = Depends(get_db),
):
    return service.delete_platform_price(
        db,
        platform_price_code,
    )
