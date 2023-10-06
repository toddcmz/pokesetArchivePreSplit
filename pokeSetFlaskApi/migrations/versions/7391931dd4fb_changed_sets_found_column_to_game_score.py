"""changed sets_found column to game_score

Revision ID: 7391931dd4fb
Revises: 78e39e6bd915
Create Date: 2023-10-06 14:40:32.273770

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7391931dd4fb'
down_revision = '78e39e6bd915'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('scores__table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('game_score', sa.Float(), nullable=True))
        batch_op.drop_column('sets_found')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('scores__table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sets_found', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_column('game_score')

    # ### end Alembic commands ###