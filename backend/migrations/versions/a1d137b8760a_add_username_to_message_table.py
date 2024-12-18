"""add username to message table 

Revision ID: a1d137b8760a
Revises: b5a616370eed
Create Date: 2024-10-18 18:48:57.144265

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a1d137b8760a'
down_revision: Union[str, None] = 'b5a616370eed'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('username', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('messages', 'username')
    # ### end Alembic commands ###
