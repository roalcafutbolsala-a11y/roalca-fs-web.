# ROALCA FS — web inicial

Web estática responsive para Roalca Fútbol Sala, con estética negro + rosa flúor.

## Archivos
- `index.html`: contenido y secciones.
- `styles.css`: diseño responsive.
- `script.js`: menú móvil y año del pie.
- `assets/escudo-roalca.png`: escudo incluido.

## Publicar gratis en Vercel
1. Descomprime `roalca-fs-web.zip`.
2. Entra en https://vercel.com/ y crea una cuenta o inicia sesión.
3. En el panel, selecciona **Add New → Project**.
4. Importa un repositorio Git que contenga estos archivos, o usa la opción de despliegue disponible en tu cuenta.
5. Para un sitio estático sin framework, deja el framework como **Other** y la carpeta raíz como `./`.
6. Pulsa **Deploy**. Vercel asignará una dirección gratuita bajo `vercel.app`.

## Antes de publicarla
Revisar los dorsales y nombres de ambas plantillas. Añadir los calendarios/resultados oficiales y los enlaces de redes sociales. Los apartados sin datos aparecen señalados como “En actualización” para no mostrar información inventada.

La web usa Google Fonts desde CDN; si se desea evitar dependencias externas, se puede quitar la línea `@import` de `styles.css`.
