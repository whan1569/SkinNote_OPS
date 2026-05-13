from datetime import datetime

from sqlalchemy import DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    product_code: Mapped[str] = mapped_column(
        String(30),
        primary_key=True,
        index=True,
        comment="상품 코드",
    )

    product_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        comment="상품명",
    )

    sku: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
        index=True,
        comment="SKU 코드",
    )

    category: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        comment="카테고리",
    )

    brand: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        comment="브랜드",
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
