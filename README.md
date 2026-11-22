# MYSTIGO · Tu próxima aventura comienza aquí

Aplicación web de turismo y planificación de viajes por 30 países, con 36 destinos y los siete destinos originales del Perú. Identidad visual azul y amarillo y logo original de MYSTIGO proporcionado por el propietario.

Repositorio público: https://github.com/mytigomaps-png/mytigomaps

## Las 12 pantallas independientes

Cada pantalla tiene una ruta propia, navegación para avanzar y volver y presentación dentro del área principal de la app:

| N.º | Pantalla | Ruta |
| --- | --- | --- |
| 1 | Inicio | `#inicio` |
| 2 | Explorar destinos y filtros | `#explorar` |
| 3 | Detalles del destino y actividades | `#destino/:destino` |
| 4 | Mis viajes sorpresa: propuestas automáticas | `#itinerarios` |
| 5 | Ver y editar el itinerario | `#plan/:id` |
| 6 | Favoritos | `#favoritos` |
| 7 | Mi perfil | `#perfil` |
| 8 | Ayuda y opiniones | `#ayuda` |
| 9 | Crear o editar perfil | `#registro` |
| 10 | Preferencias de viaje | `#preferencias` |
| 11 | Resumen de solicitud | `#solicitud/:id` |
| 12 | Confirmación de solicitud | `#confirmacion/:id` |

Las pantallas 9–12 reemplazan las ventanas emergentes anteriores. Los diálogos de confirmación para borrar datos no se cuentan como pantallas. La confirmación de solicitud indica que fue guardada localmente y que la coordinación y el pago siguen pendientes.

Al pasar de un itinerario a una solicitud, se guarda el plan para poder recargar y volver a abrir el resumen y la confirmación. Los enlaces de confirmación requieren que la solicitud haya sido guardada; no confirman pagos, envíos ni reservas.

## Funciones

- Inicio con recomendaciones según preferencias locales.
- 30 países y 36 destinos con fotografías: México, Estados Unidos, República Dominicana, Colombia, Perú, Argentina, Brasil, Chile, Canadá, Costa Rica, Cuba, Panamá, Francia, España, Italia, Reino Unido, Alemania, Portugal, Grecia, Países Bajos, Suiza, Austria, Croacia, Polonia, Turquía, Tailandia, Japón, Emiratos Árabes Unidos, China y Egipto. Se conservan Cusco, Trujillo, Huaraz, Paracas, Máncora, Arequipa y Tarapoto.
- Catálogo de 30 países y 36 destinos para conocer e inspirarse, sin formularios de país o región.
- Fichas de destinos y actividades de consulta con ubicaciones en Google Maps.
- Perfiles locales con nombre, correo opcional y preferencias de viaje.
- Favoritos persistentes en el navegador.
- Viajes sorpresa con hasta tres propuestas completas según los gustos y presupuesto guardados una sola vez; duración de uno a siete días.
- Itinerarios con recorridos por zonas, excursiones de jornada completa y horarios orientativos. El primer día reserva un recorrido suave por la ciudad.
- Edición del orden de actividades, eliminación de paradas, almacenamiento local, descarga de texto e impresión a PDF desde el navegador.
- Propuesta comercial del servicio de planificación por S/ 15. La solicitud queda pendiente de coordinación y pago y permite abrir un correo para que el usuario decida enviarlo.
- Preguntas frecuentes, calificación y opiniones locales con opción de compartir por correo.
- Exportación de datos y eliminación de la información local.
- Diseño adaptable para computadoras y celulares, navegación por teclado y reducción de animaciones.

## Alcance de esta versión

Es una aplicación estática compatible con GitHub Pages, sin instalación de dependencias. Los perfiles, preferencias, favoritos, eventos, opiniones, solicitudes y planes se almacenan únicamente en `localStorage` del dispositivo. No existe autenticación en servidor, base de datos compartida ni sincronización entre dispositivos. No solicita contraseñas y no publica los datos de los visitantes en GitHub.

