from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.platform_repository import (
    PlatformRepository,
)
from app.schemas.platform import (
    PlatformCreate,
    PlatformUpdate,
)
from app.utils.code_generator import (
    generate_platform_code,
)


class PlatformService:
    def __init__(self):
        self.repository = PlatformRepository()

    def get_platforms(self, db: Session):
        return self.repository.get_list(db)

    def get_platform(
        self,
        db: Session,
        platform_code: str,
    ):
        platform = self.repository.get_by_code(
            db,
            platform_code,
        )

        if not platform:
            raise HTTPException(
                status_code=404,
                detail="플랫폼을 찾을 수 없습니다.",
            )

        return platform

    def create_platform(
        self,
        db: Session,
        data: PlatformCreate,
    ):
        exists = self.repository.get_by_name(
            db,
            data.platform_name,
        )

        if exists:
            raise HTTPException(
                status_code=400,
                detail="이미 존재하는 플랫폼입니다.",
            )

        platform_code = generate_platform_code(db)

        return self.repository.create(
            db,
            platform_code,
            data,
        )

    def update_platform(
        self,
        db: Session,
        platform_code: str,
        data: PlatformUpdate,
    ):
        platform = self.get_platform(
            db,
            platform_code,
        )

        return self.repository.update(
            db,
            platform,
            data,
        )

    def delete_platform(
        self,
        db: Session,
        platform_code: str,
    ):
        platform = self.get_platform(
            db,
            platform_code,
        )

        self.repository.delete(db, platform)

        return {"message": "플랫폼이 삭제되었습니다."}
