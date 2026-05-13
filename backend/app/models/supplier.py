from datetime import datetime

from sqlalchemy import DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Supplier(Base):
    __tablename__ = "suppliers"

    supplier_code: Mapped[str] = mapped_column(
        String(30),
        primary_key=True,
        index=True,
        comment="공급처 코드",
    )

    supplier_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
        comment="공급처명",
    )

    manager_name: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        comment="담당자명",
    )

    phone: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
        comment="연락처",
    )

    email: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        comment="이메일",
    )

    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="사용중",
        comment="공급처 상태",
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
