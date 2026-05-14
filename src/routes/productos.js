const express = require('express');

const router = express.Router();

// ===============================
// PRODUCTOS
// ===============================

const productos = [

  {
      nombre: 'Shampoo Hidratante',

          precio: '$50.000',

              imagen: '/img/HIDRATANTE.jpeg',

                  descripcion:
                      'Limpia profundamente mientras hidrata y revitaliza el cabello, dejándolo suave, brillante y sedoso desde la primera aplicación.'
                        },

                          {
                              nombre: 'Mascarilla Reparadora',

                                  precio: '$60.000',

                                      imagen: '/img/Mascarilla.jpeg',

                                          descripcion:
                                              'Tratamiento intensivo que nutre y repara el cabello maltratado, devolviendo fuerza, brillo y elasticidad.'
                                                },

                                                  {
                                                      nombre: 'Acondicionador Nutritivo',

                                                          precio: '$50.000',

                                                              imagen: '/img/Acondicionador.jpeg',

                                                                  descripcion:
                                                                      'Desenreda y suaviza el cabello mientras aporta nutrición profunda para un acabado manejable y saludable.'
                                                                        },
                                                                          {
                                                                              nombre: 'Kit Natural de Romero',

                                                                                  precio: '$90.000',

                                                                                      imagen: '/img/Kit.jpeg',

                                                                                          descripcion:
                                                                                              'Set de productos naturales para el cuidado del cabello, con ingredientes seleccionados para una experiencia de baño relajante y revitalizante.'
                                                                                                },

                                                                                                  {
                                                                                                      nombre: 'Spray Protector Térmico',

                                                                                                          precio: '$45.000',

                                                                                                              imagen: '/img/spray.jpeg',

                                                                                                                  descripcion:
                                                                                                                      'Protege el cabello del calor de planchas y secadores, evitando el quiebre y manteniendo el brillo natural.'
                                                                                                                        },

                                                                                                                          {
                                                                                                                              nombre: 'Vitaminas Capilares',

                                                                                                                                  precio: '$95.000',

                                                                                                                                      imagen: '/img/vitaminas.jpeg',

                                                                                                                                          descripcion:
                                                                                                                                              'Fórmula enriquecida para fortalecer el cabello desde el interior, aportando brillo, crecimiento y vitalidad.'
                                                                                                                                                },

                                                                                                                                                  {
                                                                                                                                                      nombre: 'Tónico Anticaída',

                                                                                                                                                          precio: '$80.000',

                                                                                                                                                              imagen: '/img/tonico.jpeg',

                                                                                                                                                                  descripcion:
                                                                                                                                                                      'Fortalece la raíz capilar y ayuda a disminuir la caída del cabello estimulando el crecimiento saludable.'
                                                                                                                                                                        },

                                                                                                                                                                          {
                                                                                                                                                                              nombre: 'Serum Brillo Extremo',

                                                                                                                                                                                  precio: '$70.000',

                                                                                                                                                                                      imagen: '/img/serum.jpeg',

                                                                                                                                                                                          descripcion:
                                                                                                                                                                                              'Aporta un acabado luminoso y sedoso mientras controla el frizz y protege las puntas.'
                                                                                                                                                                                                },

                                                                                                                                                                                                  {
                                                                                                                                                                                                      nombre: 'Peluca Lace Front',

                                                                                                                                                                                                          precio: '$450.000',

                                                                                                                                                                                                              imagen: '/img/pelucalace.jpeg',

                                                                                                                                                                                                                  descripcion:
                                                                                                                                                                                                                      'Peluca premium con acabado natural y línea frontal invisible para un look elegante y realista.'
                                                                                                                                                                                                                        },

                                                                                                                                                                                                                          {
                                                                                                                                                                                                                              nombre: 'Peluca Natural',

                                                                                                                                                                                                                                  precio: '$520.000',

                                                                                                                                                                                                                                      imagen: '/img/Natural.jpeg',

                                                                                                                                                                                                                                          descripcion:
                                                                                                                                                                                                                                              'Cabello suave y natural con movimiento impecable para lucir hermosa en cualquier ocasión.'
                                                                                                                                                                                                                                                },

                                                                                                                                                                                                                                                  {
                                                                                                                                                                                                                                                      nombre: 'Peluca Sintética',

                                                                                                                                                                                                                                                          precio: '$350.000',

                                                                                                                                                                                                                                                              imagen: '/img/sintetica.jpeg',

                                                                                                                                                                                                                                                                  descripcion:
                                                                                                                                                                                                                                                                      'Diseño moderno y práctico con excelente textura y estilo para transformar tu look fácilmente.'
                                                                                                                                                                                                                                                                        },

                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                              nombre: 'Extensiones Premium',

                                                                                                                                                                                                                                                                                  precio: '$400.000',

                                                                                                                                                                                                                                                                                      imagen: '/img/premium.jpeg',

                                                                                                                                                                                                                                                                                          descripcion:
                                                                                                                                                                                                                                                                                              'Extensiones de alta calidad con acabado sedoso y natural que aportan volumen, largo y elegancia.'
                                                                                                                                                                                                                                                                                                },

                                                                                                                                                                                                                                                                                                  {
                                                                                                                                                                                                                                                                                                      nombre: 'Paleta de Sombras',

                                                                                                                                                                                                                                                                                                          precio: '$80.000',

                                                                                                                                                                                                                                                                                                              imagen: '/img/paleta.jpeg',

                                                                                                                                                                                                                                                                                                                  descripcion:
                                                                                                                                                                                                                                                                                                                      'Colores intensos y elegantes para crear maquillajes glamorosos y duraderos.'
                                                                                                                                                                                                                                                                                                                        },

                                                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                                                              nombre: 'Labiales de Larga Duración',

                                                                                                                                                                                                                                                                                                                                  precio: '$45.000',

                                                                                                                                                                                                                                                                                                                                      imagen: '/img/labiales.jpeg',

                                                                                                                                                                                                                                                                                                                                          descripcion:
                                                                                                                                                                                                                                                                                                                                              'Color vibrante y acabado impecable que permanece perfecto durante horas.'
                                                                                                                                                                                                                                                                                                                                                },

                                                                                                                                                                                                                                                                                                                                                  {
                                                                                                                                                                                                                                                                                                                                                      nombre: 'Delineador Líquido',

                                                                                                                                                                                                                                                                                                                                                          precio: '$35.000',

                                                                                                                                                                                                                                                                                                                                                              imagen: '/img/delineador.jpeg',

                                                                                                                                                                                                                                                                                                                                                                  descripcion:
                                                                                                                                                                                                                                                                                                                                                                      'Precisión y duración para una mirada impactante y sofisticada.'
                                                                                                                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                                                                                                              nombre: 'Vaseline',
                                                                                                                                                                                                                                                                                                                                                                                  precio: '$45.000',
                                                                                                                                                                                                                                                                                                                                                                                      imagen: '/img/Vaseline.jpeg',
                                                                                                                                                                                                                                                                                                                                                                                          descripcion: 'Protección y hidratación para la piel seca.'
                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                            ];
                                                                                                                                                                                                                                                                                                                                                                                            
