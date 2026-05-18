# LIS Inventory UI

Frontend del sistema de gestión de inventario para LIS (Laboratorio de Ingeniería de Software).

## Stack

- **React 18** + **Vite 5**
- **Auth0 React SDK** — autenticación via Google OAuth2 (PKCE)
- **Bootstrap 5** — estilos base (incluido como asset estático)

## Requisitos

- Node.js 18+
- Cuenta de Auth0 con una aplicación de tipo **Single Page Application**

## Configuración

1. Copia `.env.example` a `.env` y completa los valores:

```
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

2. En el dashboard de Auth0 (**Applications → Tu App → Settings**), agrega `http://localhost:5173` en:
   - Allowed Callback URLs
   - Allowed Logout URLs
   - Allowed Web Origins

## Desarrollo

```bash
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`.

## Build

```bash
npm run build
```

El output queda en `dist/`.

## Despliegue

Al desplegar en producción, agrega la URL de producción a las tres listas en el dashboard de Auth0 y configura las variables de entorno en tu plataforma de hosting (`VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`).

## Estructura

```
src/
  App.jsx          # Enruta entre Login y Dashboard según estado de auth
  main.jsx         # Entry point — monta Auth0Provider
  index.css        # Estilos globales
  pages/
    Login.jsx      # Pantalla de login con Google OAuth
    Dashboard.jsx  # Pantalla principal post-login (en desarrollo)
public/
  lis-logo.png
  bootstrap.min.css
```

## Estado actual

- [x] Autenticación con Google via Auth0
- [x] Login / Logout funcional
- [ ] Módulo de inventario (en desarrollo)
