# Real-Time Draw

Aplicación de dibujo en tiempo real usando Socket.io, Express, y Canvas API.

## Estructura del Proyecto

- **Servidor**: Desplegado en Render (Socket.io + Express)
- **Frontend**: Desplegado en Vercel (HTML + JavaScript)

## Configuración

### 1. Desplegar el Servidor en Render

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Crea un nuevo "Web Service"
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Name**: `real-time-draw-server` (o el nombre que prefieras)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: Deja vacío (raíz del proyecto)
5. Haz clic en "Create Web Service"
6. Una vez desplegado, copia la URL (ej: `https://real-time-draw-server.onrender.com`)

### 2. Configurar el Frontend

1. Abre el archivo `public/script.js`
2. Busca la línea que dice: `const SERVER_URL = ...`
3. Reemplaza `'https://TU-URL-DE-RENDER.onrender.com'` con la URL real de tu servidor en Render
4. Guarda el archivo

### 3. Desplegar el Frontend en Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Haz clic en "Add New Project"
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Framework Preset**: Otro
   - **Root Directory**: Deja vacío
   - **Build Command**: Deja vacío (no hay build)
   - **Output Directory**: `public`
5. Haz clic en "Deploy"

## Desarrollo Local

### Instalar dependencias
```bash
npm install
```

### Ejecutar servidor
```bash
npm start
# o para desarrollo con auto-reload
npm run dev
```

El servidor estará disponible en `http://localhost:3005`

### Abrir el frontend
Abre `public/index.html` en tu navegador o usa un servidor local.

## Variables de Entorno

El servidor usa el puerto definido en `process.env.PORT` (Render lo configura automáticamente) o `3005` por defecto en desarrollo local.

