"""
Este paquete agrupa todos los recursos (endpoints) de la API REST.

Aquí se crea el objeto `Api` de Flask-RESTful sobre un Blueprint,
y se registran los recursos con sus rutas. Así, app.py no necesita
saber nada de las rutas internas: solo importa `api_bp` y lo registra.
"""
from flask import Blueprint
from flask_restful import Api
from api.empleados import EmpleadoListResource, EmpleadoResource

api_bp = Blueprint("api", __name__, url_prefix="/api")
api = Api(api_bp)

api.add_resource(EmpleadoListResource, "/empleados")
api.add_resource(EmpleadoResource, "/empleados/<int:id_empleado>")