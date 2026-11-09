# Revisar resultados y mejorar los próximos guiones

Basta con decir: *"¿cómo van los videos?"*, *"revisa resultados de deportes"* o *"compara los canales"*. Claude sigue estos pasos para cada canal pedido (si no se dice cuál, todos los que tengan `metricool.blogId`).

1. **Leer** `canales/<canal>/canal.json` (marca: `metricool.blogId`) y `canales/<canal>/resultados.md` (qué está publicado y cuándo). `node core/canal.ts` muestra el estado de todos los videos.
2. **Pedir las métricas** a Metricool de los últimos 30 días:
   - `getAnalyticsAvailableMetrics` con `network: instagram, connector: reels` y `network: youtube, connector: videos` (la primera vez, para conocer los IDs; anotarlos al final de este archivo).
   - `getAnalyticsDataByMetrics` con esos IDs: vistas, alcance, likes, comentarios, compartidos, guardados y, si existe, tiempo medio de visualización / retención.
3. **Actualizar** la tabla de `canales/<canal>/resultados.md` (una fila por video y red). Solo videos con 48 h o más: antes los números todavía cambian mucho.
4. **Sacar conclusiones** (máximo 5, en lenguaje simple) en la sección "Aprendizajes" de ese canal: qué tipo de gancho, tema, duración y horario rinde más. Comparar contra la mediana, no contra el mejor video.
5. **Comparar canales** (si hay más de uno con datos): actualizar `canales/comparacion.md` con la mediana de vistas a las 48 h, la retención de los primeros 3 s y los seguidores ganados por canal, y decir en una línea cuál va mejor.
6. **Proponer los siguientes 3 guiones** del banco (`canales/<canal>/ideas.md`) que más se parezcan a lo que funcionó, o ideas nuevas en esa línea, y preguntar cuál escribir.

## IDs de métricas (se rellenan la primera vez; son iguales para todos los canales)

- Instagram reels: _pendiente_
- YouTube videos: _pendiente_
