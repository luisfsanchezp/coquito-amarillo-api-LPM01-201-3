# coquito-amarillo-api-LPM01-201-3
LPM01-201-3 U4AEAE1 API-REST+NodeJS+Express directamente en codesapaces de GitHub.
# 🖥️ ProvvTecno — API REST

> Tienda virtual backend para ProvvTecno, empresa colombiana de Medellín dedicada a la comercialización de productos tecnológicos y soluciones digitales.

[![Node.js](https://img.shields.io/badge/Node.js-v20%20LTS-green)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18-blue)](https://expressjs.com)
[![Jest](https://img.shields.io/badge/Jest-29.x-red)](https://jestjs.io)
[![GitHub Codespaces](https://img.shields.io/badge/GitHub-Codespaces-black)](https://github.com/features/codespaces)

---

## Descripción del proyecto

API REST desarrollada con **Node.js v20 LTS** y **Express 4.x** que sirve como backend de la tienda virtual de ProvvTecno. La API expone endpoints CRUD para el catálogo de productos, gestión de pedidos y una integración simulada con la pasarela de pagos **PSE de ACH Colombia**.

**Desarrollada en:** GitHub Codespaces con VS Code Online  
**Control de versiones:** Git con Conventional Commits y feature branches  
**Pruebas:** Jest 29 + Supertest  

---

## Stack tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Node.js | v20.x LTS | Runtime JavaScript del servidor |
| Express | ^4.18 | Framework web REST |
| Jest | ^29.x | Pruebas unitarias e integración |
| Supertest | ^7.x | Pruebas HTTP sobre Express |
| Nodemon | ^3.x | Recarga automática en desarrollo |
| uuid | ^9.x | Generación de IDs únicos |
| cors | ^2.8 | Habilitación CORS para el frontend |
| dotenv | ^16.x | Variables de entorno |

---

## Estructura del proyecto
---

## Instalación y ejecución

### Opción A — GitHub Codespaces (recomendado)

1. Abre el repositorio en GitHub
2. Haz clic en **Code → Codespaces → Create codespace on main**
3. VS Code Online se abre con el entorno configurado automáticamente
4. En la terminal:

```bash
npm run dev
```

El servidor queda disponible en el puerto 4000.

### Opción B — Entorno local

**Requisitos previos:** Node.js v20 LTS, npm v10+

```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/provvtecno-api.git
cd provvtecno-api

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Iniciar servidor en modo desarrollo
npm run dev

# 5. Verificar que está corriendo
curl http://localhost:4000/
```

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor con Nodemon (recarga automática) |
| `npm start` | Inicia servidor en producción |
| `npm test` | Ejecuta suite de pruebas Jest con cobertura |

---

## Tabla de endpoints

### Productos

| Método | Ruta | HTTP | Descripción |
|---|---|---|---|
| `GET` | `/api/productos` | 200 | Listar productos. Filtros: `?categoria=tecnologia&min_precio=5000` |
| `GET` | `/api/productos/:id` | 200 / 404 | Obtener producto por ID |
| `POST` | `/api/productos` | 201 / 400 | Crear nuevo producto |
| `PUT` | `/api/productos/:id` | 200 / 404 | Actualizar producto existente |
| `DELETE` | `/api/productos/:id` | 204 / 404 | Eliminar producto del catálogo |

**Ejemplo body POST /api/productos:**
```json
{
  "nombre": "Mouse Inalámbrico ProvvTecno",
  "descripcion": "Mouse ergonómico inalámbrico 2.4GHz",
  "precio": 45000,
  "stock": 30,
  "categoria": "accesorios",
  "imagen_url": "https://provvtecno.com/img/mouse.jpg"
}
```

---

### Pedidos

| Método | Ruta | HTTP | Descripción |
|---|---|---|---|
| `GET` | `/api/pedidos` | 200 | Listar pedidos. Filtros: `?estado=PENDIENTE` |
| `GET` | `/api/pedidos/:id` | 200 / 404 | Obtener pedido por ID |
| `POST` | `/api/pedidos` | 201 / 400 | Crear nuevo pedido |
| `PATCH` | `/api/pedidos/:id/estado` | 200 / 404 | Actualizar estado del pedido |

**Ejemplo body POST /api/pedidos:**
```json
{
  "cliente": {
    "nombre": "Carlos Andrés Ospina",
    "email": "cospina@correo.com",
    "telefono": "3153456789",
    "direccion": "Calle 10 #43-45, Laureles, Medellín"
  },
  "productos": [
    {
      "producto_id": "prod-001",
      "cantidad": 2,
      "precio_unitario": 45000
    }
  ],
  "metodo_pago": "PSE",
  "notas": "Entregar en horario de oficina"
}
```

Estados válidos: `PENDIENTE` → `CONFIRMADO` → `ENVIADO` → `ENTREGADO` | `CANCELADO`

---

### Pasarela PSE — ACH Colombia (Simulada)

| Método | Ruta | HTTP | Descripción |
|---|---|---|---|
| `GET` | `/api/pagos-pse/bancos` | 200 | Listar bancos habilitados ACH Colombia |
| `POST` | `/api/pagos-pse` | 200 / 400 / 402 | Iniciar transacción PSE simulada |
| `GET` | `/api/pagos-pse/:ref` | 200 / 404 | Consultar estado por referencia |

**Ejemplo body POST /api/pagos-pse:**
```json
{
  "banco_codigo": "1007",
  "tipo_persona": "N",
  "tipo_documento": "CC",
  "numero_documento": "1098765432",
  "monto": 90000,
  "descripcion": "Compra tienda ProvvTecno - Pedido #PV-2026-0001",
  "url_respuesta": "https://provvtecno.com/pagos/respuesta",
  "url_confirmacion": "https://provvtecno.com/pagos/confirmacion"
}
```

**Respuesta PSE:**
```json
{
  "ok": true,
  "mensaje": "Transacción PSE aprobada exitosamente",
  "data": {
    "referencia": "TXN-20260504-7823",
    "estado": "APROBADO",
    "banco_nombre": "Bancolombia",
    "monto": 90000,
    "moneda": "COP",
    "codigo_respuesta": "00",
    "mensaje_banco": "Transacción aprobada",
    "numero_documento": "SHA256:a3f7b2c9d1e4f6a8b2c4..."
  }
}
```

> **Seguridad:** Los números de documento se cifran con SHA-256 antes de almacenarse. Nunca se persisten en claro.

---

## Pruebas con Thunder Client

1. Instalar la extensión **Thunder Client** en VS Code
2. Ir a Thunder Client → Collections → Import
3. Seleccionar el archivo `thunder-client-collection.json`
4. La colección incluye 17 requests organizados en 3 carpetas

---

## Pruebas unitarias con Jest

```bash
npm test
```

La suite incluye **21 pruebas** que cubren:
- CRUD completo de productos (12 pruebas)
- Pasarela PSE: bancos, transacciones, consultas (7 pruebas)

---

## Flujo Git recomendado (Conventional Commits)

```bash
git checkout -b feat/setup-proyecto

git commit -m "feat: inicializar proyecto Node.js con Express y estructura de carpetas"
git commit -m "feat(productos): implementar CRUD completo con validaciones"
git commit -m "feat(pedidos): agregar endpoints GET y POST con validación de cliente"
git commit -m "feat(pse): integrar módulo simulado pasarela PSE ACH Colombia"
git commit -m "test: agregar pruebas unitarias Jest para productos y PSE"
git commit -m "docs: completar README con tabla de endpoints y guía de instalación"

git push origin feat/setup-proyecto
```

---

## Consideraciones de seguridad

- Los números de documento se cifran con SHA-256 antes de cualquier almacenamiento
- En producción se deben usar certificados SSL/TLS y tokens OAuth2 de ACH Colombia
- Las variables sensibles van en `.env` (excluido del repositorio con `.gitignore`)
- CORS habilitado — en producción restringir al dominio del frontend

---

## Autor
EDWIN DISNEY CORDOBA RENGIFO

Proyecto académico — ProvvTecno  
Asignatura: lenguajes de computacion para moviles
Medellín, Colombia — 2026