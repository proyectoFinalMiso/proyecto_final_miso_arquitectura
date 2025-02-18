from src.commands.base_command import BaseCommannd
from flask import jsonify

class HealthCheck(BaseCommannd):
  
    def execute(self):
        health_status = {"message": "pong"}
        return jsonify(health_status), 200
