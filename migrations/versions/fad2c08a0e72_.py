"""empty message

Revision ID: fad2c08a0e72
Revises: cbdc37f6619d
Create Date: 2022-04-13 16:27:56.801669

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fad2c08a0e72'
down_revision = 'cbdc37f6619d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('servers', 'topic',
               existing_type=sa.VARCHAR(length=100),
               nullable=True)
    op.alter_column('servers', 'description',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('servers', 'description',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
    op.alter_column('servers', 'topic',
               existing_type=sa.VARCHAR(length=100),
               nullable=False)
    # ### end Alembic commands ###