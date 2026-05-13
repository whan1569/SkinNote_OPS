from sqlalchemy.orm import Session

from app.models.platform import Platform
from app.schemas.platform import PlatformCreate, PlatformUpdate


class PlatformRepository:
    def get_list(self, db: Session) -> list[Platform]:
        return (
            db.query(Platform)
            .order_by(Platform.created_at.desc())
            .all()
        )

    def get_by_code(
        self,
        db: Session,
        platform_code: str,
    ) -> Platform | None:
        return (
            db.query(Platform)
            .filter(Platform.platform_code == platform_code)
            .first()
        )

    def get_by_name(
        self,
        db: Session,
        platform_name: str,
    ) -> Platform | None:
        return (
            db.query(Platform)
            .filter(Platform.platform_name == platform_name)
            .first()
        )

    def create(
        self,
        db: Session,
        platform_code: str,
        data: PlatformCreate,
    ) -> Platform:
        platform = Platform(
            platform_code=platform_code,
            platform_name=data.platform_name,
            type=data.type,
            commission_rate=data.commission_rate,
            status=data.status,
        )

        db.add(platform)
        db.commit()
        db.refresh(platform)

        return platform

    def update(
        self,
        db: Session,
        platform: Platform,
        data: PlatformUpdate,
    ) -> Platform:
        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(platform, key, value)

        db.commit()
        db.refresh(platform)

        return platform

    def delete(
        self,
        db: Session,
        platform: Platform,
    ) -> None:
        db.delete(platform)
        db.commit()
