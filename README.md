# MYSTIGO · Tu próxima aventura comienza aquí

Aplicación web de turismo y planificación de viajes por el Perú. Identidad visual azul y amarillo y logo original de MYSTIGO proporcionado por el propietario.

Repositorio público: https://github.com/mytigomaps-png/mytigomaps

## Las 12 pantallas independientes

Cada pantalla tiene una ruta propia, navegación para avanzar y volver y presentación dentro del área principal de la app:

| N.º | Pantalla | Ruta |
| --- | --- | --- |
| 1 | Inicio | `#inicio` |
| 2 | Explorar destinos y filtros | `#explorar` |
| 3 | Detalles del destino y actividades | `#destino/:destino` |
| 4 | Crear itinerario | `#itinerarios` |
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
- Siete destinos: Cusco, Trujillo, Huaraz, Paracas, Máncora, Arequipa y Tarapoto.
- Búsqueda por nombre, región y experiencia; filtros por categoría, zona y presupuesto diario orientativo.
- Fichas de destinos, actividades seleccionables y ubicaciones en Google Maps.
- Perfiles locales con nombre, correo opcional y preferencias de viaje.
- Favoritos persistentes en el navegador.
- Planificador de uno a siete días, fechas, número de personas, presupuesto total y estilo de viaje.
- Itinerarios con recorridos por zonas, excursiones de jornada completa y horarios orientativos. El primer día reserva un recorrido suave por la ciudad.
- Edición del orden de actividades, eliminación de paradas, almacenamiento local, descarga de texto e impresión a PDF desde el navegador.
- Propuesta comercial del servicio de planificación por S/ 15. La solicitud queda pendiente de coordinación y pago y permite abrir un correo para que el usuario decida enviarlo.
- Preguntas frecuentes, calificación y opiniones locales con opción de compartir por correo.
- Exportación de datos y eliminación de la información local.
- Diseño adaptable para computadoras y celulares, navegación por teclado y reducción de animaciones.

## Alcance de esta versión

Es una aplicación estática compatible con GitHub Pages, sin instalación de dependencias. Los perfiles, preferencias, favoritos, eventos, opiniones, solicitudes y planes se almacenan únicamente en `localStorage` del dispositivo. No existe autenticación en servidor, base de datos compartida ni sincronización entre dispositivos. No solicita contraseñas y no publica los datos de los visitantes en GitHub.

La recomendación utiliza reglas y un catálogo de recorridos. No hay servicio externo de inteligencia artificial conectado.

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
