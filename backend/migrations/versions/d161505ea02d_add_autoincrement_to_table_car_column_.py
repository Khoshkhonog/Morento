"""add autoincrement to table Car column carId

Revision ID: d161505ea02d
Revises: 2f70c63f59b3
Create Date: 2024-11-01 15:55:37.706658

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd161505ea02d'
down_revision: Union[str, None] = '2f70c63f59b3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
