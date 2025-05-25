# 🐟 Puka Koi Backend

Backend del restaurante **Puka Koi**, desarrollado en **Node.js + TypeScript** con conexión a base de datos **MySQL** y estructura modular y escalable.

---

## 🚀 Tecnologías

- Node.js
- TypeScript
- Express.js
- MySQL (con phpMyAdmin)
- Dotenv
- Git + GitHub

---

## 📁 Estructura del proyecto

src/
├── controllers/ # Lógica HTTP
├── routes/ # Rutas de la API
├── services/ # Acceso a la base de datos
├── models/ # Interfaces y tipos
├── config/ # Configuración de DB
├── middleware/ # Manejo de errores
└── utils/ # Utilidades compartidas


---

## ⚙️ Configuración

1. Clonar el proyecto:
   ```bash
   git clone https://github.com/TU_USUARIO/puka-backend.git
   cd puka-backend


2. Instalar dependencias:
npm install

3. Crear un archivo .env:

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_clave
DB_NAME=nombre_bd

3. Ejecutar el proyecto:
npm run dev


🧪 Endpoints principales
📦 Productos
GET /api/products

GET /api/products/:id

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

🗂 Categorías
GET /api/categories

GET /api/categories/:id

POST /api/categories

PUT /api/categories/:id

DELETE /api/categories/:id

🔐 Validaciones implementadas
Verificación de campos obligatorios

Validación de tipos (boolean, number)

Clave foránea entre productos y categorías

Manejo global de errores con AppError

📝 Autor
Renzo Serra
📍 Los Andes, Chile