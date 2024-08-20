from datetime import datetime

from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Boolean
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.base_class import Base


class LineOrder(Base):
    __tablename__ = 'line_orders'

    id = Column(UUID(as_uuid=True),
                primary_key=True,
                default=uuid4,
                index=True)
    order_number = Column(String(16),
                          nullable=False,
                          index=True
                          )  # номер заказа/договор *обязателен для заполнения
    order_create_date = Column(DateTime(timezone=True),
                               default=datetime.utcnow,
                               nullable=False,
                               comment='Дата заказа',
                               index=True
                               )  # *обязателен для заполнения
    costumer_contact_phone = Column(String(15),
                                    nullable=False,
                                    comment='Телефон заказчика',
                                    index=True
                                    )  # *обязателен для заполнения
    organization_id = Column(Integer,
                             ForeignKey('organizations.id'),
                             index=True
                             )  # номер ТОР будем искать в какой организации принят заказ/договор *обязателен для заполнения
    organization = relationship('Organization',
                                back_populates='line_organizations',
                                lazy="immediate")  # связи таблици
    is_completed = Column(Boolean,
                          default=False,
                          comment='Заказ выполнен')
