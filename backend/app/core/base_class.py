from typing import Any

from sqlalchemy import Column, DateTime, TIMESTAMP, func, text
from sqlalchemy.ext.declarative import as_declarative, declared_attr


@as_declarative()
class Base:
    id: Any
    created_at = Column(type_=TIMESTAMP(timezone=True), default=text('now()'))
