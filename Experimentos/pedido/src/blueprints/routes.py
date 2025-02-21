from flask import Blueprint, jsonify, request
from src.commands.health_check import HealthCheck
from src.commands.crear_pedido import CrearPedido

blueprint = Blueprint('pedidos', __name__)

@blueprint.route('/pedido/ping', methods = ['GET'])
def health_check():
    return HealthCheck().execute()

@blueprint.route('/pedido/crear', methods = ['POST'])
def crear_pedido():
    body = request.get_json()
    response = CrearPedido(body).execute()
    return jsonify(response['response']), response['status_code']