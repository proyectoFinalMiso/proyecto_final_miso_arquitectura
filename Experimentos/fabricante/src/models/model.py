from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Fabricante(db.Model):
    __tablename__ = 'fabricante'
    id = db.Column(db.String(100), primary_key=True) ## UUID pero para terminos practicos string para facil uso con SQL Alchemy
    nombre = db.Column(db.String(100), nullable=False)
    pais = db.Column(db.String(100), nullable=False)