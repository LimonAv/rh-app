"""
Schemas de Marshmallow: convierten objetos Python (instancias de
Empleado) <-> JSON, y validan los datos que llegan en el cuerpo
de las peticiones (request body) antes de tocar la base de datos.

Heredamos de `ma.Schema` (Flask-Marshmallow) en vez de `Schema`
(marshmallow plano) para que el schema quede integrado con la app:
esto habilita extras como generar URLs (`ma.URLFor`/`ma.Hyperlinks`)
y, si más adelante instalas `marshmallow-sqlalchemy`, también te da
acceso a `ma.SQLAlchemyAutoSchema` para generar campos automáticamente
a partir del modelo, sin tener que escribirlos a mano uno por uno.
"""
from marshmallow import fields, validate
from extensions import ma


class EmpleadoSchema(ma.Schema):
    idEmpleado = fields.Integer(dump_only=True)
    nombre = fields.String(required=True, validate=validate.Length(min=1, max=120))
    departamento = fields.String(required=True, validate=validate.Length(min=1, max=80))
    sueldo = fields.Decimal(required=True, places=2, as_string=True)


# Una instancia para serializar un solo empleado, otra para listas.
empleado_schema = EmpleadoSchema()
empleados_schema = EmpleadoSchema(many=True)