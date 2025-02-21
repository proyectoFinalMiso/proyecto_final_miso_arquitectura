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
    productos = db.Column(db.String, server_default="{}")
    cliente = db.Column(db.String, nullable=False)
    vendedor = db.Column(db.String, nullable=False)
    fechaIngreso = db.Column(db.DateTime, nullable=False, default=datetime.now())
    destino = db.Column(db.String, nullable=False)
    estado = db.Column(db.Enum(EstadoPedido), nullable=False)
    valorFactura = db.Column(db.Float, nullable=False)