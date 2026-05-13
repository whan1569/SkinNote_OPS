from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.platform_price_repository import (
    PlatformPriceRepository,
)
from app.schemas.platform_price import (
    PlatformPriceCreate,
    PlatformPriceUpdate,
)
from app.utils.code_generator import (
    generate_platform_price_code,
)


class PlatformPriceService:
    def __init__(self):
        self.repository = PlatformPriceRepository()

    def get_platform_prices(self, db: Session):
        return self.repository.get_list(db)

    def get_platform_price(
        self,
        db: Session,
        platform_price_code: str,
    ):
        platform_price = self.repository.get_by_code(
            db,
            platform_price_code,
        )

        if not platform_price:
            raise HTTPException(
                status_code=404,
                detail="판매가를 찾을 수 없습니다.",
            )

        return platform_price

    def create_platform_price(
        self,
        db: Session,
        data: PlatformPriceCreate,
    ):
        platform_price_code = (
            generate_platform_price_code(db)
        )

        return self.repository.create(
            db,
            platform_price_code,
            data,
        )

    def update_platform_price(
        self,
        db: Session,
        platform_price_code: str,
        data: PlatformPriceUpdate,
    ):
        platform_price = self.get_platform_price(
            db,
            platform_price_code,
        )

        return self.repository.update(
            db,
            platform_price,
            data,
        )

    def delete_platform_price(
        self,
        db: Session,
        platform_price_code: str,
    ):
        platform_price = self.get_platform_price(
            db,
            platform_price_code,
        )

        self.repository.delete(
            db,
            platform_price,
        )

        return {"message": "판매가가 삭제되었습니다."}
