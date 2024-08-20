from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from app.core.base_class import Base


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer,
                primary_key=True,
                index=True)
    title = Column(String(100),
                   index=True,
                   nullable=False,
                   comment='Сокращенное наименование')
    fullname = Column(String(300),
                      nullable=False,
                      comment='Полное наименование')
    is_active = Column(Boolean,
                       default=True,
                       comment='Статус')  # признак что данная организация актуальная
    # line_organizations = relationship('LineOrder',
    #                                   back_populates='organization',
    #                                   # uselist=True,
    #                                   )
