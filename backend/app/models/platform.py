from datetime import datetime

from sqlalchemy import DateTime, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Platform(Base):
    __tablename__ = "platforms"

    platform_code: Mapped[str] = mapped_column(
        String(30),
        primary_key=True,
        index=True,
        comment="플랫폼 코드",
    )

    platform_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
        comment="플랫폼명",
    )

    type: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
        comment="플랫폼 타입",
    )

    commission_rate: Mapped[float | None] = mapped_column(
        Numeric(5, 2),
        nullable=True,
        comment="수수료율",
    )

    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="사용중",
        comment="플랫폼 상태",
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
