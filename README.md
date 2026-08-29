<div align="center">

# 🗂️ RH App

### Sistema de gestión de personal — CRUD completo con Angular

*Un expediente digital para administrar empleados: alta, edición, consulta y baja, con una interfaz pensada como un archivo de personal.*

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Sí-5fd6a4?style=for-the-badge)

</div>

---

## 📌 Sobre el proyecto

**RH App** es una aplicación de recursos humanos construida con **Angular** que permite administrar el ciclo completo de un empleado: registrarlo, consultarlo, editarlo y eliminarlo, consumiendo una API REST propia.

Más que un CRUD genérico, el diseño toma el concepto de **"expediente de personal"**: cada empleado se muestra como una ficha, cada departamento tiene un color de identificación propio, y la tabla se convierte en tarjetas apilables en dispositivos móviles — sin romperse ni requerir scroll horizontal.

---

## ✨ Características

- **Listado de empleados** en tiempo real, con estado de carga y estado vacío diseñados (no solo una tabla en blanco).
- **Alta de empleados** mediante formulario reactivo con validaciones (nombre mínimo, campos requeridos, sueldo numérico).
- **Edición de empleados** cargando los datos existentes desde la API por ID.
- **Eliminación de empleados** con confirmación antes de borrar.
- **Colores por departamento**: cada departamento recibe un color estable (hash del nombre), visible como acento en cada fila/tarjeta.
- **100% responsivo**: la tabla se transforma en tarjetas tipo ficha en pantallas pequeñas.
- **Identidad visual propia**: paleta violeta + dorado, tipografía Fraunces/Inter/JetBrains Mono, sin depender de estilos por defecto de Bootstrap.
- **Accesibilidad básica**: foco visible en todos los controles interactivos, `prefers-reduced-motion` respetado.

---

## 🧱 Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | Angular (standalone components, signals) |
| Lenguaje | TypeScript |
| Estilos | CSS personalizado + Bootstrap 5 |
| HTTP | `HttpClient` (Angular) contra una API REST propia |
| Enrutamiento | Angular Router |
| Formularios | Template-driven forms (`ngModel`) |

---

## 🗺️ Estructura del proyecto

```
src/app/
├── empleado.ts                  # Interfaz Empleado
├── empleados/
│   ├── empleado.service.ts      # Consumo de la API REST (GET, POST, PUT, DELETE)
│   ├── lista/                   # Listado de empleados
│   ├── agregar/                 # Alta de empleado
│   └── editar/                  # Edición de empleado
├── app.routes.ts                # Definición de rutas
├── app.config.ts                # Configuración de la app (router, HttpClient)
└── app.html / app.ts            # Shell principal + navegación
```

---

## 🔌 API consumida

La aplicación consume una API REST propia sobre el recurso `empleados`:

| Método | Endpoint | Acción |
|---|---|---|
| `GET` | `/api/empleados` | Obtener todos los empleados |
| `GET` | `/api/empleados/:id` | Obtener un empleado por ID |
| `POST` | `/api/empleados` | Crear un nuevo empleado |
| `PUT` | `/api/empleados/:id` | Actualizar un empleado existente |
| `DELETE` | `/api/empleados/:id` | Eliminar un empleado |

> Por defecto la app apunta a `http://localhost:8080/api/empleados`. Ajusta la URL en `empleado.service.ts` según tu backend.

---

## 🚀 Cómo correrlo localmente

```bash
# 1. Clona el repositorio
git clone <url-del-repo>
cd rh-app

# 2. Instala dependencias
npm install

# 3. Levanta el servidor de desarrollo
ng serve
```

Abre `http://localhost:4200` en tu navegador. La app espera un backend corriendo en `http://localhost:8080` que exponga los endpoints de la tabla anterior.

---

## 🎨 Diseño

El diseño evita el "look" genérico de un panel administrativo por defecto:

- **Paleta**: fondo violeta oscuro con gradiente radial, acento dorado para contraste.
- **Tipografía**: `Fraunces` (serif, títulos), `Inter` (texto general), `JetBrains Mono` (IDs y cifras — efecto de libro contable).
- **Elemento de firma**: cada fila de empleado tiene un color de departamento propio, visible como borde de acento, tanto en escritorio como en la vista de tarjetas móvil.

---

## 📋 Posibles mejoras futuras

- [ ] Dashboard con totales de nómina y empleados por departamento.
- [ ] Búsqueda y filtros en el listado.
- [ ] Paginación del lado del servidor.
- [ ] Autenticación y roles (admin / lectura).
- [ ] Exportar listado a Excel / PDF.

---

<div align="center">

Hecho con Angular · Proyecto de portafolio

</div>
