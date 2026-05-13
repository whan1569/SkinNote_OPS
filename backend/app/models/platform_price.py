from datetime import datetime

from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class PlatformPrice(Base):
    __tablename__ = "platform_prices"

    platform_price_code: Mapped[str] = mapped_column(
        String(30),
        primary_key=True,
        index=True,
        comment="판매가 코드",
    )

    product_code: Mapped[str] = mapped_column(
        String(30),
        ForeignKey("products.product_code"),
        nullable=False,
        comment="상품 코드",
    )

    platform_code: Mapped[str] = mapped_column(
        String(30),
        ForeignKey("platforms.platform_code"),
        nullable=False,
        comment="플랫폼 코드",
    )

    selling_price: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
        comment="판매가",
    )

    discount_rate: Mapped[float | None] = mapped_column(
        Numeric(5, 2),
        nullable=True,
        default=0,
        comment="할인율",
    )

    start_date: Mapped[datetime | None] = mapped_column(
        Date,
        nullable=True,
        comment="적용 시작일",
    )

    end_date: Mapped[datetime | None] = mapped_column(
        Date,
        nullable=True,
        comment="적용 종료일",
    )

    sale_status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="판매중",
        comment="판매 상태",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        comment="등록일",
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
        comment="수정일",
    )
