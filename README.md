# Proyecto Final de Programación Web Avanzada

Este proyecto es una aplicación de gestión de productos que combina un frontend en React con un backend en Node.js + Express + TypeScript. La aplicación incluye:

- Vista pública del catálogo de productos.
- Login de administrador.
- CRUD de productos (crear, editar, eliminar).
- Reporte de productos con stock bajo.

## Qué usamos de los parciales

### Primer parcial
- `React` y `Vite` para el frontend.
- Routing con `react-router-dom`.
- Autenticación en el frontend usando contexto (`AuthContext`) y `localStorage` para mantener sesión.
- Componentes de interfaz para mostrar listas y formularios.
- Uso de estados locales con `useState` y efectos con `useEffect` en hooks personalizados.

### Segundo parcial
- `Node.js` y `Express` para el backend.
- `TypeScript` en backend y frontend.
- `Prisma` con SQLite para modelo de datos y persistencia.
- Autenticación JWT y roles (`ADMIN`).
- Middleware de protección de rutas y manejo de errores centralizado.
- API REST para productos y reportes.

## Estructura del proyecto

- `frontend/`: aplicación React.
- `backend/`: API REST con Express.

## Requisitos previos

- Node.js 18 o superior.
- npm.
- Git (para subir el proyecto al repositorio).

## Instalación y ejecución

1. Instalar dependencias del backend:

```bash
cd backend
npm install
```

2. Configurar base de datos y Prisma:

```bash
npx prisma migrate dev --name init
npm run seed
```

3. Iniciar el backend:

```bash
npm run dev
```

4. Instalar dependencias del frontend:

```bash
cd ../frontend
npm install
```

5. Iniciar el frontend:

```bash
npm run dev
```

6. Abrir el navegador en la dirección que indique Vite, normalmente `http://localhost:5173`.

## Cómo probar

- Ir a la página principal para ver el catálogo público.
- Iniciar sesión con el administrador.
- Usar la vista de administración para crear, editar y eliminar productos.
- Ver el reporte de stock bajo.

## Datos de acceso

- Email: `admin@stockflow.com`
- Contraseña: `admin123`

## Nota para el profesor — cómo usar el REST Client incluida en el repo

El archivo de peticiones REST listo para usar en stockflow-api.http. Pasos rápidos para probar todo:

Requisitos: Node.js (18+), npm, Git, Visual Studio Code y la extensión REST Client instalada.

## Levantar backend:

cd backend
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev

## Levantar frontend:

cd frontend
npm install
npm run dev

## Probar API con REST Client:

- Abrir VS Code y el archivo stockflow-api.http.
- Ejecutar la petición Login Admin (Send Request) para obtener el token.
- Copiar el token y reemplazar {{TOKEN}} en las peticiones o usar la respuesta para setear la variable.
- Usar Create New Product, Update Product (rellenar {{PRODUCT_ID}}) y Low Stock Report para validar comportamiento.

