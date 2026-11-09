# Revisar resultados y mejorar los próximos guiones

Basta con decir: *"¿cómo van los videos?"* o *"revisa resultados"*. Claude sigue estos pasos.

1. **Leer** `ideas/publicacion.json` (marca) y `ideas/resultados.md` (qué está publicado y cuándo).
2. **Pedir las métricas** a Metricool de los últimos 30 días:
   - `getAnalyticsAvailableMetrics` con `network: instagram, connector: reels` y `network: youtube, connector: videos` (la primera vez, para conocer los IDs; anotarlos al final de este archivo).
   - `getAnalyticsDataByMetrics` con esos IDs: vistas, alcance, likes, comentarios, compartidos, guardados y, si existe, tiempo medio de visualización / retención.
3. **Actualizar** la tabla de `ideas/resultados.md` (una fila por video y red). Solo videos con 48 h o más: antes los números todavía cambian mucho.
4. **Sacar conclusiones** (máximo 5, en lenguaje simple) en la sección "Aprendizajes": qué tipo de gancho, tema, duración y horario rinde más. Comparar contra la mediana, no contra el mejor video.
5. **Proponer los siguientes 3 guiones** del banco (`ideas/south-park.md`) que más se parezcan a lo que funcionó, o ideas nuevas en esa línea, y preguntar cuál escribir.

## IDs de métricas (se rellenan la primera vez)

- Instagram reels: _pendiente_
- YouTube videos: _pendiente_
