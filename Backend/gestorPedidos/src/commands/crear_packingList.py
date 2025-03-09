from os import getenv
from uuid import uuid4, UUID

from src.adapters.adaptador_productos import AdaptadorProductos
from src.commands.base_command import BaseCommand
from src.models.model import db, PackingList


class CrearPackingList(BaseCommand):
    def __init__(self, request_body: dict):
        self.body = request_body

    def verificar_id_existe(self, id: UUID) -> bool:
        existe_id_query = PackingList.query.filter((PackingList.id == id)).first()

        if existe_id_query:
            return True
        else:
            return False

    def crear_uuid(self) -> str:
        return str(uuid4())

    def validar_productos_existen(self, lista_productos: list) -> bool:
        validacion = []
        adaptador = AdaptadorProductos(getenv("MS_PRODUCTOS_URL", 'https://cr-ms-productos-488938258128.us-central1.run.app'))
        for sku in lista_productos:
            validacion.append(adaptador.confirmar_producto_existe(sku))
        return all(validacion)

    def check_campos_requeridos(self) -> bool:
        if (
            self.body.get("productos")
        ):
            return True
        else:
            return False

    def execute(self):
        lista_productos = self.body.get("productos")
        lista_sku = [producto["sku"] for producto in lista_productos]

        if not self.check_campos_requeridos():
            return {
                "response": {"msg": "Campos requeridos no cumplidos"},
                "status_code": 400,
            }

        if not self.validar_productos_existen(lista_sku):
            return {
                "response": {"msg": "Hay productos que no existen en el sistema"},
                "status_code": 400,
            }

        id_unico = False
        while not id_unico:
            id_packingList = self.crear_uuid()
            if not self.verificar_id_existe(id_packingList):
                id_unico = True

        for producto in lista_productos:
            posicion = PackingList(
                listID=id_packingList,
                producto=producto["sku"],
                cantidad=producto["cantidad"],
            )
            db.session.add(posicion)
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                return {
                    "response": {"msg": f"Error al crear un nuevo producto: {str(e)}"},
                    "status_code": 500,
                }
        return {
            "response": {"msg": "Producto creado exitosamente"},
            "status_code": 201,
        }
