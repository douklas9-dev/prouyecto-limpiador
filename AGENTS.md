# AGENTS.md — proyecto-limpiador

## Stack
- HTML + Tailwind CSS (CDN) + Vanilla JS. Sin build, sin bundler, sin frameworks.
- Solo `index.html` y `netlify.toml` en la raíz.

## Dev
- No hay servidor de desarrollo — abre `index.html` directamente en el navegador o usa `npx serve .`
- Sin npm, sin dependencias, sin scripts.

## Arquitectura
- Motor de limpieza: eventos `input` + regex globales — sin botón "Procesar".
- Output usa `textContent` (nunca `innerHTML`) para prevenir XSS.
- Botón "Copiar al portapapeles" visible solo cuando hay contenido de salida.

## Deploy
- Netlify: publicar raíz del repo.
- `netlify.toml` debe incluir headers de seguridad (clickjacking, CSP, caché).

## Convenciones
- Paleta: Slate (fondos/textos), Indigo/Violet (acentos).
- Grid 2 columnas escritorio → 1 columna móvil.
- Placeholder monoespaciado en panel de entrada.
