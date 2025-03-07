from flask_sqlalchemy import SQLAlchemy
from enum import Enum
from datetime import datetime

db = SQLAlchemy()

class EstadoPedido(Enum):
    SOLICITADO = "SOLICITADO"
    EN_PROCESO = "EN_PROCESO"
    FINALIZADO = "FINALIZADO"
    CANCELADO = "CANCELADO"

class Pedido(db.Model):
    __tablename__ = 'pedidos'

    id = db.Column(db.String, primary_key=True)
    packingList = db.Column(db.Integer, db.ForeignKey('packingLists.id'), nullable=False)
    cliente = db.Column(db.String, nullable=False)
    vendedor = db.Column(db.String, nullable=False)
    fechaIngreso = db.Column(db.DateTime, nullable=False, default=datetime.now())
    destino = db.Column(db.String, nullable=False)
    estado = db.Column(db.Enum(EstadoPedido), nullable=False)
    valorFactura = db.Column(db.Float, nullable=False)

    # Relación entre pedido y packing list
    packing_list = db.relationship('PackingList', backref='pedidos')

class PackingList(db.Model):
    __tablename__ = 'packingLists'

    id = db.Column(db.String, primary_key=True)
    producto = db.Column(db.String, db.ForeignKey('productos.id'))
    cantidad = db.Column(db.String, nullable=False)