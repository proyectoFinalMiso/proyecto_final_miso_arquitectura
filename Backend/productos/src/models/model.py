from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Fabricante(db.Model):
    __tablename__ = 'fabricantes'
    id = db.Column(db.String, primary_key=True)
    nombre = db.Column(db.String, nullable=False)
    pais = db.Column(db.String, nullable=False)

class Producto(db.Model):
    __tablename__ = 'productos'
    id = db.Column(db.String, primary_key=True)
    sku = db.Column(db.String, nullable=False)
    fabricante = db.Column(db.String, db.ForeignKey('fabricantes.id'), nullable=False)
    nombre = db.Column(db.String, nullable=False)
    valorUnitario = db.Column(db.Float, nullable=False)
    fechaCreacion = db.Column(db.DateTime, nullable=False, default=datetime.now())