El recomendador local utiliza afinidad de contenido (similitud entre intereses y categorías), favoritos, interacciones, presupuesto, mes orientativo y experiencia deseada. No usa un servicio generativo externo ni envía perfiles a un proveedor de IA. Los meses sugeridos no son pronósticos meteorológicos.

No existe una pasarela de pagos ni reservas de hoteles, entradas, transporte o actividades. No se marcan pagos como realizados. El botón de contacto abre una aplicación de correo; el usuario debe revisar y enviar el mensaje. Guardar una opinión o solicitud local no la entrega automáticamente al administrador.

Para convertir los perfiles en cuentas reales, agregar un CRM centralizado o habilitar cobros, se requiere una integración de servidor y un proveedor de autenticación o pagos. Nunca deben publicarse claves privadas o credenciales en este repositorio.

## Presupuestos e itinerarios

Los importes diarios son estimaciones propias para comparar y planificar; no son cotizaciones ni tarifas verificadas de servicios. El cálculo distingue alojamiento (noches), alimentación, actividades y movilidad local y un margen del 10 %. No incluye pasajes interprovinciales, vuelos ni reservas especiales como Machu Picchu. Los S/ 15 de planificación se muestran por separado.

Los horarios son sugerencias. Cada visitante debe verificar entradas, disponibilidad, accesos, estado del mar, caminos y transporte con las autoridades y proveedores. La aplicación separa las excursiones largas y avisa cuando la duración no permite incluir todos los lugares elegidos.

## Publicación en GitHub Pages

En Settings → Pages, elegir **Deploy from a branch**, rama **main** y carpeta **/(root)**. El sitio usa rutas por hash para que los enlaces internos funcionen en GitHub Pages. No se necesita una herramienta de compilación.

## Estructura

- `index.html`: interfaz y estructura accesible.
- `style.css`: diseño adaptable e impresión.
- `app.js`: navegación, filtros, persistencia local y planificador.
- `destinations.js`: catálogo y recorridos.
- `logo.png`: imagen original proporcionada por MYSTIGO.
- Fotografías `.jpg`: recursos de los destinos.
- `.nojekyll`: publicación directa de archivos estáticos.

## Fuentes turísticas

Contenido general redactado y contrastado con PROMPERÚ / Perú Travel:

- Cusco: https://www.peru.travel/es/destinos/cusco
- Chan Chan y Trujillo: https://www.peru.travel/es/atractivos/chan-chan
- Áncash y Huaraz: https://www.peru.travel/es/destinos/ancash
- Paracas: https://www.peru.travel/es/atractivos/paracas-e-islas-ballestas
- Piura y Máncora: https://www.peru.travel/es/destinos/piura
- Arequipa: https://www.peru.travel/es/destinos/arequipa
- San Martín y Tarapoto: https://www.peru.travel/es/destinos/san-martin

## Créditos fotográficos

Las imágenes mantienen sus créditos y derechos de sus respectivos autores o proveedores; no se ofrece una licencia sobre ellas.

