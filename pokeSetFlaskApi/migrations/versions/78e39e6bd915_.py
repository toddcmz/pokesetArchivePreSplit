"""empty message

Revision ID: 78e39e6bd915
Revises: 
Create Date: 2023-06-06 09:33:22.249066

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78e39e6bd915'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('token', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('scores__table',
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.Column('sets_found', sa.Integer(), nullable=True),
    sa.Column('game_date', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('username', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('game_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('scores__table')
    op.drop_table('user')
    # ### end Alembic commands ###
