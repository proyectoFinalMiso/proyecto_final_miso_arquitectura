from flask import Blueprint, jsonify, request
from src.commands.health_check import HealthCheck

blueprint = Blueprint('pedidos', __name__)

@blueprint.route('/pedido/ping', methods = ['GET'])
def health_check():
    return HealthCheck().execute()