"""
Punto de entrada de la aplicación. Usa el patrón "Application Factory"
(create_app) en lugar de crear la app directamente a nivel de módulo.

¿Por qué un factory?
- Permite crear varias instancias de la app con distinta configuración
  (producción, pruebas, etc.) sin duplicar código.
- Evita importaciones circulares: las extensiones (db, migrate, cors)
  se inicializan DESPUÉS de crear `app`, no antes.
- Es el patrón recomendado oficialmente por Flask para apps que crecen
  más allá de un solo archivo.
"""
import os
from flask import Flask

from extensions import db, migrate, cors, ma
from api import api_bp


def create_app():
    app = Flask(__name__)

    # --- Configuración de la base de datos ---
    # Usar variables de entorno (con valores por defecto) en vez de
    # escribir el password directamente en el código es buena práctica:
    # así puedes cambiar credenciales sin tocar el código fuente.
    DB_USER = os.environ.get("DB_USER", "root")
    DB_PASSWORD = os.environ.get("DB_PASSWORD", "admin")
    DB_HOST = os.environ.get("DB_HOST", "localhost")
    DB_PORT = os.environ.get("DB_PORT", "3306")
    DB_NAME = os.environ.get("DB_NAME", "recursos_humanos_db")

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


    # Evita que Flask-RESTful escape acentos/ñ como \uXXXX en las respuestas
    # JSON (ej. "Jos\u00e9" en vez de "José"). Técnicamente ambas formas son
    # JSON válido y se decodifican igual en el cliente, pero esta versión
    # es más legible al inspeccionar la respuesta cruda.
    app.config["RESTFUL_JSON"] = {"ensure_ascii": False}

    # --- Inicializar extensiones con esta app ---
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
    ma.init_app(app)

    # --- Registrar Blueprints (rutas) ---
    app.register_blueprint(api_bp)

    @app.get("/")
    def inicio():
        return "API de Recursos Humanos (Flask)"

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)  # Se levanta automaticamente en este puerto la aplicación