// ===============================
// RUTA PRODUCTOS
// ===============================

router.get('/', (req, res) => {

  let html = `

  <html>

    <head>

      <title>Productos - Lovely Aaron</title>

      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">

      <style>

        body{

          margin:0;

          padding:40px;

          font-family:'Poppins', sans-serif;

          background:
          linear-gradient(
          rgba(35,20,15,0.92),
          rgba(35,20,15,0.92)
          ),
          url('/img/Dei.jpeg');

          background-size:cover;

          background-attachment:fixed;

          color:white;
        }

        h1{

          text-align:center;

          font-size:70px;

          margin-bottom:60px;

          color:#f7e7dc;

          letter-spacing:2px;
        }

        .contenedor{

          display:grid;

          grid-template-columns:
          repeat(auto-fit, minmax(320px,1fr));

          gap:35px;
        }

        .card{

          background:
          rgba(255,255,255,0.08);

          border:
          1px solid rgba(255,255,255,0.12);

          border-radius:30px;

          overflow:hidden;

          backdrop-filter:blur(10px);

          box-shadow:
          0 15px 30px rgba(0,0,0,0.35);

          transition:0.4s;
        }

        .card:hover{

          transform:
          translateY(-10px) scale(1.02);
        }

        .card img{

          width:100%;

          height:320px;

          object-fit:cover;
        }

        .contenido{

          padding:25px;
        }

        .categoria{

          font-size:13px;

          letter-spacing:3px;

          color:#d8b08c;

          margin-bottom:10px;
        }

        .nombre{

          font-size:30px;

          font-weight:700;

          margin-bottom:15px;
        }

        .descripcion{

          color:#f5e6dd;

          line-height:1.7;

          margin-bottom:20px;
        }

        .precio{

          font-size:28px;

          color:#ffd166;

          font-weight:bold;

          margin-bottom:25px;
        }

        .botones{

          display:flex;

          gap:15px;
        }

        .btn{

          flex:1;

          text-align:center;

          padding:14px;

          border-radius:50px;

          text-decoration:none;

          font-weight:600;

          transition:0.3s;
        }

        .comprar{

          background:#d8b08c;

          color:white;
        }

        .comprar:hover{

          background:#c49a75;
        }

        .detalle{

          border:
          1px solid rgba(255,255,255,0.2);

          color:white;
        }

        .detalle:hover{

          background:
          rgba(255,255,255,0.1);
        }
          .volver{

           display:block;

          margin-top:25px;

          text-align:center;

          color:white;

          text-decoration:none;

          font-size:16px;
}

      </style>

    </head>

    <body>

      <h1>Lovely Aaron Essentials</h1>

      <div class="contenedor">

  `;

  productos.forEach(producto => {

    html += `

      <div class="card">

        <img src="${producto.imagen}">

        <div class="contenido">

          <div class="categoria">

            LOVELY AARON

          </div>

          <div class="nombre">

            ${producto.nombre}

          </div>

          <div class="descripcion">

            ${producto.descripcion}

          </div>

          <div class="precio">

            ${producto.precio}

          </div>

          <div class="botones">

            <a href="/api/pedidos" class="btn comprar">

              Comprar

            </a>

            <a href="/api/citas" class="btn detalle">

              Consultar

            </a>

          </div>

        </div>

      </div>

    `;

  });

  html += `

      </div>

    </body>

  </html>

  `;

  res.send(html);

});

module.exports = router;