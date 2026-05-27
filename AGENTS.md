# AGENTS.md — proyecto-limpiador

## Stack
- Vite + React 19 + Tailwind CSS v4 (Vite plugin, no CDN)
- Build: `npm run dev` (dev) / `npm run build` (producción)
- Sin TypeScript, sin backend, sin frameworks adicionales.

## Archivos clave
- `src/App.jsx` — motor de limpieza + UI
- `src/index.css` — tema Tailwind (Apple-style, colores claros/oscuros)
- `vite.config.js` — plugins: React + Tailwind

## Comandos
```bash
npm run dev      # servidor de desarrollo
npm run build    # genera dist/
npm run preview  # previsualiza build local
```

## Reglas de limpieza LaTeX (`cleanLatex` en App.jsx)
1. Elimina entornos `\begin{}` / `\end{}`
2. Elimina delimitadores de modo matemático (`$$`, `$`, `\[`, `\]`, `\(`, `\)`)
3. Reemplaza ~130 símbolos LaTeX por Unicode (`\times→×`, `\alpha→α`, `\vdots→⋮`)
4. Extrae contenido de contenedores de estilo (`\textbf{...}`, `\boxed{...}`, etc.) — iterativo para anidamiento
5. Elimina comandos estructurales con argumentos (`\section{...}`, `\label{...}`)
6. Elimina comandos de espaciado (`\;`, `\:`, `\,`, `\!`)
7. Elimina barras invertidas huérfanas antes de puntuación
8. Extrae superíndices/subíndices (`^{...}`, `_{...}`) y limpia operadores remanentes

## UI
- Apple-style: system font, bordes redondeados (rounded-2xl), sombras sutiles, animaciones fade-up
- Grid 2 columnas (lg) → 1 columna (mobile)
- Botón Copiar con feedback "Copiado" (azul por 2s), visible solo si hay output
- Barra de estadísticas: chars original / chars limpios / chars eliminados
- Placeholder inteligente: "El resultado aparecerá aquí..." / "No hay nada que limpiar..."

## Deploy
- Netlify: `npm run build` → publicar `dist/`
- `netlify.toml` incluye CSP estricto y headers de seguridad
