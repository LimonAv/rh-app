"""
Centraliza la creación de las instancias de las extensiones de Flask
(SQLAlchemy, Migrate, CORS, Marshmallow), SIN inicializarlas todavía
con una app.

¿Por qué un archivo separado?
Si creáramos `db = SQLAlchemy()` directamente dentro de app.py, y
models.py necesitara importar `db` desde app.py, y app.py a su vez
necesitara importar los modelos para que Alembic los detecte...
se generaría una importación circular (circular import).

Al definir las extensiones en un archivo neutral que no depende de
nadie más, tanto app.py como models.py, schemas.py y api/ pueden
importar de aquí sin conflictos. Más adelante, en app.py, se hace
`db.init_app(app)`, `ma.init_app(app)`, etc. para "conectar" cada
instancia con la app real.
"""
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_marshmallow import Marshmallow

# Factory pattern

db = SQLAlchemy()  # Se inicializa el objeto para interactuar con la base de datos usando clase de Python
migrate = Migrate()  # Se encarga de las migraciones de base de datos (Alembic). Permite realizar cambios en el esquema de tu base de datos (agregar columnas, tablas) sin perder datos existentes.
cors = CORS()  # Necesario para el front-end
ma = Marshmallow()  # Se usa para serializar/deserializar datos, enviar respuestas de tipo JSON
