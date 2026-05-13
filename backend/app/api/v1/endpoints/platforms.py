from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.platform import (
    PlatformCreate,
    PlatformResponse,
    PlatformUpdate,
)
from app.services.platform_service import (
    PlatformService,
)

router = APIRouter(
    prefix="/platforms",
    tags=["Platforms"],
)

service = PlatformService()


@router.get(
    "",
    response_model=list[PlatformResponse],
)
def get_platforms(
    db: Session = Depends(get_db),
):
    return service.get_platforms(db)


@router.get(
    "/{platform_code}",
    response_model=PlatformResponse,
)
def get_platform(
    platform_code: str,
    db: Session = Depends(get_db),
):
    return service.get_platform(
        db,
        platform_code,
    )


@router.post(
    "",
    response_model=PlatformResponse,
)
def create_platform(
    data: PlatformCreate,
    db: Session = Depends(get_db),
):
    return service.create_platform(
        db,
        data,
    )


@router.patch(
    "/{platform_code}",
    response_model=PlatformResponse,
)
def update_platform(
    platform_code: str,
    data: PlatformUpdate,
    db: Session = Depends(get_db),
):
    return service.update_platform(
        db,
        platform_code,
        data,
    )


@router.delete("/{platform_code}")
def delete_platform(
    platform_code: str,
    db: Session = Depends(get_db),
):
    return service.delete_platform(
        db,
        platform_code,
    )
