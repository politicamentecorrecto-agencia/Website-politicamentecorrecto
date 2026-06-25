# Políticamente Correcto — Sitio web

Landing one-page de presentación de ventas para una agencia de servicio
audiovisual y comunicación política.

**Sello de la agencia:** _Alta producción, proceso real._

---

## Stack

- **HTML5 + CSS3 + JavaScript vanilla**
- Sin frameworks · sin build step · sin dependencias npm
- Única dependencia externa: Google Fonts (`Anton` + `Inter`) vía `<link>`
- Deploy como **sitio estático** (Vercel, Netlify, GitHub Pages, etc.)

## Estructura

```
/
├── index.html          → Estructura y contenido (todas las secciones)
├── css/
│   └── styles.css      → Sistema de diseño completo
├── js/
│   └── main.js         → Interacciones (nav, reveal, paquetes, acordeón)
├── assets/
│   └── img/            → Imágenes (vacío; placeholders en CSS/SVG por ahora)
├── favicon.svg         → Favicon vectorial
└── README.md
```

> El CSS y el JS van **siempre en archivos separados**. El HTML no lleva
> estilos ni scripts inline (salvo el SVG decorativo y el favicon vectorial).

## Correr en local

No necesita instalación. Tres opciones:

**A) Abrir el archivo directamente**
Doble clic en `index.html`. Funciona, aunque algunos navegadores limitan ciertas
APIs al usar `file://`.

**B) Servidor local con Python** (recomendado)
```bash
# Python 3
python3 -m http.server 5173
# Luego abre: http://localhost:5173
```

**C) Servidor local con Node**
```bash
npx serve .
# o
npx http-server -p 5173
```

## Deploy en Vercel

### Opción 1 — Arrastrar y soltar (sin Git)
1. Entra a [vercel.com/new](https://vercel.com/new).
2. Arrastra la carpeta del proyecto a la zona de carga.
3. Vercel detecta un sitio estático. **No hay build command ni output dir** que
   configurar: deja todo por defecto y pulsa **Deploy**.

### Opción 2 — Conectado a Git (recomendado)
1. Sube el repo a GitHub (ya conectado a este remoto).
2. En Vercel: **Add New → Project → Import Git Repository**.
3. Selecciona el repositorio. Framework Preset: **Other**.
4. Build Command: _(vacío)_ · Output Directory: `.` (raíz). Pulsa **Deploy**.
5. Cada `git push` a `main` despliega automáticamente.

> Al ser estático no requiere `vercel.json`. Si quieres fijar configuración,
> basta con un archivo mínimo, pero no es necesario.

## Personalización rápida

| Qué | Dónde |
|-----|-------|
| Paleta de color | `css/styles.css` → bloque `:root` (variables `--naranja`, `--azul`, …) |
| Número de WhatsApp | `index.html` → `href="https://wa.me/57XXXXXXXXXX"` |
| Link de agenda (Calendly) | `index.html` → `data-calendly` (`href="#"`) |
| Redes sociales | `index.html` → `<nav class="footer__social">` |
| Precios y features de paquetes | `index.html` → sección `#paquetes` |
| Fotos del equipo | hoy son monogramas (`.member__avatar`); reemplazar por `<img>` cuando haya foto |

## Accesibilidad

- HTML semántico (`header` / `section` / `footer`), `aria` donde aplica.
- Estados de foco visibles, navegación por teclado en menú y acordeón.
- Respeta `prefers-reduced-motion` (desactiva animaciones).
- Contraste objetivo **AA**.

## Notas

- Cero imágenes raster: las formas son SVG/CSS con la paleta.
- Pensada para funcionar **narrada en reunión** y **en frío** como link de respaldo.
