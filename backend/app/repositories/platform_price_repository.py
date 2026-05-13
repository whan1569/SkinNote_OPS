from sqlalchemy.orm import Session

from app.models.platform_price import PlatformPrice
from app.schemas.platform_price import (
    PlatformPriceCreate,
    PlatformPriceUpdate,
)


class PlatformPriceRepository:
    def get_list(self, db: Session) -> list[PlatformPrice]:
        return (
            db.query(PlatformPrice)
            .order_by(PlatformPrice.created_at.desc())
            .all()
        )

    def get_by_code(
        self,
        db: Session,
        platform_price_code: str,
    ) -> PlatformPrice | None:
        return (
            db.query(PlatformPrice)
            .filter(
                PlatformPrice.platform_price_code
                == platform_price_code
            )
            .first()
        )

    def create(
        self,
        db: Session,
        platform_price_code: str,
        data: PlatformPriceCreate,
    ) -> PlatformPrice:
        platform_price = PlatformPrice(
            platform_price_code=platform_price_code,
            product_code=data.product_code,
            platform_code=data.platform_code,
            selling_price=data.selling_price,
            discount_rate=data.discount_rate,
            start_date=data.start_date,
            end_date=data.end_date,
            sale_status=data.sale_status,
        )

        db.add(platform_price)
        db.commit()
        db.refresh(platform_price)

        return platform_price

    def update(
        self,
        db: Session,
        platform_price: PlatformPrice,
        data: PlatformPriceUpdate,
    ) -> PlatformPrice:
        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(platform_price, key, value)

        db.commit()
        db.refresh(platform_price)

        return platform_price

    def delete(
        self,
        db: Session,
        platform_price: PlatformPrice,
    ) -> None:
        db.delete(platform_price)
        db.commit()
