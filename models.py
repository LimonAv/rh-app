"""
Define el modelo (tabla) Empleado usando el ORM de SQLAlchemy.
Cada clase = una tabla. Cada atributo db.Column = una columna.
"""
from extensions import db


class Empleado(db.Model):
    __tablename__ = "empleados"  # Nombre de la tabla de la base de datos

    idEmpleado = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(120), nullable=False)
    departamento = db.Column(db.String(80), nullable=False)
    sueldo = db.Column(db.Numeric(10, 2), nullable=False)

    def __repr__(self):
        return f"<Empleado {self.idEmpleado} - {self.nombre}>"