from flask import render_template, url_for, flash, redirect
from . import bp
from flask_login import login_required, current_user

@bp.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.jinja', title='Avenger Assembler')