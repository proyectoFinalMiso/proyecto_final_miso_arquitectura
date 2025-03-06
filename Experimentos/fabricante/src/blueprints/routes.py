from flask import Blueprint, jsonify, request
from src.commands.crear_fabricante import CrearFabricante
from src.commands.health_check import HealthCheck

blueprint = Blueprint('pedidos', __name__)


@blueprint.route('/', methods=['GET'])
def health_check():
    return HealthCheck().execute()


@blueprint.route('/crear', methods=['POST'])
def crear_fabricante():
    body = request.get_json()
    response = CrearFabricante(body).execute()
    return jsonify(response['response']), response['status_code']
