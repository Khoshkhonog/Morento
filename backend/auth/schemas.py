from typing import Optional

from fastapi_users import schemas


class UserRead(schemas.BaseUser[int]):
    id: int
    username: str
    role_alid: int
    email: str
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    pass


class UserCreate(schemas.BaseUserCreate):
    email: str
    username: str
    role_alid: int
    password: str
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    pass
class UserUpdate(schemas.BaseUserUpdate):
    username: Optional[str]