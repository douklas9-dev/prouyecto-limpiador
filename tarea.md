# Especificación del Proyecto: Limpiador de LaTeX Exprés (JAMstack)

**Objetivo del Sistema:**  
Crear una aplicación web estática de una sola página (SPA) capaz de procesar, limpiar y formatear cadenas de texto que contengan comandos y sintaxis propia de LaTeX. La prioridad absoluta del desarrollo es la velocidad de ejecución (procesamiento del texto instantáneo) y una estética web moderna, minimalista y responsiva.

---

## 1. Fase de Investigación y Análisis de Requisitos

El agente OpenCode deberá investigar y mapear los patrones de sintaxis LaTeX más comunes presentes en textos de plataformas educativas o digitalizados, asegurando que el motor de limpieza resuelva los siguientes escenarios:

1. **Símbolos de Operación Matemática:** Reemplazar comandos de formateo matemático nativos por sus equivalentes visuales limpios (ejemplo: transformar comandos de multiplicación o división en sus símbolos reales `×` y `÷`).
2. **Contenedores de Estilo y Énfasis:** Rastrear estructuras de formato de texto como negritas matemáticas (`\bm{...}`), textos enriquecidos (`\textbf{...}`, `\textit{...}`) o tipografías específicas, y extraer exclusivamente el contenido alfanumérico que reside en su interior, descartando la envoltura de código.
3. **Limpieza de Caracteres de Escape:** Detectar y suprimir barras invertidas (`\`) huérfanas producto de errores de codificación o malas importaciones de bases de datos antes de signos de puntuación.
4. **Reactividad Inmediata:** La experiencia de usuario no debe depender de eventos de envío manual (como un botón "Procesar"). El flujo de datos debe reaccionar en milisegundos directamente en el hilo principal del cliente mientras el usuario interactúa con la interfaz.

---

## 2. Fase de Planificación (UI/UX y Arquitectura)

Para garantizar un despliegue ultra rápido en Netlify y evitar cuellos de botella de renderizado, se establece una arquitectura estática pura sin dependencias de compilación ni frameworks de backend.

### Estructura de Archivos
El proyecto se limitará estrictamente a:
* Un archivo principal de interfaz y lógica de usuario en la raíz.
* Un archivo de configuración de entorno para producción en la raíz.

### Diseño y Comportamiento de Interfaz (Tailwind CSS)
El agente diseñará un layout basado en un Grid de dos columnas principales para resoluciones de escritorio (colapsable a una sola columna en móviles):
* **Panel de Entrada:** Un área de texto enriquecida con enfoque (focus) estilizado, tipografía monoespaciada para facilitar la lectura de código fuente y un marcador de posición (placeholder) limpio.
* **Panel de Salida:** Un contenedor visual de contraste (estilo terminal moderna o modo oscuro) que proyecte el resultado de la limpieza. Debe incluir un botón interactivo superior para "Copiar al portapapeles" que aparezca únicamente cuando exista contenido y que entregue feedback visual inmediato tras el éxito de la acción (cambio de estado o color).
* **Estética General:** Paleta de colores minimalista basada en escalas de grises oscuros (Slate) para fondos/textos, y acentos de color vibrantes (Indigo/Violet) para jerarquizar títulos y estados activos. Bordes suavizados y animaciones de transición fluidas en todas las interacciones.

---

## 3. Fase de Construcción e Implementación

Utilizando el **Build Mode**, el agente deberá encargarse de:

1. **Implementar la Interfaz:** Maquetar el documento estructural e integrar los estilos mediante clases de Tailwind CSS en su versión más reciente.
2. **Desarrollar el Motor de Reglas:** Programar la lógica en JavaScript Vanilla de alto rendimiento. Se deben utilizar expresiones regulares (Regex) optimizadas y globales asociadas a los eventos de escucha del teclado o cambios de entrada de texto (`input`) para lograr un filtrado en tiempo real sin latencia.
3. **Garantizar la Seguridad del Lado del Cliente:** Asegurar que la inserción del texto limpio en el contenedor de salida se realice mediante métodos seguros que eviten vulnerabilidades de inyección de código (XSS), tratando el flujo estrictamente como texto plano.
4. **Configuración de Producción (Netlify):** Crear la directiva de configuración para el servidor de Netlify especificando la raíz como el directorio de publicación, asegurando la optimización de caché, prevención de clickjacking y políticas de seguridad básicas de cabecera.