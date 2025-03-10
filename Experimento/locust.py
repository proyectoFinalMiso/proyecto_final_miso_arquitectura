import json
import random
import uuid
from locust import HttpUser, task

class WebsiteUser(HttpUser):

    @task
    def crear_fabricante(self):
        item = {
        "cliente": "8a0a5ad9-c36c-4d1c-99ce-9a3ea679b23d",
        "vendedor": "9eaacfa3-c17d-43c6-a41f-4d5468639b46",
        "destino": "496 Calle de los libertadores, Ciudad de México, México",
        "productos": [
            {"sku": 10024, "cantidad": 4},
            {"sku": 10025, "cantidad": 1}, 
            {"sku": 10029, "cantidad": 4}, 
            {"sku": 10031, "cantidad": 5}
            ]
        }

        # nombre = item["nombre"] + " " + str(uuid.uuid4())
        # pais = item["pais"]

        # fabricante = {
        #     "nombre": nombre,
        #     "pais": pais
        # }
        
        self.client.post(
            url = "/api/gestorPedidos/pedido/crear",
            json = item
        )

        # # Pruebas con uso de caché
        # self.client.get(
        #     url = "/experiments/create_order",
        # )