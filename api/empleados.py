"""
Recursos (endpoints) REST relacionados con Empleados.
Cada clase Resource de Flask-RESTful mapea verbos HTTP a métodos
de Python: GET -> get(), POST -> post(), PUT -> put(), DELETE -> delete().
"""
from flask import request
from flask_restful import Resource
from marshmallow import ValidationError

from extensions import db
from models import Empleado
from schemas import empleado_schema, empleados_schema


class EmpleadoListResource(Resource):
    """Maneja la colección completa: /api/empleados"""

    def get(self):
        empleados = Empleado.query.all()
        return empleados_schema.dump(empleados), 200

    def post(self):
        json_data = request.get_json()
        if not json_data:
            return {"mensaje": "No se enviaron datos"}, 400

        try:
            datos = empleado_schema.load(json_data)
        except ValidationError as err:
            return {"errores": err.messages}, 422

        nuevo_empleado = Empleado(
            nombre=datos["nombre"],
            departamento=datos["departamento"],
            sueldo=datos["sueldo"],
        )
        db.session.add(nuevo_empleado)
        db.session.commit()
        return empleado_schema.dump(nuevo_empleado), 201


class EmpleadoResource(Resource):
    """Maneja un empleado puntual: /api/empleados/<id>"""

    def get(self, id_empleado):
        empleado = Empleado.query.get_or_404(id_empleado)
        return empleado_schema.dump(empleado), 200

    def put(self, id_empleado):
        empleado = Empleado.query.get_or_404(id_empleado)
        json_data = request.get_json()
        if not json_data:
            return {"mensaje": "No se enviaron datos"}, 400

        try:
            # partial=True permite actualizar solo algunos campos
            datos = empleado_schema.load(json_data, partial=True)
        except ValidationError as err:
            return {"errores": err.messages}, 422

        for campo, valor in datos.items():
            setattr(empleado, campo, valor)

        db.session.commit()
        return empleado_schema.dump(empleado), 200

    def delete(self, id_empleado):
        empleado = Empleado.query.get_or_404(id_empleado)
        db.session.delete(empleado)
        db.session.commit()
        return {"mensaje": "Empleado eliminado correctamente"}, 200