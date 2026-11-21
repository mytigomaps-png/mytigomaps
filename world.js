'use strict';
// International catalogue and credited photographs. Budgets are estimates in PEN.
const WORLD_COUNTRIES = [
  {
    "code": "MX",
    "name": "México",
    "continent": "América y el Caribe",
    "featured": "world-mx",
    "summary": "Caribe, playas y herencia maya.",
    "source": "https://www.visitmexico.com/"
  },
  {
    "code": "US",
    "name": "Estados Unidos",
    "continent": "América y el Caribe",
    "featured": "world-us",
    "summary": "Una ciudad de barrios, museos y paisajes urbanos.",
    "source": "https://www.nyctourism.com/"
  },
  {
    "code": "DO",
    "name": "República Dominicana",
    "continent": "América y el Caribe",
    "featured": "world-do",
    "summary": "Arena clara, mar y tiempo para descansar.",
    "source": "https://es.godominicanrepublic.com/destinos/punta-cana"
  },
  {
    "code": "CO",
    "name": "Colombia",
    "continent": "América y el Caribe",
    "featured": "world-co",
    "summary": "Murallas, colores y noches junto al Caribe.",
    "source": "https://colombia.travel/es/cartagena"
  },
  {
    "code": "PE",
    "name": "Perú",
    "continent": "América y el Caribe",
    "featured": "cusco",
    "summary": "Costa, Andes y Amazonía para descubrir a tu manera.",
    "source": "https://www.peru.travel/es"
  },
  {
    "code": "AR",
    "name": "Argentina",
    "continent": "América y el Caribe",
    "featured": "world-ar",
    "summary": "Cafés, barrios y cultura para caminar sin prisa.",
    "source": "https://www.argentina.travel/"
  },
  {
    "code": "BR",
    "name": "Brasil",
    "continent": "América y el Caribe",
    "featured": "world-br",
    "summary": "Montañas, barrios y playas en una misma ciudad.",
    "source": "https://www.visitbrasil.com/es/location/rio-de-janeiro-es/"
  },
  {
    "code": "CL",
    "name": "Chile",
    "continent": "América y el Caribe",
    "featured": "world-cl",
    "summary": "Barrios, parques y paisajes junto a los Andes.",
    "source": "https://chile.travel/"
  },
  {
    "code": "CA",
    "name": "Canadá",
    "continent": "América y el Caribe",
    "featured": "world-ca",
    "summary": "Océano, parques y montañas para cambiar de aire.",
    "source": "https://www.destinationvancouver.com/"
  },
  {
    "code": "CR",
    "name": "Costa Rica",
    "continent": "América y el Caribe",
    "featured": "world-cr",
    "summary": "Volcanes, selva y caminos que invitan a desconectar.",
    "source": "https://www.visitcostarica.com/"
  },
  {
    "code": "CU",
    "name": "Cuba",
    "continent": "América y el Caribe",
    "featured": "world-cu",
    "summary": "Plazas, música y arquitectura frente al mar.",
    "source": "https://www.cuba.travel/destinos/la-habana"
  },
  {
    "code": "PA",
    "name": "Panamá",
    "continent": "América y el Caribe",
    "featured": "world-pa",
    "summary": "Historia junto al Pacífico y una ciudad que mira al futuro.",
    "source": "https://www.tourismpanama.com/"
  },
  {
    "code": "FR",
    "name": "Francia",
    "continent": "Europa",
    "featured": "world-fr",
    "summary": "Arte, barrios y jardines para disfrutar a tu ritmo.",
    "source": "https://www.france.fr/es/destino/paris/"
  },
  {
    "code": "ES",
    "name": "España",
    "continent": "Europa",
    "featured": "world-es",
    "summary": "Plazas, museos y sabores que se comparten.",
    "source": "https://www.esmadrid.com/"
  },
  {
    "code": "IT",
    "name": "Italia",
    "continent": "Europa",
    "featured": "world-it",
    "summary": "Historia en cada esquina y mesas que invitan a quedarse.",
    "source": "https://www.turismoroma.it/"
  },
  {
    "code": "GB",
    "name": "Reino Unido",
    "continent": "Europa",
    "featured": "world-gb",
    "summary": "Museos, mercados y paseos a orillas del Támesis.",
    "source": "https://www.visitlondon.com/"
  },
  {
    "code": "DE",
    "name": "Alemania",
    "continent": "Europa",
    "featured": "world-de",
    "summary": "Historia, arte y barrios con una energía propia.",
    "source": "https://www.visitberlin.de/es"
  },
  {
    "code": "PT",
    "name": "Portugal",
    "continent": "Europa",
    "featured": "world-pt",
    "summary": "Miradores, barrios y sabores junto al Tajo.",
    "source": "https://www.visitlisboa.com/es"
  },
  {
    "code": "GR",
    "name": "Grecia",
    "continent": "Europa",
    "featured": "world-gr",
    "summary": "Historia clásica y barrios para conocer caminando.",
    "source": "https://www.thisisathens.org/"
  },
  {
    "code": "NL",
    "name": "Países Bajos",
    "continent": "Europa",
    "featured": "world-nl",
    "summary": "Canales, museos y rincones que se descubren sin prisa.",
    "source": "https://www.iamsterdam.com/"
  },
  {
    "code": "CH",
    "name": "Suiza",
    "continent": "Europa",
    "featured": "world-ch",
    "summary": "Un lago, puentes y panoramas junto a los Alpes.",
    "source": "https://www.luzern.com/"
  },
  {
    "code": "AT",
    "name": "Austria",
    "continent": "Europa",
    "featured": "world-at",
    "summary": "Palacios, cafés y música en una ciudad para caminar.",
    "source": "https://www.wien.info/es"
  },
  {
    "code": "HR",
    "name": "Croacia",
    "continent": "Europa",
    "featured": "world-hr",
    "summary": "Una ciudad amurallada frente al Adriático.",
    "source": "https://tzdubrovnik.hr/"
  },
  {
    "code": "PL",
    "name": "Polonia",
    "continent": "Europa",
    "featured": "world-pl",
    "summary": "Plazas medievales, barrios históricos y cultura local.",
    "source": "https://krakow.travel/"
  },
  {
    "code": "TR",
    "name": "Turquía",
    "continent": "Asia y Medio Oriente",
    "featured": "world-tr",
    "summary": "Dos orillas, mercados y siglos de historia compartida.",
    "source": "https://istanbul.goturkiye.com/"
  },
  {
    "code": "TH",
    "name": "Tailandia",
    "continent": "Asia y Medio Oriente",
    "featured": "world-th",
    "summary": "Templos, sabores y mercados a orillas del Chao Phraya.",
    "source": "https://www.tourismthailand.org/"
  },
  {
    "code": "JP",
    "name": "Japón",
    "continent": "Asia y Medio Oriente",
    "featured": "world-jp",
    "summary": "Tradición y cultura contemporánea en una misma ciudad.",
    "source": "https://www.japan.travel/es/destinations/kanto/tokyo/"
  },
  {
    "code": "AE",
    "name": "Emiratos Árabes Unidos",
    "continent": "Asia y Medio Oriente",
    "featured": "world-ae",
    "summary": "Arquitectura contemporánea y barrios junto al arroyo.",
    "source": "https://www.visitdubai.com/es"
  },
  {
    "code": "CN",
    "name": "China",
    "continent": "Asia y Medio Oriente",
    "featured": "world-cn",
    "summary": "Palacios, parques y barrios de historia milenaria.",
    "source": "https://english.visitbeijing.com.cn/"
  },
  {
    "code": "EG",
    "name": "Egipto",
    "continent": "África",
    "featured": "world-eg",
    "summary": "Patrimonio milenario y una ciudad junto al Nilo.",
    "source": "https://www.experienceegypt.eg/es/city/1/cairo-e-giza"
  }
];
const WORLD_IMAGE_CREDITS = {
  "MX": {
    "image": "world-mx.jpg",
    "photo": "Cancún",
    "source": "https://commons.wikimedia.org/wiki/File:Cancun_Strand_Luftbild_(22143397586).jpg",
    "author": "dronepicr",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "bytes": 193269
  },
  "US": {
    "image": "world-us.jpg",
    "photo": "New York City",
    "source": "https://commons.wikimedia.org/wiki/File:View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_(cropped).jpg",
    "author": "Dllu",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "bytes": 267470
  },
  "DO": {
    "image": "world-do.jpg",
    "photo": "Punta Cana",
    "source": "https://commons.wikimedia.org/wiki/File:Club_Med_(Punta_Cana).jpg",
    "author": "Ila Mae Thie",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "bytes": 490831
  },
  "CO": {
    "image": "world-co.jpg",
    "photo": "Cartagena, Colombia",
    "source": "https://commons.wikimedia.org/wiki/File:Museo_Naval_del_Caribe.JPG",
    "author": "Sgonzalezb",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "bytes": 272206
  },
  "AR": {
    "image": "world-ar.jpg",
    "photo": "Buenos Aires",
    "source": "https://commons.wikimedia.org/wiki/File:Puerto_Madero,_Buenos_Aires_(40689219792)_(cropped).jpg",
    "author": "Deensel",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "bytes": 238851
  },
  "BR": {
    "image": "world-br.jpg",
    "photo": "Rio de Janeiro",
    "source": "https://commons.wikimedia.org/wiki/File:Cidade_Maravilhosa.jpg",
    "author": "Rafael Rabello de Barros",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "bytes": 342585
  },
  "CL": {
    "image": "world-cl.jpg",
    "photo": "Santiago",
    "source": "https://commons.wikimedia.org/wiki/File:Palacio_de_La_Moneda_-_miguelreflex.jpg",
    "author": "Miguel hernandez",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "bytes": 346017
  },
  "CA": {
    "image": "world-ca.jpg",
    "photo": "Vancouver",
    "source": "https://commons.wikimedia.org/wiki/File:Skyline_of_Vancouver,_Canada.jpg",
    "author": "Quintin Soloviev",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "bytes": 381871
  },
  "CR": {
    "image": "world-cr.jpg",
    "photo": "Arenal Volcano",
    "source": "https://commons.wikimedia.org/wiki/File:Arenal_volcano_(70785p)_(cropped).jpg",
    "author": "Rhododendrites",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "bytes": 280493
  },
  "CU": {
    "image": "world-cu.jpg",
    "photo": "Havana",
    "source": "https://commons.wikimedia.org/wiki/File:DJI_0197_crp_wiki.jpg",
    "author": "RenaatPeeters",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "bytes": 148009
  },
  "PA": {
    "image": "world-pa.jpg",
    "photo": "Panama City",
    "source": "https://commons.wikimedia.org/wiki/File:Panama_Papers_(148830809).jpeg",
    "author": "Dronepicr",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "bytes": 336977
  },
  "FR": {
    "image": "world-fr.jpg",
    "photo": "Paris",
    "source": "https://commons.wikimedia.org/wiki/File:La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_ao%C3%BBt_2014_(2).jpg",
    "author": "Yann Caradec from Paris, France",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "bytes": 334704
  },
  "ES": {
    "image": "world-es.jpg",
    "photo": "Madrid",
    "source": "https://commons.wikimedia.org/wiki/File:Madrid_-_Sky_Bar_360%C2%BA_(Hotel_Riu_Plaza_Espa%C3%B1a),_vistas_19.jpg",
    "author": "Zarateman",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "bytes": 369366
  },
  "IT": {
    "image": "world-it.jpg",
    "photo": "Rome",
    "source": "https://commons.wikimedia.org/wiki/File:Colosseo_2020.jpg",
    "author": "FeaturedPics",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "bytes": 334899
  },
  "GB": {
    "image": "world-gb.jpg",
    "photo": "London",
    "source": "https://commons.wikimedia.org/wiki/File:London_Skyline_(125508655).jpeg",
    "author": "Ilya Grigorik",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "bytes": 294633
  },
  "DE": {
    "image": "world-de.jpg",
    "photo": "Berlin",
    "source": "https://commons.wikimedia.org/wiki/File:Museumsinsel_Berlin_Juli_2021_1_(cropped)_b.jpg",
    "author": "File:Museumsinsel Berlin Juli 2021 1 (cropped).jpg: Kasa Fue\nderivative work: Georgfotoart",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "bytes": 439191
  },
  "PT": {
    "image": "world-pt.jpg",
    "photo": "Lisbon",
    "source": "https://commons.wikimedia.org/wiki/File:Lisbon_(36831596786)_(cropped).jpg",
    "author": "Deensel",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "bytes": 302758
  },
  "GR": {
    "image": "world-gr.jpg",
    "photo": "Athens",
    "source": "https://commons.wikimedia.org/wiki/File:Athens_Acropolis_at_Daybreak.jpg",
    "author": "Andrew Parlette",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "bytes": 290886
  },
  "NL": {
    "image": "world-nl.png",
    "photo": "Amsterdam",
    "source": "https://commons.wikimedia.org/wiki/File:Imagen_de_los_canales_conc%C3%A9ntricos_en_%C3%81msterdam.png",
    "author": "Andrés Barrios",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "bytes": 2566596
  },
  "CH": {
    "image": "world-ch.jpg",
    "photo": "Kapellbrücke",
    "source": "https://commons.wikimedia.org/wiki/File:Kapellbruecke.JPG",
    "author": "Simon Koopmann",
    "license": "CC BY-SA 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5",
    "bytes": 351442
  },
  "AT": {
    "image": "world-at.jpg",
    "photo": "Vienna",
    "source": "https://commons.wikimedia.org/wiki/File:Schoenbrunn_philharmoniker_2012.jpg",
    "author": "Superbass",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "bytes": 270569
  },
  "HR": {
    "image": "world-hr.jpg",
    "photo": "Dubrovnik",
    "source": "https://commons.wikimedia.org/wiki/File:The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg",
    "author": "Zysko serhii",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "bytes": 393260
  },
  "PL": {
    "image": "world-pl.jpg",
    "photo": "Kraków",
    "source": "https://commons.wikimedia.org/wiki/File:Krakow_Rynek_Glowny_panorama_2.jpg",
    "author": "Andrzej Otrębski",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "bytes": 208019
  },
  "TR": {
    "image": "world-tr.jpg",
    "photo": "Istanbul",
    "source": "https://commons.wikimedia.org/wiki/File:Historical_peninsula_and_modern_skyline_of_Istanbul.jpg",
    "author": "Hunanuk",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "bytes": 288269
  },
  "TH": {
    "image": "world-th.jpg",
    "photo": "Bangkok",
    "source": "https://commons.wikimedia.org/wiki/File:4Y1A1159_Bangkok_(33536795515).jpg",
    "author": "Ninara from Helsinki, Finland",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "bytes": 361927
  },
  "JP": {
    "image": "world-jp.jpg",
    "photo": "Tokyo",
    "source": "https://commons.wikimedia.org/wiki/File:Skyscrapers_of_Shinjuku_2009_January.jpg",
    "author": "Morio",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "bytes": 274449
  },
  "AE": {
    "image": "world-ae.jpg",
    "photo": "Dubái",
    "source": "https://commons.wikimedia.org/wiki/File:Dubai_skyline_unsplash.jpg",
    "author": "Robert Bock",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "bytes": 156762
  },
  "CN": {
    "image": "world-cn.jpg",
    "photo": "Beijing",
    "source": "https://commons.wikimedia.org/wiki/File:Skyline_of_Beijing_CBD_with_B-5906_approaching_(20211016171955)_(1).jpg",
    "author": "N509FZ",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "bytes": 424345
  },
  "EG": {
    "image": "world-eg.jpg",
    "photo": "Cairo",
    "source": "https://commons.wikimedia.org/wiki/File:Cairo_From_Tower_(cropped).jpg",
    "author": "Wael El Sisi",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "bytes": 362470
  }
};
const PERU_TRAVEL_MONTHS = {"cusco": [5, 6, 7, 8, 9], "trujillo": [11, 12, 1, 2, 3, 4], "huaraz": [5, 6, 7, 8, 9], "paracas": [11, 12, 1, 2, 3, 4], "mancora": [12, 1, 2, 3, 4], "arequipa": [4, 5, 6, 7, 8, 9, 10, 11], "tarapoto": [5, 6, 7, 8, 9, 10]};
MYSTIGO_DESTINATIONS.forEach(d=>Object.assign(d,{country:'Perú',countryCode:'PE',continent:'América y el Caribe',months:PERU_TRAVEL_MONTHS[d.id]||[]}));
MYSTIGO_DESTINATIONS.push(...[
  {
    "id": "world-mx",
    "name": "Cancún",
    "region": "Quintana Roo",
    "country": "México",
    "countryCode": "MX",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 230,
    "days": "3–5 días",
    "image": "world-mx.jpg",
    "photo": "Cancún",
    "photoCredit": {
      "image": "world-mx.jpg",
      "photo": "Cancún",
      "source": "https://commons.wikimedia.org/wiki/File:Cancun_Strand_Luftbild_(22143397586).jpg",
      "author": "dronepicr",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "bytes": 193269
    },
    "categories": [
      "Playa",
      "Cultura",
      "Aventura"
    ],
    "tag": "Caribe, playas y herencia maya.",
    "description": "Caribe, playas y herencia maya.",
    "about": "Caribe, playas y herencia maya. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      12,
      1,
      2,
      3,
      4
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.visitmexico.com/",
    "sourceLabel": "Turismo oficial · México",
    "blocks": [
      {
        "title": "Un primer encuentro con el Caribe",
        "tags": [
          "Playa",
          "Cultura",
          "Aventura"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Playa Delfines",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Cancún",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Mirador de Playa Delfines",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Isla Mujeres, un día completo",
        "tags": [
          "Playa",
          "Cultura",
          "Aventura"
        ],
        "full": true,
        "items": [
          [
            "09:00",
            "Traslado y embarque hacia Isla Mujeres",
            "Coordina la movilidad y confirma el horario real del recorrido."
          ],
          [
            "13:00",
            "Isla Mujeres",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Regreso a Cancún",
            "Coordina la movilidad y confirma el horario real del recorrido."
          ]
        ]
      },
      {
        "title": "Cancún entre historia y vida local",
        "tags": [
          "Playa",
          "Cultura",
          "Aventura"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Museo Maya de Cancún",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el centro de Cancún",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Parque de las Palapas",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-us",
    "name": "Nueva York",
    "region": "Nueva York",
    "country": "Estados Unidos",
    "countryCode": "US",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 500,
    "days": "3–5 días",
    "image": "world-us.jpg",
    "photo": "New York City",
    "photoCredit": {
      "image": "world-us.jpg",
      "photo": "New York City",
      "source": "https://commons.wikimedia.org/wiki/File:View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_(cropped).jpg",
      "author": "Dllu",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "bytes": 267470
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Una ciudad de barrios, museos y paisajes urbanos.",
    "description": "Una ciudad de barrios, museos y paisajes urbanos.",
    "about": "Una ciudad de barrios, museos y paisajes urbanos. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.nyctourism.com/",
    "sourceLabel": "Turismo oficial · Estados Unidos",
    "blocks": [
      {
        "title": "Manhattan, una primera mirada",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Bryant Park",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Grand Central Terminal",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Times Square",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Un día entre parques y museos",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": true,
        "items": [
          [
            "09:00",
            "Central Park",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Manhattan",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Museo Metropolitano de Arte",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Dos orillas de una ciudad",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Battery Park",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Puente de Brooklyn",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Brooklyn Bridge Park",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-do",
    "name": "Punta Cana",
    "region": "La Altagracia",
    "country": "República Dominicana",
    "countryCode": "DO",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 290,
    "days": "3–5 días",
    "image": "world-do.jpg",
    "photo": "Punta Cana",
    "photoCredit": {
      "image": "world-do.jpg",
      "photo": "Punta Cana",
      "source": "https://commons.wikimedia.org/wiki/File:Club_Med_(Punta_Cana).jpg",
      "author": "Ila Mae Thie",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "bytes": 490831
    },
    "categories": [
      "Playa",
      "Descanso",
      "Naturaleza"
    ],
    "tag": "Arena clara, mar y tiempo para descansar.",
    "description": "Arena clara, mar y tiempo para descansar.",
    "about": "Arena clara, mar y tiempo para descansar. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      12,
      1,
      2,
      3,
      4
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://es.godominicanrepublic.com/destinos/punta-cana",
    "sourceLabel": "Turismo oficial · República Dominicana",
    "blocks": [
      {
        "title": "Una llegada frente al mar",
        "tags": [
          "Playa",
          "Descanso",
          "Naturaleza"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Playa Bávaro",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Bávaro",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por El Cortecito",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Naturaleza en Punta Cana",
        "tags": [
          "Playa",
          "Descanso",
          "Naturaleza"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Reserva Ecológica Ojos Indígenas",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo y descanso",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por el entorno de Punta Cana",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Otro día a tu ritmo",
        "tags": [
          "Playa",
          "Descanso",
          "Naturaleza"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Playa Macao",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en la costa",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Regreso y descanso en Punta Cana",
            "Coordina la movilidad y confirma el horario real del recorrido."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-co",
    "name": "Cartagena",
    "region": "Bolívar",
    "country": "Colombia",
    "countryCode": "CO",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 175,
    "days": "3–5 días",
    "image": "world-co.jpg",
    "photo": "Cartagena, Colombia",
    "photoCredit": {
      "image": "world-co.jpg",
      "photo": "Cartagena, Colombia",
      "source": "https://commons.wikimedia.org/wiki/File:Museo_Naval_del_Caribe.JPG",
      "author": "Sgonzalezb",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "bytes": 272206
    },
    "categories": [
      "Cultura",
      "Playa",
      "Gastronomía"
    ],
    "tag": "Murallas, colores y noches junto al Caribe.",
    "description": "Murallas, colores y noches junto al Caribe.",
    "about": "Murallas, colores y noches junto al Caribe. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      12,
      1,
      2,
      3,
      4
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://colombia.travel/es/cartagena",
    "sourceLabel": "Turismo oficial · Colombia",
    "blocks": [
      {
        "title": "Entre murallas y plazas",
        "tags": [
          "Cultura",
          "Playa",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Centro histórico de Cartagena",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en la ciudad amurallada",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Murallas de Cartagena",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Historia y color",
        "tags": [
          "Cultura",
          "Playa",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Castillo de San Felipe de Barajas",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Cartagena",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Barrio de Getsemaní",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una pausa frente al Caribe",
        "tags": [
          "Cultura",
          "Playa",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Playa de Bocagrande",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo y descanso",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Bahía de Cartagena",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-ar",
    "name": "Buenos Aires",
    "region": "Buenos Aires",
    "country": "Argentina",
    "countryCode": "AR",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 200,
    "days": "3–5 días",
    "image": "world-ar.jpg",
    "photo": "Buenos Aires",
    "photoCredit": {
      "image": "world-ar.jpg",
      "photo": "Buenos Aires",
      "source": "https://commons.wikimedia.org/wiki/File:Puerto_Madero,_Buenos_Aires_(40689219792)_(cropped).jpg",
      "author": "Deensel",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "bytes": 238851
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Cafés, barrios y cultura para caminar sin prisa.",
    "description": "Cafés, barrios y cultura para caminar sin prisa.",
    "about": "Cafés, barrios y cultura para caminar sin prisa. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      3,
      4,
      5,
      9,
      10,
      11
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.argentina.travel/",
    "sourceLabel": "Turismo oficial · Argentina",
    "blocks": [
      {
        "title": "El centro y sus historias",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Plaza de Mayo",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el centro de Buenos Aires",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "San Telmo",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una ciudad que respira verde",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Bosques de Palermo",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Palermo",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Palermo Soho",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Arte, cafés y arquitectura",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Recoleta",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Recoleta",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Librería El Ateneo Grand Splendid",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-br",
    "name": "Río de Janeiro",
    "region": "Río de Janeiro",
    "country": "Brasil",
    "countryCode": "BR",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 225,
    "days": "3–5 días",
    "image": "world-br.jpg",
    "photo": "Rio de Janeiro",
    "photoCredit": {
      "image": "world-br.jpg",
      "photo": "Rio de Janeiro",
      "source": "https://commons.wikimedia.org/wiki/File:Cidade_Maravilhosa.jpg",
      "author": "Rafael Rabello de Barros",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "bytes": 342585
    },
    "categories": [
      "Playa",
      "Naturaleza",
      "Cultura"
    ],
    "tag": "Montañas, barrios y playas en una misma ciudad.",
    "description": "Montañas, barrios y playas en una misma ciudad.",
    "about": "Montañas, barrios y playas en una misma ciudad. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      6,
      8,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.visitbrasil.com/es/location/rio-de-janeiro-es/",
    "sourceLabel": "Turismo oficial · Brasil",
    "blocks": [
      {
        "title": "Una llegada junto al Atlántico",
        "tags": [
          "Playa",
          "Naturaleza",
          "Cultura"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Playa de Copacabana",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Copacabana",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Playa de Ipanema",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "La ciudad desde lo alto",
        "tags": [
          "Playa",
          "Naturaleza",
          "Cultura"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Corcovado y Cristo Redentor",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo y descanso",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Parque Lage",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Historia cerca de la bahía",
        "tags": [
          "Playa",
          "Naturaleza",
          "Cultura"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Museo del Mañana",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el centro de Río de Janeiro",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Boulevard Olímpico",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-cl",
    "name": "Santiago",
    "region": "Región Metropolitana",
    "country": "Chile",
    "countryCode": "CL",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 240,
    "days": "3–5 días",
    "image": "world-cl.jpg",
    "photo": "Santiago",
    "photoCredit": {
      "image": "world-cl.jpg",
      "photo": "Santiago",
      "source": "https://commons.wikimedia.org/wiki/File:Palacio_de_La_Moneda_-_miguelreflex.jpg",
      "author": "Miguel hernandez",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "bytes": 346017
    },
    "categories": [
      "Cultura",
      "Naturaleza",
      "Gastronomía"
    ],
    "tag": "Barrios, parques y paisajes junto a los Andes.",
    "description": "Barrios, parques y paisajes junto a los Andes.",
    "about": "Barrios, parques y paisajes junto a los Andes. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      3,
      4,
      5,
      9,
      10,
      11
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://chile.travel/",
    "sourceLabel": "Turismo oficial · Chile",
    "blocks": [
      {
        "title": "El corazón de Santiago",
        "tags": [
          "Cultura",
          "Naturaleza",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Plaza de Armas de Santiago",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Santiago",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Barrio Lastarria",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Parques y vistas de la ciudad",
        "tags": [
          "Cultura",
          "Naturaleza",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Cerro San Cristóbal",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Bellavista",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Barrio Bellavista",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Historia y cultura local",
        "tags": [
          "Cultura",
          "Naturaleza",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Palacio de La Moneda, exterior",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Centro Cultural La Moneda",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Parque Forestal",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-ca",
    "name": "Vancouver",
    "region": "Columbia Británica",
    "country": "Canadá",
    "countryCode": "CA",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 420,
    "days": "3–5 días",
    "image": "world-ca.jpg",
    "photo": "Vancouver",
    "photoCredit": {
      "image": "world-ca.jpg",
      "photo": "Vancouver",
      "source": "https://commons.wikimedia.org/wiki/File:Skyline_of_Vancouver,_Canada.jpg",
      "author": "Quintin Soloviev",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
      "bytes": 381871
    },
    "categories": [
      "Naturaleza",
      "Cultura",
      "Fotografía"
    ],
    "tag": "Océano, parques y montañas para cambiar de aire.",
    "description": "Océano, parques y montañas para cambiar de aire.",
    "about": "Océano, parques y montañas para cambiar de aire. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.destinationvancouver.com/",
    "sourceLabel": "Turismo oficial · Canadá",
    "blocks": [
      {
        "title": "Una ciudad frente al agua",
        "tags": [
          "Naturaleza",
          "Cultura",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Canada Place",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el centro de Vancouver",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Gastown",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Verde a cada paso",
        "tags": [
          "Naturaleza",
          "Cultura",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Stanley Park",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo y descanso",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "English Bay",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Arte y vida local",
        "tags": [
          "Naturaleza",
          "Cultura",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Granville Island",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Mercado público de Granville Island",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Paseo junto a False Creek",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-cr",
    "name": "La Fortuna",
    "region": "Alajuela",
    "country": "Costa Rica",
    "countryCode": "CR",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 235,
    "days": "3–5 días",
    "image": "world-cr.jpg",
    "photo": "Arenal Volcano",
    "photoCredit": {
      "image": "world-cr.jpg",
      "photo": "Arenal Volcano",
      "source": "https://commons.wikimedia.org/wiki/File:Arenal_volcano_(70785p)_(cropped).jpg",
      "author": "Rhododendrites",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "bytes": 280493
    },
    "categories": [
      "Naturaleza",
      "Aventura",
      "Descanso"
    ],
    "tag": "Volcanes, selva y caminos que invitan a desconectar.",
    "description": "Volcanes, selva y caminos que invitan a desconectar.",
    "about": "Volcanes, selva y caminos que invitan a desconectar. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      12,
      1,
      2,
      3,
      4
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.visitcostarica.com/",
    "sourceLabel": "Turismo oficial · Costa Rica",
    "blocks": [
      {
        "title": "Un primer encuentro con La Fortuna",
        "tags": [
          "Naturaleza",
          "Aventura",
          "Descanso"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Centro de La Fortuna",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en La Fortuna",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por La Fortuna",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Un día en el entorno del Arenal",
        "tags": [
          "Naturaleza",
          "Aventura",
          "Descanso"
        ],
        "full": true,
        "items": [
          [
            "09:00",
            "Senderos del entorno del volcán Arenal",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en ruta",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Regreso a La Fortuna",
            "Coordina la movilidad y confirma el horario real del recorrido."
          ]
        ]
      },
      {
        "title": "Agua y bosque",
        "tags": [
          "Naturaleza",
          "Aventura",
          "Descanso"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Catarata La Fortuna",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo y descanso",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Experiencia termal en La Fortuna",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-cu",
    "name": "La Habana",
    "region": "La Habana",
    "country": "Cuba",
    "countryCode": "CU",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 200,
    "days": "3–5 días",
    "image": "world-cu.jpg",
    "photo": "Havana",
    "photoCredit": {
      "image": "world-cu.jpg",
      "photo": "Havana",
      "source": "https://commons.wikimedia.org/wiki/File:DJI_0197_crp_wiki.jpg",
      "author": "RenaatPeeters",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "bytes": 148009
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Plazas, música y arquitectura frente al mar.",
    "description": "Plazas, música y arquitectura frente al mar.",
    "about": "Plazas, música y arquitectura frente al mar. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      11,
      12,
      1,
      2,
      3,
      4
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.cuba.travel/destinos/la-habana",
    "sourceLabel": "Turismo oficial · Cuba",
    "blocks": [
      {
        "title": "La Habana de sus plazas",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Plaza Vieja de La Habana",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en La Habana Vieja",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Plaza de la Catedral",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Paseos con historia",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Capitolio de La Habana",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Paseo del Prado",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Malecón de La Habana",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Otra mirada a la ciudad",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Barrio del Vedado",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el Vedado",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Plaza de la Revolución",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-pa",
    "name": "Ciudad de Panamá",
    "region": "Panamá",
    "country": "Panamá",
    "countryCode": "PA",
    "continent": "América y el Caribe",
    "zone": "América y el Caribe",
    "daily": 245,
    "days": "3–5 días",
    "image": "world-pa.jpg",
    "photo": "Panama City",
    "photoCredit": {
      "image": "world-pa.jpg",
      "photo": "Panama City",
      "source": "https://commons.wikimedia.org/wiki/File:Panama_Papers_(148830809).jpeg",
      "author": "Dronepicr",
      "license": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
      "bytes": 336977
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Naturaleza"
    ],
    "tag": "Historia junto al Pacífico y una ciudad que mira al futuro.",
    "description": "Historia junto al Pacífico y una ciudad que mira al futuro.",
    "about": "Historia junto al Pacífico y una ciudad que mira al futuro. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      12,
      1,
      2,
      3,
      4
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.tourismpanama.com/",
    "sourceLabel": "Turismo oficial · Panamá",
    "blocks": [
      {
        "title": "La ciudad y sus contrastes",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Naturaleza"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Casco Antiguo de Panamá",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el Casco Antiguo",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Cinta Costera",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una ruta hacia el canal",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Naturaleza"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Centro de Visitantes de Miraflores",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Ciudad de Panamá",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Cerro Ancón",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una tarde frente al Pacífico",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Naturaleza"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Calzada de Amador",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Biomuseo",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Paseo por Amador",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-fr",
    "name": "París",
    "region": "Isla de Francia",
    "country": "Francia",
    "countryCode": "FR",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 400,
    "days": "3–5 días",
    "image": "world-fr.jpg",
    "photo": "Paris",
    "photoCredit": {
      "image": "world-fr.jpg",
      "photo": "Paris",
      "source": "https://commons.wikimedia.org/wiki/File:La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_ao%C3%BBt_2014_(2).jpg",
      "author": "Yann Caradec from Paris, France",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "bytes": 334704
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Arte, barrios y jardines para disfrutar a tu ritmo.",
    "description": "Arte, barrios y jardines para disfrutar a tu ritmo.",
    "about": "Arte, barrios y jardines para disfrutar a tu ritmo. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.france.fr/es/destino/paris/",
    "sourceLabel": "Turismo oficial · Francia",
    "blocks": [
      {
        "title": "París junto al Sena",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Campo de Marte y Torre Eiffel",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en París",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por el Sena",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Un día entre arte y jardines",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": true,
        "items": [
          [
            "09:00",
            "Museo del Louvre",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Jardín de las Tullerías",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Palais Royal",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una ciudad de barrios",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Montmartre",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Montmartre",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Basílica del Sagrado Corazón",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-es",
    "name": "Madrid",
    "region": "Comunidad de Madrid",
    "country": "España",
    "countryCode": "ES",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 320,
    "days": "3–5 días",
    "image": "world-es.jpg",
    "photo": "Madrid",
    "photoCredit": {
      "image": "world-es.jpg",
      "photo": "Madrid",
      "source": "https://commons.wikimedia.org/wiki/File:Madrid_-_Sky_Bar_360%C2%BA_(Hotel_Riu_Plaza_Espa%C3%B1a),_vistas_19.jpg",
      "author": "Zarateman",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "bytes": 369366
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Plazas, museos y sabores que se comparten.",
    "description": "Plazas, museos y sabores que se comparten.",
    "about": "Plazas, museos y sabores que se comparten. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      3,
      4,
      5,
      6,
      9,
      10,
      11
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.esmadrid.com/",
    "sourceLabel": "Turismo oficial · España",
    "blocks": [
      {
        "title": "El centro de Madrid",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Puerta del Sol",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Plaza Mayor de Madrid",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Mercado de San Miguel",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Arte y aire libre",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Museo del Prado",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el Barrio de las Letras",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Parque de El Retiro",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Historia y barrios con vida",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Palacio Real de Madrid",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Madrid",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Templo de Debod",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-it",
    "name": "Roma",
    "region": "Lacio",
    "country": "Italia",
    "countryCode": "IT",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 340,
    "days": "3–5 días",
    "image": "world-it.jpg",
    "photo": "Rome",
    "photoCredit": {
      "image": "world-it.jpg",
      "photo": "Rome",
      "source": "https://commons.wikimedia.org/wiki/File:Colosseo_2020.jpg",
      "author": "FeaturedPics",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "bytes": 334899
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Historia en cada esquina y mesas que invitan a quedarse.",
    "description": "Historia en cada esquina y mesas que invitan a quedarse.",
    "about": "Historia en cada esquina y mesas que invitan a quedarse. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.turismoroma.it/",
    "sourceLabel": "Turismo oficial · Italia",
    "blocks": [
      {
        "title": "La Roma de sus plazas",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Panteón de Roma",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Plaza Navona",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Fontana di Trevi",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Un día en la Roma antigua",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": true,
        "items": [
          [
            "09:00",
            "Coliseo de Roma",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Foro Romano",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Almuerzo y paseo por Monti",
            "Pausa para comer y descansar según tu presupuesto."
          ]
        ]
      },
      {
        "title": "Barrios junto al Tíber",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Campo de Fiori",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Trastevere",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por Trastevere",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-gb",
    "name": "Londres",
    "region": "Inglaterra",
    "country": "Reino Unido",
    "countryCode": "GB",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 430,
    "days": "3–5 días",
    "image": "world-gb.jpg",
    "photo": "London",
    "photoCredit": {
      "image": "world-gb.jpg",
      "photo": "London",
      "source": "https://commons.wikimedia.org/wiki/File:London_Skyline_(125508655).jpeg",
      "author": "Ilya Grigorik",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "bytes": 294633
    },
    "categories": [
      "Cultura",
      "Fotografía",
      "Gastronomía"
    ],
    "tag": "Museos, mercados y paseos a orillas del Támesis.",
    "description": "Museos, mercados y paseos a orillas del Támesis.",
    "about": "Museos, mercados y paseos a orillas del Támesis. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.visitlondon.com/",
    "sourceLabel": "Turismo oficial · Reino Unido",
    "blocks": [
      {
        "title": "Una mirada a Westminster",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Parliament Square",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Paseo por South Bank",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Trafalgar Square",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Museos y barrios del centro",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Museo Británico",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Covent Garden",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Covent Garden",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una ruta junto al río",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Tower Bridge",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Borough Market",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Paseo por Bankside",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-de",
    "name": "Berlín",
    "region": "Berlín",
    "country": "Alemania",
    "countryCode": "DE",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 320,
    "days": "3–5 días",
    "image": "world-de.jpg",
    "photo": "Berlin",
    "photoCredit": {
      "image": "world-de.jpg",
      "photo": "Berlin",
      "source": "https://commons.wikimedia.org/wiki/File:Museumsinsel_Berlin_Juli_2021_1_(cropped)_b.jpg",
      "author": "File:Museumsinsel Berlin Juli 2021 1 (cropped).jpg: Kasa Fue\nderivative work: Georgfotoart",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "bytes": 439191
    },
    "categories": [
      "Cultura",
      "Fotografía",
      "Gastronomía"
    ],
    "tag": "Historia, arte y barrios con una energía propia.",
    "description": "Historia, arte y barrios con una energía propia.",
    "about": "Historia, arte y barrios con una energía propia. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.visitberlin.de/es",
    "sourceLabel": "Turismo oficial · Alemania",
    "blocks": [
      {
        "title": "Historia en el centro",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Puerta de Brandeburgo",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Memorial del Holocausto",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Paseo por Unter den Linden",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Un día de museos y plazas",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Isla de los Museos",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Mitte",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Alexanderplatz",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Berlín contemporáneo",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "East Side Gallery",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo junto al Spree",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por Kreuzberg",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-pt",
    "name": "Lisboa",
    "region": "Lisboa",
    "country": "Portugal",
    "countryCode": "PT",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 280,
    "days": "3–5 días",
    "image": "world-pt.jpg",
    "photo": "Lisbon",
    "photoCredit": {
      "image": "world-pt.jpg",
      "photo": "Lisbon",
      "source": "https://commons.wikimedia.org/wiki/File:Lisbon_(36831596786)_(cropped).jpg",
      "author": "Deensel",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "bytes": 302758
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Miradores, barrios y sabores junto al Tajo.",
    "description": "Miradores, barrios y sabores junto al Tajo.",
    "about": "Miradores, barrios y sabores junto al Tajo. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.visitlisboa.com/es",
    "sourceLabel": "Turismo oficial · Portugal",
    "blocks": [
      {
        "title": "Las plazas del centro",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Praça do Comércio",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Baixa",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Plaza del Rossio",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Belém a tu ritmo",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Monasterio de los Jerónimos",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Belém",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Torre de Belém, exterior",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Las colinas de Lisboa",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Barrio de Alfama",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Alfama",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Mirador de Santa Luzia",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-gr",
    "name": "Atenas",
    "region": "Ática",
    "country": "Grecia",
    "countryCode": "GR",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 290,
    "days": "3–5 días",
    "image": "world-gr.jpg",
    "photo": "Athens",
    "photoCredit": {
      "image": "world-gr.jpg",
      "photo": "Athens",
      "source": "https://commons.wikimedia.org/wiki/File:Athens_Acropolis_at_Daybreak.jpg",
      "author": "Andrew Parlette",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
      "bytes": 290886
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Historia clásica y barrios para conocer caminando.",
    "description": "Historia clásica y barrios para conocer caminando.",
    "about": "Historia clásica y barrios para conocer caminando. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.thisisathens.org/",
    "sourceLabel": "Turismo oficial · Grecia",
    "blocks": [
      {
        "title": "Un primer paseo por Atenas",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Plaza Syntagma",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Atenas",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Barrio de Plaka",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Encuentro con la historia clásica",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Acrópolis de Atenas",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Museo de la Acrópolis",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Almuerzo y descanso",
            "Pausa para comer y descansar según tu presupuesto."
          ]
        ]
      },
      {
        "title": "Mercados y vida de barrio",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Ágora Antigua de Atenas",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Monastiraki",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Mercado de Monastiraki",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-nl",
    "name": "Ámsterdam",
    "region": "Holanda Septentrional",
    "country": "Países Bajos",
    "countryCode": "NL",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 400,
    "days": "3–5 días",
    "image": "world-nl.png",
    "photo": "Amsterdam",
    "photoCredit": {
      "image": "world-nl.png",
      "photo": "Amsterdam",
      "source": "https://commons.wikimedia.org/wiki/File:Imagen_de_los_canales_conc%C3%A9ntricos_en_%C3%81msterdam.png",
      "author": "Andrés Barrios",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "bytes": 2566596
    },
    "categories": [
      "Cultura",
      "Fotografía",
      "Naturaleza"
    ],
    "tag": "Canales, museos y rincones que se descubren sin prisa.",
    "description": "Canales, museos y rincones que se descubren sin prisa.",
    "about": "Canales, museos y rincones que se descubren sin prisa. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.iamsterdam.com/",
    "sourceLabel": "Turismo oficial · Países Bajos",
    "blocks": [
      {
        "title": "Una ciudad de canales",
        "tags": [
          "Cultura",
          "Fotografía",
          "Naturaleza"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Plaza Dam",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Ámsterdam",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Barrio de Jordaan",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Arte y parques",
        "tags": [
          "Cultura",
          "Fotografía",
          "Naturaleza"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Rijksmuseum",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Museumplein",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Vondelpark",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Otra mirada a Ámsterdam",
        "tags": [
          "Cultura",
          "Fotografía",
          "Naturaleza"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Museo Van Gogh",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Mercado Albert Cuyp",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Paseo por los canales de Ámsterdam",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-ch",
    "name": "Lucerna",
    "region": "Cantón de Lucerna",
    "country": "Suiza",
    "countryCode": "CH",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 560,
    "days": "3–5 días",
    "image": "world-ch.jpg",
    "photo": "Kapellbrücke",
    "photoCredit": {
      "image": "world-ch.jpg",
      "photo": "Kapellbrücke",
      "source": "https://commons.wikimedia.org/wiki/File:Kapellbruecke.JPG",
      "author": "Simon Koopmann",
      "license": "CC BY-SA 2.5",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5",
      "bytes": 351442
    },
    "categories": [
      "Naturaleza",
      "Fotografía",
      "Cultura"
    ],
    "tag": "Un lago, puentes y panoramas junto a los Alpes.",
    "description": "Un lago, puentes y panoramas junto a los Alpes.",
    "about": "Un lago, puentes y panoramas junto a los Alpes. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.luzern.com/",
    "sourceLabel": "Turismo oficial · Suiza",
    "blocks": [
      {
        "title": "Lucerna junto al agua",
        "tags": [
          "Naturaleza",
          "Fotografía",
          "Cultura"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Puente de la Capilla",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Lucerna",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Casco antiguo de Lucerna",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una ciudad con historia",
        "tags": [
          "Naturaleza",
          "Fotografía",
          "Cultura"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Monumento del León de Lucerna",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo y descanso",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Muralla de Musegg",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una jornada frente al lago",
        "tags": [
          "Naturaleza",
          "Fotografía",
          "Cultura"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Paseo por el lago de los Cuatro Cantones",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo junto al lago",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Tiempo libre en Lucerna",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-at",
    "name": "Viena",
    "region": "Viena",
    "country": "Austria",
    "countryCode": "AT",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 360,
    "days": "3–5 días",
    "image": "world-at.jpg",
    "photo": "Vienna",
    "photoCredit": {
      "image": "world-at.jpg",
      "photo": "Vienna",
      "source": "https://commons.wikimedia.org/wiki/File:Schoenbrunn_philharmoniker_2012.jpg",
      "author": "Superbass",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "bytes": 270569
    },
    "categories": [
      "Cultura",
      "Fotografía",
      "Gastronomía"
    ],
    "tag": "Palacios, cafés y música en una ciudad para caminar.",
    "description": "Palacios, cafés y música en una ciudad para caminar.",
    "about": "Palacios, cafés y música en una ciudad para caminar. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.wien.info/es",
    "sourceLabel": "Turismo oficial · Austria",
    "blocks": [
      {
        "title": "El corazón de Viena",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Catedral de San Esteban",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el centro de Viena",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por el Graben",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Un día en Schönbrunn",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": true,
        "items": [
          [
            "09:00",
            "Palacio de Schönbrunn",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el entorno de Schönbrunn",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Jardines de Schönbrunn",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Arte y tradición",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "MuseumsQuartier",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Café tradicional en Viena",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por la Ringstrasse",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-hr",
    "name": "Dubrovnik",
    "region": "Dalmacia",
    "country": "Croacia",
    "countryCode": "HR",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 330,
    "days": "3–5 días",
    "image": "world-hr.jpg",
    "photo": "Dubrovnik",
    "photoCredit": {
      "image": "world-hr.jpg",
      "photo": "Dubrovnik",
      "source": "https://commons.wikimedia.org/wiki/File:The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg",
      "author": "Zysko serhii",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "bytes": 393260
    },
    "categories": [
      "Cultura",
      "Playa",
      "Fotografía"
    ],
    "tag": "Una ciudad amurallada frente al Adriático.",
    "description": "Una ciudad amurallada frente al Adriático.",
    "about": "Una ciudad amurallada frente al Adriático. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      5,
      6,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://tzdubrovnik.hr/",
    "sourceLabel": "Turismo oficial · Croacia",
    "blocks": [
      {
        "title": "El encanto de la ciudad antigua",
        "tags": [
          "Cultura",
          "Playa",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Calle Stradun",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Dubrovnik",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Puerto antiguo de Dubrovnik",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Historia frente al Adriático",
        "tags": [
          "Cultura",
          "Playa",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Murallas de Dubrovnik",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo y descanso",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Fortaleza Lovrijenac",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una pausa junto al mar",
        "tags": [
          "Cultura",
          "Playa",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Playa Banje",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo junto a la costa",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por Pile",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-pl",
    "name": "Cracovia",
    "region": "Pequeña Polonia",
    "country": "Polonia",
    "countryCode": "PL",
    "continent": "Europa",
    "zone": "Europa",
    "daily": 210,
    "days": "3–5 días",
    "image": "world-pl.jpg",
    "photo": "Kraków",
    "photoCredit": {
      "image": "world-pl.jpg",
      "photo": "Kraków",
      "source": "https://commons.wikimedia.org/wiki/File:Krakow_Rynek_Glowny_panorama_2.jpg",
      "author": "Andrzej Otrębski",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "bytes": 208019
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Plazas medievales, barrios históricos y cultura local.",
    "description": "Plazas medievales, barrios históricos y cultura local.",
    "about": "Plazas medievales, barrios históricos y cultura local. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://krakow.travel/",
    "sourceLabel": "Turismo oficial · Polonia",
    "blocks": [
      {
        "title": "El centro histórico de Cracovia",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Plaza del Mercado de Cracovia",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el casco antiguo",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Parque Planty",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "La colina de Wawel",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Castillo Real de Wawel",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Cracovia",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por el río Vístula",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Memoria y vida de barrio",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Barrio de Kazimierz",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Kazimierz",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Plaza Wolnica",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-tr",
    "name": "Estambul",
    "region": "Estambul",
    "country": "Turquía",
    "countryCode": "TR",
    "continent": "Asia y Medio Oriente",
    "zone": "Asia y Medio Oriente",
    "daily": 230,
    "days": "3–5 días",
    "image": "world-tr.jpg",
    "photo": "Istanbul",
    "photoCredit": {
      "image": "world-tr.jpg",
      "photo": "Istanbul",
      "source": "https://commons.wikimedia.org/wiki/File:Historical_peninsula_and_modern_skyline_of_Istanbul.jpg",
      "author": "Hunanuk",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "bytes": 288269
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Dos orillas, mercados y siglos de historia compartida.",
    "description": "Dos orillas, mercados y siglos de historia compartida.",
    "about": "Dos orillas, mercados y siglos de historia compartida. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://istanbul.goturkiye.com/",
    "sourceLabel": "Turismo oficial · Turquía",
    "blocks": [
      {
        "title": "La península histórica",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Plaza de Sultanahmet",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Santa Sofía, acceso sujeto a condiciones",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Mezquita Azul",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Palacios y mercados",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Palacio de Topkapi",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Estambul",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Gran Bazar de Estambul",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Un paseo entre dos orillas",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Barrio de Karaköy",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Puente de Gálata",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Paseo junto al Bósforo",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-th",
    "name": "Bangkok",
    "region": "Bangkok",
    "country": "Tailandia",
    "countryCode": "TH",
    "continent": "Asia y Medio Oriente",
    "zone": "Asia y Medio Oriente",
    "daily": 160,
    "days": "3–5 días",
    "image": "world-th.jpg",
    "photo": "Bangkok",
    "photoCredit": {
      "image": "world-th.jpg",
      "photo": "Bangkok",
      "source": "https://commons.wikimedia.org/wiki/File:4Y1A1159_Bangkok_(33536795515).jpg",
      "author": "Ninara from Helsinki, Finland",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "bytes": 361927
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Templos, sabores y mercados a orillas del Chao Phraya.",
    "description": "Templos, sabores y mercados a orillas del Chao Phraya.",
    "about": "Templos, sabores y mercados a orillas del Chao Phraya. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      11,
      12,
      1,
      2
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.tourismthailand.org/",
    "sourceLabel": "Turismo oficial · Tailandia",
    "blocks": [
      {
        "title": "Un primer paseo por Bangkok",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Parque Lumphini",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Bangkok",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Barrio de Siam",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Templos junto al río",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Gran Palacio de Bangkok",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Wat Pho",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Wat Arun",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Sabores y barrios con historia",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Chinatown de Bangkok",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Mercado de Talat Noi",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Paseo por Talat Noi",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-jp",
    "name": "Tokio",
    "region": "Kanto",
    "country": "Japón",
    "countryCode": "JP",
    "continent": "Asia y Medio Oriente",
    "zone": "Asia y Medio Oriente",
    "daily": 350,
    "days": "3–5 días",
    "image": "world-jp.jpg",
    "photo": "Tokyo",
    "photoCredit": {
      "image": "world-jp.jpg",
      "photo": "Tokyo",
      "source": "https://commons.wikimedia.org/wiki/File:Skyscrapers_of_Shinjuku_2009_January.jpg",
      "author": "Morio",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
      "bytes": 274449
    },
    "categories": [
      "Cultura",
      "Gastronomía",
      "Fotografía"
    ],
    "tag": "Tradición y cultura contemporánea en una misma ciudad.",
    "description": "Tradición y cultura contemporánea en una misma ciudad.",
    "about": "Tradición y cultura contemporánea en una misma ciudad. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      3,
      4,
      5,
      10,
      11
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.japan.travel/es/destinations/kanto/tokyo/",
    "sourceLabel": "Turismo oficial · Japón",
    "blocks": [
      {
        "title": "Tradición y barrios del este",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Templo Sensō-ji",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Asakusa",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Parque de Ueno",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "El Tokio contemporáneo",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Santuario Meiji",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Harajuku",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Cruce de Shibuya",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Arte, mercados y vida urbana",
        "tags": [
          "Cultura",
          "Gastronomía",
          "Fotografía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Jardines exteriores del Palacio Imperial",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Ginza",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Akihabara",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-ae",
    "name": "Dubái",
    "region": "Dubái",
    "country": "Emiratos Árabes Unidos",
    "countryCode": "AE",
    "continent": "Asia y Medio Oriente",
    "zone": "Asia y Medio Oriente",
    "daily": 380,
    "days": "3–5 días",
    "image": "world-ae.jpg",
    "photo": "Dubái",
    "photoCredit": {
      "image": "world-ae.jpg",
      "photo": "Dubái",
      "source": "https://commons.wikimedia.org/wiki/File:Dubai_skyline_unsplash.jpg",
      "author": "Robert Bock",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "bytes": 156762
    },
    "categories": [
      "Cultura",
      "Fotografía",
      "Descanso"
    ],
    "tag": "Arquitectura contemporánea y barrios junto al arroyo.",
    "description": "Arquitectura contemporánea y barrios junto al arroyo.",
    "about": "Arquitectura contemporánea y barrios junto al arroyo. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      11,
      12,
      1,
      2,
      3
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.visitdubai.com/es",
    "sourceLabel": "Turismo oficial · Emiratos Árabes Unidos",
    "blocks": [
      {
        "title": "El Dubái de sus barrios históricos",
        "tags": [
          "Cultura",
          "Fotografía",
          "Descanso"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Barrio histórico de Al Fahidi",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Bur Dubai",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Dubai Creek",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una ciudad que mira hacia arriba",
        "tags": [
          "Cultura",
          "Fotografía",
          "Descanso"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Burj Khalifa, visita con reserva",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Dubai Mall",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Paseo por Downtown Dubai",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una pausa junto al Golfo",
        "tags": [
          "Cultura",
          "Fotografía",
          "Descanso"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Playa de Jumeirah",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo y descanso",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Dubai Marina",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-cn",
    "name": "Pekín",
    "region": "Pekín",
    "country": "China",
    "countryCode": "CN",
    "continent": "Asia y Medio Oriente",
    "zone": "Asia y Medio Oriente",
    "daily": 260,
    "days": "3–5 días",
    "image": "world-cn.jpg",
    "photo": "Beijing",
    "photoCredit": {
      "image": "world-cn.jpg",
      "photo": "Beijing",
      "source": "https://commons.wikimedia.org/wiki/File:Skyline_of_Beijing_CBD_with_B-5906_approaching_(20211016171955)_(1).jpg",
      "author": "N509FZ",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
      "bytes": 424345
    },
    "categories": [
      "Cultura",
      "Fotografía",
      "Gastronomía"
    ],
    "tag": "Palacios, parques y barrios de historia milenaria.",
    "description": "Palacios, parques y barrios de historia milenaria.",
    "about": "Palacios, parques y barrios de historia milenaria. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      4,
      5,
      9,
      10
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://english.visitbeijing.com.cn/",
    "sourceLabel": "Turismo oficial · China",
    "blocks": [
      {
        "title": "Una primera mirada a Pekín",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Parque Jingshan",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en Pekín",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Barrio de los hutong de Pekín",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Palacios e historia",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Ciudad Prohibida",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo y descanso",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Parque Beihai",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Una jornada de jardines",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Palacio de Verano de Pekín",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en el entorno del Palacio de Verano",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por el lago Kunming",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  },
  {
    "id": "world-eg",
    "name": "El Cairo",
    "region": "El Cairo y Guiza",
    "country": "Egipto",
    "countryCode": "EG",
    "continent": "África",
    "zone": "África",
    "daily": 185,
    "days": "3–5 días",
    "image": "world-eg.jpg",
    "photo": "Cairo",
    "photoCredit": {
      "image": "world-eg.jpg",
      "photo": "Cairo",
      "source": "https://commons.wikimedia.org/wiki/File:Cairo_From_Tower_(cropped).jpg",
      "author": "Wael El Sisi",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "bytes": 362470
    },
    "categories": [
      "Cultura",
      "Fotografía",
      "Gastronomía"
    ],
    "tag": "Patrimonio milenario y una ciudad junto al Nilo.",
    "description": "Patrimonio milenario y una ciudad junto al Nilo.",
    "about": "Patrimonio milenario y una ciudad junto al Nilo. Conoce sus atractivos por zonas y deja tiempo para los traslados y el descanso. Las entradas y los servicios se coordinan con cada proveedor.",
    "season": "Consulta el clima y las condiciones locales antes de viajar.",
    "months": [
      10,
      11,
      12,
      1,
      2,
      3,
      4
    ],
    "tip": "Los recorridos y presupuestos son orientativos. Los vuelos o pasajes hacia el destino no están incluidos. Confirma accesos, transporte y disponibilidad por separado.",
    "source": "https://www.experienceegypt.eg/es/city/1/cairo-e-giza",
    "sourceLabel": "Turismo oficial · Egipto",
    "blocks": [
      {
        "title": "Un primer encuentro con El Cairo",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Centro de El Cairo",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en El Cairo",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Paseo por el Nilo",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      },
      {
        "title": "Un día en la meseta de Guiza",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": true,
        "items": [
          [
            "09:00",
            "Pirámides de Guiza",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Gran Esfinge de Guiza",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "16:00",
            "Retorno a El Cairo",
            "Coordina la movilidad y confirma el horario real del recorrido."
          ]
        ]
      },
      {
        "title": "Historia y mercados",
        "tags": [
          "Cultura",
          "Fotografía",
          "Gastronomía"
        ],
        "full": false,
        "items": [
          [
            "09:00",
            "Ciudadela de Saladino",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ],
          [
            "13:00",
            "Almuerzo en El Cairo",
            "Pausa para comer y descansar según tu presupuesto."
          ],
          [
            "16:00",
            "Bazar Khan el-Khalili",
            "Consulta horarios, accesos, reservas y costo con el proveedor antes de ir."
          ]
        ]
      }
    ]
  }
]);
