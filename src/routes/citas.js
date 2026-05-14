const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

  res.send(`

  <html>

    <head>

      <title>Agenda tu cita</title>

      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Great+Vibes&display=swap" rel="stylesheet">

      <style>

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{

          font-family:'Poppins', sans-serif;

          min-height:100vh;

          display:flex;

          justify-content:center;

          align-items:center;

          padding:40px;

          background:
          linear-gradient(
          rgba(30,20,15,0.75),
          rgba(30,20,15,0.75)
          ),
          url('/img/Dei.jpeg');

          background-size:cover;

          background-position:center;
        }

        .contenedor{

          width:100%;

          max-width:700px;

          background:
          rgba(255,255,255,0.08);

          border:
          1px solid rgba(255,255,255,0.15);

          backdrop-filter:blur(15px);

          border-radius:35px;

          padding:50px;

          box-shadow:
          0 20px 40px rgba(0,0,0,0.35);

          color:white;
        }

        h1{

          text-align:center;

          font-family:'Great Vibes', cursive;

          font-size:75px;

          color:#f5dfcf;

          margin-bottom:10px;
        }

        .subtitulo{

          text-align:center;

          margin-bottom:40px;

          color:#f1d5c3;

          letter-spacing:3px;
        }

        form{

          display:flex;

          flex-direction:column;

          gap:22px;
        }

        input,
        select,
        textarea{

          width:100%;

          padding:18px;

          border:none;

          border-radius:18px;

          background:
          rgba(255,255,255,0.12);

          color:white;

          font-size:16px;

          outline:none;
        }

        input::placeholder,
        textarea::placeholder{

          color:#f5e6dd;
        }

        option{

          color:black;
        }

        textarea{

          resize:none;

          height:130px;
        }

        button{

          margin-top:15px;

          padding:18px;

          border:none;

          border-radius:50px;

          background:#d8b08c;

          color:white;

          font-size:18px;

          font-weight:bold;

          cursor:pointer;

          transition:0.3s;
        }

        button:hover{

          background:#c89a72;

          transform:scale(1.03);
        }

        .volver{

          display:block;

          text-align:center;

          margin-top:30px;

          color:white;

          text-decoration:none;
        }

      </style>

    </head>

    <body>

      <div class="contenedor">

        <h1>Reserva tu cita</h1>

        <p class="subtitulo">

          EXPERIENCIA PREMIUM LOVELY AARON

        </p>

        <form>

          <input
          type="text"
          placeholder="Nombre completo">

          <input
          type="tel"
          placeholder="Número de WhatsApp">

          <select>

            <option>

              Selecciona un servicio

            </option>

            <option>

              Instalación de peluca

            </option>

            <option>

              Extensiones premium

            </option>

            <option>

              Tratamiento capilar

            </option>

            <option>

              Maquillaje profesional

            </option>

            <option>

              Cejas y pestañas

            </option>

          </select>

          <input type="date">

          <input type="time">

          <textarea
          placeholder="Cuéntanos qué deseas realizarte...">
          </textarea>

          <button>

            Reservar cita ✨

          </button>

        </form>

        <a href="/" class="volver">

          ⬅ Volver al inicio

        </a>

      </div>

    </body>

  </html>

  `);

});

module.exports = router;