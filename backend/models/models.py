from datetime import datetime

from sqlalchemy import Column, Integer, String, MetaData, ForeignKey, text, TIMESTAMP, Boolean, DateTime
from sqlalchemy.orm import mapped_column, Mapped, declarative_base

metadata = MetaData()


Base = declarative_base(metadata=metadata)


class Roles(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    permissions = Column(String, nullable=True)


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(String, nullable=False)
    registered_at: Mapped[str] = mapped_column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    role_alid: Mapped[int] = mapped_column(Integer, ForeignKey(Roles.id))
    email: Mapped[str] = mapped_column(
        String(length=320), unique=True, index=True, nullable=False
    )
    hashed_password: Mapped[str] = mapped_column(
        String(length=1024), nullable=False
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_superuser: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    is_verified: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )

class Car(Base):
    __tablename__ = "car"
    
    carId: Mapped[int] = mapped_column(Integer,primary_key=True,nullable=False,autoincrement=True)
    carName: Mapped[str] = mapped_column(String, nullable=False)
    carType: Mapped[str] = mapped_column(String, nullable=False)
    carDescription: Mapped[str] = mapped_column(String, nullable=False)
    carPrice: Mapped[str] = mapped_column(String, nullable=False)
    carImage: Mapped[str] = mapped_column(String, nullable=False)
    liters: Mapped[str] = mapped_column(String, nullable=False)
    transmission: Mapped[str] = mapped_column(String,nullable=False)
    seats: Mapped[str] = mapped_column(String, nullable=False)
    discount: Mapped[int] = mapped_column(Integer,nullable = True)


class Conversation(Base):
    __tablename__ = 'conversations'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False)
    operator_id: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[str] = mapped_column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    updated_at:Mapped[str] = mapped_column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True)
    conversation_id = Column(Integer, ForeignKey('conversations.id'), nullable=False)
    user_id = Column(Integer, nullable=False)
    username = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(String, nullable=False)
    text_message: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[str] = mapped_column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    
class Review(Base):
    __tablename__ = 'reviews'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    car_id: Mapped[int] = mapped_column(Integer, ForeignKey('car.carId'), nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False)
    username: Mapped[str] = mapped_column(String, nullable=False)
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    text : Mapped[str] = mapped_column(String, nullable=False)