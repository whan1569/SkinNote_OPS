from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class SupplierPrice(Base):
    __tablename__ = "supplier_prices"

    supplier_price_code: Mapped[str] = mapped_column(
        String(30),
        primary_key=True,
        index=True,
        comment="공급가 코드",
    )

    product_code: Mapped[str] = mapped_column(
        String(30),
        ForeignKey("products.product_code"),
        nullable=False,
        comment="상품 코드",
    )

    supplier_code: Mapped[str] = mapped_column(
        String(30),
        ForeignKey("suppliers.supplier_code"),
        nullable=False,
        comment="공급처 코드",
    )

    purchase_price: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
        comment="매입 단가",
    )

    moq: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
        comment="최소 발주 수량",
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
