# Guideline para Ejecución de Desarrollo con Junie

Este documento define los lineamientos que Junie debe seguir al ejecutar implementaciones, correcciones o mejoras en este proyecto. El objetivo es mantener un proceso **estructurado, trazable y de calidad**, basado en buenas prácticas observadas en flujos de trabajo efectivos.

---

## 0. Creación de Rama de Trabajo
**First, before starting any work, create a new git branch. (YOU MUST CREATE NEW BRANCH)**
- Cada ticket debe desarrollarse en una rama independiente.
- El nombre de la rama debe seguir el formato:  JUNIE-WIP-<ticketID> SEGUN el requerimiento analizado
- Ejemplo:  JUNIE-WIP-1234

---

## 1. Revisión de Estándares de Desarrollo
⚠️ **Antes de analizar requisitos o crear un plan, SIEMPRE revisar los estándares de desarrollo ubicados en:** ./junie/development-standards.md
- Estos estándares definen convenciones de código, patrones de arquitectura, estilo y buenas prácticas específicas del proyecto.
- **Es obligatorio** seguirlos para garantizar la **uniformidad y consistencia del código** en todo el proyecto.
- Cualquier implementación, refactorización o corrección debe **alinearse estrictamente con estos estándares**.
- Si un estándar entra en conflicto con un requisito, documentar la situación en `tasks-<ticketID>.md` y solicitar validación antes de continuar.
- Consultar el **MCP `context7`** correspondiente al requerimiento del prompt o al desarrollo solicitado por el usuario.
    - Este contexto puede contener lineamientos adicionales, ejemplos, dependencias o convenciones que complementan los estándares internos.
    - La solución propuesta debe estar **alineada tanto con `development-standards.md` como con `context7`**.

👉 La combinación de ambos garantiza **uniformidad y consistencia del código**, además de mantener el proyecto en línea con directrices externas o específicas del entorno MCP.

---


---

## 2. Análisis Previo
- Leer y comprender los **requisitos** desde los archivos de especificación ubicados en `./junie/requirements-<ticketID>.md`.
- Identificar qué **módulos, componentes y servicios** del proyecto están involucrados.
- Verificar si el cambio requiere modificaciones en **backend, frontend, base de datos o pruebas**.

---

## 3. Planificación y Tareas
- Generar un **plan de implementación** inicial en lenguaje claro y estructurado.
- Confirmar que el plan esté alineado con los estándares revisados en `development-standards.md`.
- Crear o actualizar el archivo `./junie/tasks-<ticketID>.md` con:
    - Lista **enumerada** de tareas específicas y atómicas.
    - Marcar dependencias entre tareas.
    - Incluir una estimación de impacto en cada tarea (ej. "frontend", "backend", "tests").
- Mantener `tasks-<ticketID>.md` como fuente de verdad del progreso, marcando cada tarea como **done** al finalizar.

---

## 4. Implementación de Código
- NO GENERAR COMENTARIOS EN EL CODIGO A NO SER QUE SEA SUMAMENTE NECESARIO
- Trabajar siempre dentro de la rama creada para el ticket.
- Respetar la **arquitectura existente** y los patrones del proyecto.
- Cumplir con las guías de estilo y convenciones definidas en `development-standards.md`.
- Dividir el trabajo en **commits pequeños y descriptivos** (uno por tarea completada).
- No introducir dependencias externas innecesarias sin justificación.
- Si se modifican archivos sensibles, documentar el motivo en el commit y en `tasks-<ticketID>.md`.

---

## 5. Pruebas y Validación
- Siempre que se agregue funcionalidad, generar **pruebas unitarias** o actualizar las existentes.
- Crear stubs solo si no hay contexto suficiente, pero documentar qué falta implementar.
- Validar el flujo completo en entorno local antes de marcar como terminado.
- Si aparece un error:
    - Intentar corregirlo con una propuesta de cambio de código.
    - Documentar el error y la corrección aplicada en `tasks-<ticketID>.md`.

---

## 6. Frontend y UX
- Si el cambio requiere ajustes en UI:
    - Agrupar nuevas opciones en secciones claras (ej. "Opciones Avanzadas") para no sobrecargar pantallas principales.
    - Mantener consistencia con estilos y convenciones ya definidos.
- Validar que no se rompan formularios, validaciones o interacciones previas.

---

## 7. Documentación
- Todos los archivos relacionados con el ciclo de desarrollo deben mantenerse dentro de la carpeta `./junie/`:
    - `requirements-<ticketID>.md` → contiene los requisitos del ticket.
    - `tasks-<ticketID>.md` → contiene las tareas desglosadas y su progreso.
- Si hay cambios en el alcance, actualizar el archivo de requisitos correspondiente.
- Documentar configuraciones especiales en `README.md` o en la wiki/confluence del proyecto si aplica.

---

## 8. Buenas Prácticas de Entrega
- Código limpio, consistente y alineado con **linters/formatters** configurados.
- Revisar nombres de variables, métodos y clases para que sean claros y semánticos.
- Confirmar que la aplicación **compila y corre sin errores** antes de entregar cambios.
- Evitar dejar código comentado innecesario, logs temporales o pruebas manuales incrustadas.

---

## 9. Supervisión Humana
- Asumir que la **validación final siempre corresponde a un desarrollador humano**.
- Señalar en comentarios de commits o en `tasks-<ticketID>.md` los puntos donde es necesaria una revisión manual.
- Si se detecta ambigüedad en los requisitos, detenerse y solicitar clarificación.

---