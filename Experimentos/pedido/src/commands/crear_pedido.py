from requests import post
from uuid import uuid4
from datetime import datetime

from src.commands.base_command import BaseCommand
from src.models.model import db, Pedido

class CrearPedido(BaseCommand):

    def __init__(self, request_body: dict):
        self.fabricante_template = request_body

    def crear_uuid(self) -> str:
        return str(uuid4())
    
    def check_campos_requeridos(self) -> bool:

        required_fields = [
            "productos",
            "cliente",
            "vendedor",
            "destino",
            "estado",
            "valorFactura"
        ]

        if not all(field in self.fabricante_template for field in required_fields):
            return False

        if not all(self.fabricante_template.get(field) for field in required_fields):
            return False

        return True
    
    def execute(self):
        if not self.check_campos_requeridos():
            return {
                "response": {
                    "msg": "Campos requeridos no cumplidos"
                },
                "status_code": 400
            }
        
        id_pedido = self.crear_uuid()

        nuevo_pedido = Pedido(
            id=id_pedido,
            productos=self.fabricante_template['productos'],
            cliente=self.fabricante_template['cliente'],
            vendedor=self.fabricante_template['vendedor'],
            destino=self.fabricante_template['destino'],
            estado=self.fabricante_template['estado'],
            valorFactura=self.fabricante_template['valorFactura']
        )

        db.session.add(nuevo_pedido)

        try:
            
            db.session.commit()
            return {
                "response": {
                    "msg": "Pedido creado con exito"
                },
                "status_code": 201
            }
        except Exception as e:
            print(e)
            db.session.rollback()
            return {
                "response": {
                    "msg": "Error al crear pedido"
                },
                "status_code": 500
            }