- Cusco / Machu Picchu: [Unsplash](https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1400&q=85).
- Trujillo: [HOLA](https://www.hola.com/viajes/20241121731359/que-hacer-ver-en-trujillo-peru/), imagen https://www.hola.com/horizon/landscape/6e7df1507005-j1f2x0.jpg
- Huaraz: [Huaraz Turismo](https://www.huarazturismo.com/huaraz-de-aventura-2-dias-1-noche.php), imagen https://www.huarazturismo.com/gal/huaraz-de-aventura-2-dias-1-noche2.jpg
- Paracas: [Assist Card](https://www.assistcard.com/ec/playas-de-peru), imagen https://ecommerceapi.assistcard.com/Api/ImagesHandler/GetImage?freeImageCode=xec-playasdeperu03
- Arequipa: [Diario El Pueblo](https://diarioelpueblo.com.pe/2024/12/13/los-distritos-de-arequipa/), imagen https://diarioelpueblo.com.pe/wp-content/uploads/2024/07/arequipa-1.jpeg
- Máncora: [Despegar](https://www.despegar.cl/actividades/mc3/actividades-en-mancora), imagen https://media.staticontent.com/media/pictures/76cd5c55-edde-499f-a4dd-7cffb633715d
- Tarapoto: [TPP Perú / Tarapoto Tours](https://www.tarapototours.com/paquetes/Paquete-Tarapoto-Economico-3d-2n-p559695528), imagen https://d2j6dbq0eux0bg.cloudfront.net/images/76631593/3232502208.jpg

## Privacidad

La aplicación no envía datos de perfil ni eventos de navegación a un CRM. Google Maps se abre únicamente al pulsar un enlace, y el envío por correo requiere intervención del visitante. Las tipografías se solicitan a Google Fonts; si no están disponibles se usan fuentes del sistema. Al borrar los datos del navegador se elimina la información local; se ofrece una exportación previa.


## Actualización internacional y experiencia personalizada

- Catálogo por países o destinos para consulta opcional. El viaje sorpresa no pide país, región ni destino.
- Apariencia automática según `prefers-color-scheme`, con reacción a cambios del sistema. Opciones manuales claro, oscuro y automático; la elección se conserva localmente. Se aplica antes del primer dibujo de la página.
- Preferencias con presupuesto del grupo en destino, días, viajeros, fecha, experiencia deseada.
- Botón **Sorpréndeme**: selecciona un destino dentro del presupuesto estimado de estadía y actividades y crea el itinerario sin elección manual del lugar. Prioriza afinidad, meses del catálogo y variedad. Si no encuentra un destino compatible, pide ajustar los parámetros en lugar de inventar una propuesta fuera del presupuesto.
- La experiencia deseada es elegida por la persona; no se infiere su salud ni su estado psicológico.
- Los planes nuevos se guardan al generarlos para poder recargarlos o consultar su solicitud.
- Campana con bandeja de notificaciones, indicadores de lectura, ideas del día, avisos de itinerario y recordatorios al abrir la app cerca de la fecha de viaje.
- Avisos del dispositivo opcionales mediante Notifications API y Service Worker, únicamente después de una acción del visitante y su permiso. Los navegadores pueden restringir estas funciones.
- Descarga de archivo `.ics` con un recordatorio un día antes del viaje. El visitante debe importar o guardar el archivo en su calendario.

### Alcance de los avisos

No existe servidor push ni ejecución programada con la web cerrada. Las notificaciones se generan al entrar, volver a la pestaña o utilizar Mystigo. El Service Worker muestra los avisos que la app genera y abre las rutas internas cuando se pulsa una notificación. No se afirma que haya cobros, ofertas en vivo, reservas, correos automáticos ni información de clima en tiempo real.

Las 12 pantallas independientes se conservan. El catálogo internacional, los viajes sorpresa y los ajustes se integran en ellas. La campana y el aviso de presupuesto insuficiente son diálogos adicionales de interfaz; no se cuentan como pantallas independientes.

### Archivos de la actualización

- `world.js`: países, destinos, recorridos y créditos de las fotografías internacionales.
- `enhancements.js`: recomendador, viaje sorpresa, catálogo internacional, apariencia, notificaciones y exportación de calendario.
- `world.css`: presentación internacional, modo oscuro y ajustes de accesibilidad y lectura.
- `sw.js`: soporte para avisos del dispositivo y navegación segura por sus notificaciones.
- `world-*.jpg` y `world-nl.png`: fotografías internacionales con licencia libre, descargadas de Wikimedia Commons. No se modificaron sus bytes después de la descarga.

### Presupuestos internacionales

Todos los presupuestos se expresan en soles peruanos (PEN). Son supuestos de planificación para estadía, alimentación y actividades en destino; no son conversiones de monedas ni cotizaciones actuales. Vuelos, pasajes hacia el destino, visados y reservas especiales no están incluidos. El importe del servicio de planificación (S/ 15) se conserva por separado.

### Fuentes técnicas

- MDN, preferencias de color: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- MDN, notificaciones: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
- MDN, avisos de Service Worker: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification

### Fotografías internacionales: atribución y licencias

Los nombres de autor, licencia, página del archivo y enlace de licencia también se conservan en `WORLD_IMAGE_CREDITS` dentro de `world.js`. Cada ficha internacional enlaza al crédito de su fotografía.

| Código | Archivo | Autor | Licencia | Fuente y licencia |
| --- | --- | --- | --- | --- |
| MX | `world-mx.jpg` | dronepicr | CC BY 2.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Cancun_Strand_Luftbild_(22143397586).jpg) · [Licencia](https://creativecommons.org/licenses/by/2.0) |
| US | `world-us.jpg` | Dllu | CC BY-SA 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_(cropped).jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/4.0) |
| DO | `world-do.jpg` | Ila Mae Thie | CC BY-SA 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Club_Med_(Punta_Cana).jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/4.0) |
| CO | `world-co.jpg` | Sgonzalezb | CC BY-SA 3.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Museo_Naval_del_Caribe.JPG) · [Licencia](https://creativecommons.org/licenses/by-sa/3.0) |
| AR | `world-ar.jpg` | Deensel | CC BY 2.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Puerto_Madero,_Buenos_Aires_(40689219792)_(cropped).jpg) · [Licencia](https://creativecommons.org/licenses/by/2.0) |
| BR | `world-br.jpg` | Rafael Rabello de Barros | CC BY-SA 3.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Cidade_Maravilhosa.jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/3.0) |
| CL | `world-cl.jpg` | Miguel hernandez | CC BY-SA 2.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Palacio_de_La_Moneda_-_miguelreflex.jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/2.0) |
| CA | `world-ca.jpg` | Quintin Soloviev | CC BY 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Skyline_of_Vancouver,_Canada.jpg) · [Licencia](https://creativecommons.org/licenses/by/4.0) |
| CR | `world-cr.jpg` | Rhododendrites | CC BY-SA 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Arenal_volcano_(70785p)_(cropped).jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/4.0) |
| CU | `world-cu.jpg` | RenaatPeeters | CC BY-SA 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:DJI_0197_crp_wiki.jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/4.0) |
| PA | `world-pa.jpg` | Dronepicr | CC BY 3.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Panama_Papers_(148830809).jpeg) · [Licencia](https://creativecommons.org/licenses/by/3.0) |
| FR | `world-fr.jpg` | Yann Caradec from Paris, France | CC BY-SA 2.0 | [Archivo](https://commons.wikimedia.org/wiki/File:La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_ao%C3%BBt_2014_(2).jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/2.0) |
| ES | `world-es.jpg` | Zarateman | CC0 | [Archivo](https://commons.wikimedia.org/wiki/File:Madrid_-_Sky_Bar_360%C2%BA_(Hotel_Riu_Plaza_Espa%C3%B1a),_vistas_19.jpg) · [Licencia](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| IT | `world-it.jpg` | FeaturedPics | CC BY-SA 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Colosseo_2020.jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/4.0) |
| GB | `world-gb.jpg` | Ilya Grigorik | CC BY-SA 3.0 | [Archivo](https://commons.wikimedia.org/wiki/File:London_Skyline_(125508655).jpeg) · [Licencia](https://creativecommons.org/licenses/by-sa/3.0) |
| DE | `world-de.jpg` | File:Museumsinsel Berlin Juli 2021 1 (cropped).jpg: Kasa Fue derivative work: Georgfotoart | CC BY-SA 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Museumsinsel_Berlin_Juli_2021_1_(cropped)_b.jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/4.0) |
| PT | `world-pt.jpg` | Deensel | CC BY 2.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Lisbon_(36831596786)_(cropped).jpg) · [Licencia](https://creativecommons.org/licenses/by/2.0) |
| GR | `world-gr.jpg` | Andrew Parlette | CC BY 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Athens_Acropolis_at_Daybreak.jpg) · [Licencia](https://creativecommons.org/licenses/by/4.0) |
| NL | `world-nl.png` | Andrés Barrios | CC BY-SA 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Imagen_de_los_canales_conc%C3%A9ntricos_en_%C3%81msterdam.png) · [Licencia](https://creativecommons.org/licenses/by-sa/4.0) |
| CH | `world-ch.jpg` | Simon Koopmann | CC BY-SA 2.5 | [Archivo](https://commons.wikimedia.org/wiki/File:Kapellbruecke.JPG) · [Licencia](https://creativecommons.org/licenses/by-sa/2.5) |
| AT | `world-at.jpg` | Superbass | CC BY-SA 3.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Schoenbrunn_philharmoniker_2012.jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/3.0) |
| HR | `world-hr.jpg` | Zysko serhii | CC BY-SA 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/4.0) |
| PL | `world-pl.jpg` | Andrzej Otrębski | CC BY-SA 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Krakow_Rynek_Glowny_panorama_2.jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/4.0) |
| TR | `world-tr.jpg` | Hunanuk | CC0 | [Archivo](https://commons.wikimedia.org/wiki/File:Historical_peninsula_and_modern_skyline_of_Istanbul.jpg) · [Licencia](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| TH | `world-th.jpg` | Ninara from Helsinki, Finland | CC BY 2.0 | [Archivo](https://commons.wikimedia.org/wiki/File:4Y1A1159_Bangkok_(33536795515).jpg) · [Licencia](https://creativecommons.org/licenses/by/2.0) |
| JP | `world-jp.jpg` | Morio | CC BY-SA 3.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Skyscrapers_of_Shinjuku_2009_January.jpg) · [Licencia](http://creativecommons.org/licenses/by-sa/3.0/) |
| AE | `world-ae.jpg` | Robert Bock | CC0 | [Archivo](https://commons.wikimedia.org/wiki/File:Dubai_skyline_unsplash.jpg) · [Licencia](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| CN | `world-cn.jpg` | N509FZ | CC BY 4.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Skyline_of_Beijing_CBD_with_B-5906_approaching_(20211016171955)_(1).jpg) · [Licencia](https://creativecommons.org/licenses/by/4.0) |
| EG | `world-eg.jpg` | Wael El Sisi | CC BY-SA 3.0 | [Archivo](https://commons.wikimedia.org/wiki/File:Cairo_From_Tower_(cropped).jpg) · [Licencia](https://creativecommons.org/licenses/by-sa/3.0) |

## Sonido de notificaciones

Tono original sintetizado en el dispositivo: dos notas suaves ascendentes (Mi5 y Sol♯5), con entrada gradual y desvanecimiento, de unos 0.7 segundos. No descarga audios ni utiliza servicios externos. `notification-sound.js` se carga antes de `enhancements.js`.

- Suena para avisos nuevos cuando la app está visible y el visitante ya interactuó con ella. No reproduce avisos históricos acumulados al abrir la página ni al consultar la campana. Un aviso nuevo de la sesión puede esperar hasta 60 segundos al primer toque para sonar, respetando el bloqueo de audio del navegador.
- La campana y Mi perfil incluyen «Sonido de notificaciones» y «Probar sonido». La preferencia se conserva en este navegador; probarlo no cambia la elección de silencio.
- Los avisos duplicados no suenan de nuevo. Varios avisos en menos de cuatro segundos producen un solo tono. Silenciarlo detiene el tono en curso.
- Los avisos del sistema se solicitan en silencio cuando la app está visible para evitar duplicar el tono. Con la pestaña oculta, el sistema decide su sonido si está habilitado; no se puede imponer este tono personalizado a una app cerrada.
- El navegador puede bloquear el audio hasta que el visitante toque la app, y el volumen o modo silencioso del dispositivo también puede impedir escucharlo.

Referencia técnica: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices

## Recorrido pedido por el cliente — noviembre de 2026

- Una sola sección (`#preferencias`) recoge gustos, actividades, presupuesto disponible del grupo, estilo, duración, viajeros, fecha preferida y experiencia deseada. No solicita ingresos ni datos financieros privados. Basta seleccionar al menos un gusto o actividad para personalizar. Los perfiles anteriores con intereses guardados se conservan.
- El inicio y Mis viajes eliminan la búsqueda y el formulario de planificación manual. Un botón prepara hasta tres viajes completos y distintos. No se pide elegir país, región, destino ni repetir datos del viaje.
- Las propuestas deben coincidir con al menos uno de los tipos de viaje guardados (o actividades si no hay tipos) y caber en el presupuesto de estadía y actividades. Si solo hay una o dos opciones válidas, se informa; no se inventan opciones o precios. Si no hay ninguna, se vuelve a la misma sección de preferencias.
- «Quiero viajar este fin de semana» prepara propuestas desde el próximo sábado, con un máximo de dos días y el resto de las preferencias guardadas. La fecha preferida se usa en la opción general.
- Cada propuesta incluye fotografía, motivos de afinidad, fecha, viajeros, estimación y recorrido ya construido. Abrirla guarda el plan; las propuestas también sobreviven a una recarga. Pedir otras ofrece variedad sin salir de los gustos y presupuesto.
- La campana incluye un aviso diario motivador que invita a viajar y abre Mis viajes. Los avisos nuevos utilizan el tono de Mystigo, con silencio opcional, límite de frecuencia y habilitación del audio mediante interacción del visitante.
- Las notificaciones se comprueban al entrar, volver a la pestaña y una vez por minuto mientras está visible; cada aviso diario se guarda una sola vez. No existe servidor de push para la web cerrada. Se mantiene el recordatorio de calendario.
- Se mantienen las 12 rutas, los 30 países, las fotografías, el modo automático de color y los planes antiguos. El catálogo es informativo y opcional, fuera del recorrido de generación automática.

## Reiniciar el formulario y volver a entrar

- El campo muestra «Correo electrónico», sin la palabra «opcional». Puede seguir dejándose vacío; no se agregó validación obligatoria ni se cambió el envío de datos.
- Al abrir o recargar la app sin preferencias guardadas, se vuelve a Inicio. Lo mismo ocurre al restaurar una página de la memoria de navegación. Los cambios que no se guardaron no se utilizan como preferencias.
- «Reiniciar», junto a «Volver» en Preferencias de viaje, elimina las preferencias guardadas y las propuestas pendientes, limpia las selecciones y repone el presupuesto, viajeros, duración y fecha iniciales. El cambio se guarda inmediatamente: volver, navegar o recargar ya no recupera el resumen anterior. Inicio, Mi perfil y Mis viajes piden registrar las preferencias otra vez.
- Se descartan los avisos de recomendaciones anteriores y los datos de selección y afinidad asociados. Se conservan el perfil, favoritos, itinerarios ya guardados, solicitudes, opiniones, apariencia y ajustes de sonido. Los viajes guardados pueden seguir abriéndose.
- Las nuevas propuestas solo se generan después de elegir al menos un gusto o actividad y pulsar «Guardar mis preferencias». Si el navegador bloquea el almacenamiento, se avisa expresamente de que el reinicio solo se aplicó a la sesión.

## Pruebas de regresión

Ejecuta `node test-client.cjs` con Node.js, sin instalar dependencias. Comprueba los eventos reales de reinicio y guardado, almacenamiento, regreso y recarga, las 12 rutas, conservación de viajes y otros datos, bloqueo de propuestas anteriores, validaciones de gustos, presupuesto y duración, 30 países con imágenes locales, migración y sonido con silencio y deduplicación. La revisión del navegador se realiza aparte sobre la app publicada.
