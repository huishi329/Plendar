"""add is_default col to calendars

Revision ID: b01497358e86
Revises: eb766f92e5b7
Create Date: 2023-01-05 16:22:07.315869

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b01497358e86'
down_revision = 'eb766f92e5b7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('calendars', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_default', sa.BOOLEAN(), server_default='False', nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('calendars', schema=None) as batch_op:
        batch_op.drop_column('is_default')

    # ### end Alembic commands ###
