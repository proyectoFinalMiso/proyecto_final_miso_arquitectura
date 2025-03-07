from flask import Blueprint, jsonify, request
from src.commands.crear_fabricante import CrearFabricante
from src.commands.health_check import HealthCheck

blueprint = Blueprint('fabricantes', __name__)

@blueprint.get('/')
def health_check():
    return HealthCheck().execute()

@blueprint.post('/fabricante/crear')
def crear_fabricante():
    body = request.get_json()
    response = CrearFabricante(body).execute()
    return jsonify(response['response']), response['status_code']

@blueprint.post('/producto/crear')
def crear_producto():
    pass