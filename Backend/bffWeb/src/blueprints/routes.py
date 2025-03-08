import requests
from os import getenv
from flask import Blueprint, jsonify, request

blueprint = Blueprint('bffWeb', __name__)

# Microservice URLs (replace with your actual Cloud Run service URLs)
MS_PRODUCTOS_URL = r"https://cr-ms-productos-488938258128.us-central1.run.app" #getenv("MS_PRODUCTOS_URL")
MS_PEDIDOS_URL = getenv("MS_PEDIDOS_URL")

@blueprint.get("/")
def health_check():
    return jsonify({"msg": 'La API del cliente web se encuentra operativa'}), 200

@blueprint.route("/api/productos/<path:path>", methods=["GET", "POST"])
def proxy_ms_productos(path=None):
    url = f"{MS_PRODUCTOS_URL}/{path}"
    print(url)
    if request.method != "GET":
        response = requests.request(
            method=request.method,
            url=url,
            headers={key: value for key, value in request.headers if key != "Host"},
            json=request.get_json(),
        )
    response = requests.request(
            method=request.method,
            url=url,
            headers={key: value for key, value in request.headers if key != "Host"},
        )
    print(response.text)
    return jsonify(response.json()), response.status_code

@blueprint.route("/api/gestorPedidos/<path:path>", methods=["GET", "POST"])
def proxy_ms_pedidos(path=None):
    url = f"{MS_PEDIDOS_URL}/{path}"
    response = requests.request(
        method=request.method,
        url=url,
        headers={key: value for key, value in request.headers if key != "Host"},
        json=request.get_json(),
    )
    return jsonify(response.json()), response.status_code