# Publicar un short en Instagram y YouTube (vía Metricool)

Basta con decir en el chat: *"sube emmy-warcraft"* o *"programa los videos terminados"*. Claude sigue estos pasos.

## Una sola vez (configuración)

1. **Conectar la marca en Metricool:** en metricool.com, entra a tu marca de gaming → *Conectar redes* → Instagram (cuenta profesional o de creador, vinculada a una página de Facebook) y YouTube. Sin eso, Metricool no puede publicar por ti.
2. **Elegir la marca:** Claude llama a `getBrandSettings`, te muestra las marcas y guarda el `blogId` elegido en `ideas/publicacion.json` (`{ "blogId": "...", "timezone": "..." }`).
3. **Enlace público del video:** `gh auth login` una vez (escribe `! gh auth login` en el chat). El repo tiene que ser público para que Metricool pueda descargar el video.

## Cada video

1. **Comprobar** que existe `videos/<topic>/final.mp4` y que `report.md` dice PASS.
2. **Textos:** si no existe `videos/<topic>/publish.json`, escribirlo a partir de `guion.md`:
   ```json
   {
     "youtubeTitle": "máx. 70 caracteres, con el gancho y #shorts",
     "caption": "gancho + 1 línea de contexto + pregunta para comentarios + 3-5 hashtags",
     "youtubeTags": ["south park", "..."],
     "firstComment": "opcional: dato extra o fuente",
     "aiVoice": true
   }
   ```
3. **Subir (Google Drive, lo que usa el usuario):** subir `final.mp4` con el conector de Drive (`create_file`, `video/mp4`, sin conversión), compartirlo con `share_file` como `anyoneWithLink` / `reader` (si queda privado, Metricool responde "Failed to normalize media") y guardar el enlace como `videoUrl` en `publish.json`. Alternativa: `node core/upload.ts videos/<topic>` (GitHub, repo público).
4. **Horario:** si el usuario no dio hora, `getBestTimeToPostByNetwork` para instagram y youtube en los próximos 7 días; no poner dos videos el mismo día.
5. **Mostrar el plan y esperar el OK** (fecha, hora, textos, redes). Publicar es público: nunca programar sin confirmación.
6. **Programar** con `createScheduledPost` (un post con los dos proveedores):
   - `providers`: `[{"network":"instagram"},{"network":"youtube"}]`
   - `media`: `[videoUrl]`, `text`: `caption`
   - `instagramData`: `{"type":"REEL","showReelOnFeed":true,"isAiGenerated": aiVoice}`
   - `youtubeData`: `{"title": youtubeTitle,"type":"short","privacy":"public","madeForKids":false,"category":"ENTERTAINMENT","tags": youtubeTags,"isAiGeneratedContent": false}` (la voz IA en una animación no es "contenido realista alterado"; cambiarlo si el usuario prefiere declararlo)
   - `publicationDate`: `{dateTime, timezone}` con la zona horaria de la marca.
7. **Registrar:** guardar en `publish.json` la fecha y el `plannerUrl`, y marcar el tema como `publicado` en `ideas/south-park.md` y en `ideas/resultados.md`.
