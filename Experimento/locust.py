import json
import random
import uuid
from locust import HttpUser, task

class WebsiteUser(HttpUser):

    @task
    def crear_fabricante(self):
        # with open("fabricante_mock.json", "r") as file:
        #     data = json.load(file)
        # item = random.choice(data)

        # nombre = item["nombre"] + " " + str(uuid.uuid4())
        # pais = item["pais"]

        # fabricante = {
        #     "nombre": nombre,
        #     "pais": pais
        # }
        
        # self.client.post(
        #     url = "/api/productos/fabricante",
        #     json = fabricante
        # )

        # Pruebas con uso de caché
        self.client.get(
            url = "/experiments/create_manufacturer",
        )