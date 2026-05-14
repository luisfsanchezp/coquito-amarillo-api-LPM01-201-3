const express = require('express');

const router = express.Router();

// ===============================
// PAGOS PSE
// ===============================

let pagos = [];

// ===============================
// FORMULARIO PSE
// ===============================

router.get('/', (req, res) => {

  res.send(`

  <html>

    <head>

      <title>Pagos PSE</title>

      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">

      <style>

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{

          font-family:'Poppins', sans-serif;

          min-height:100vh;

          background:
          linear-gradient(
          rgba(40,20,10,0.65),
          rgba(40,20,10,0.65)
          ),
          url('/img/Dei.jpeg');

          background-size:cover;

          background-position:center;

          display:flex;

          justify-content:center;

          align-items:center;

          padding:40px;
        }

        .card{

          width:100%;

          max-width:550px;

          background:
          rgba(255,255,255,0.12);

          backdrop-filter:blur(10px);

          border:
          1px solid rgba(255,255,255,0.2);

          border-radius:25px;

          padding:40px;

          color:white;

          box-shadow:
          0 10px 30px rgba(0,0,0,0.3);
        }

        h1{

          text-align:center;

          margin-bottom:30px;

          font-size:45px;
        }

        label{

          display:block;

          margin-top:20px;

          margin-bottom:8px;

          font-weight:600;
        }

        input,
        select{

          width:100%;

          padding:15px;

          border:none;

          border-radius:12px;

          font-size:16px;

          outline:none;
        }

        button{

          width:100%;

          margin-top:30px;

          padding:16px;

          border:none;

          border-radius:15px;

          background:#d8b08c;

          color:white;

          font-size:18px;

          font-weight:bold;

          cursor:pointer;

          transition:0.3s;
        }

        button:hover{

          background:#c49a75;
        }

      </style>

    </head>

    <body>

      <div class="card">

        <h1>💳 Pago PSE</h1>

        <form method="POST" action="/api/pagos-pse">

          <label>Nombre completo</label>

          <input
            type="text"
            name="cliente"
            required
          >

          <label>Banco</label>

          <select name="banco" required>

            <option value="">Selecciona un banco</option>

            <option>Bancolombia</option>

            <option>Nequi</option>

            <option>Davivienda</option>

            <option>BBVA</option>

            <option>Banco de Bogotá</option>

            <option>Banco Popular</option>

          </select>

          <label>Valor</label>

          <input
            type="number"
            name="valor"
            required
          >

          <button type="submit">

            Pagar ahora

          </button>

        </form>

      </div>

    </body>

  </html>

  `);

});

// ===============================
// PROCESAR PAGO
// ===============================

router.post('/', (req, res) => {

  const {

    cliente,
    banco,
    valor

  } = req.body;

  // VALIDACIONES

  if (!cliente || !banco || !valor) {

    return res.status(400).send('Todos los campos son obligatorios');

  }

  // ESTADOS DINÁMICOS

  const estados = [

    'APROBADO',

    'RECHAZADO',

    'PENDIENTE'

  ];

  const estado = estados[
    Math.floor(Math.random() * estados.length)
  ];

  // REFERENCIA

  const referencia =
    'PSE-' + Math.floor(Math.random() * 100000);

  // FECHA

  const fecha = new Date().toLocaleString();

  // NUEVO PAGO

  const nuevoPago = {

    cliente,
    banco,
    valor,
    estado,
    referencia,
    fecha

  };

  pagos.push(nuevoPago);

  // RESPUESTA HTML

  res.send(`

  <html>

    <head>

      <title>Pago Procesado</title>

      <style>

        body{

          font-family:Arial;

          background:#f5ebe3;

          display:flex;

          justify-content:center;

          align-items:center;

          height:100vh;
        }

        .mensaje{

          background:white;

          padding:40px;

          border-radius:20px;

          text-align:center;

          box-shadow:0 10px 20px rgba(0,0,0,0.2);

          width:90%;

          max-width:500px;
        }

        h1{

          color:#8b5e3c;

          margin-bottom:20px;
        }

        p{

          margin:12px 0;

          font-size:17px;
        }

        .estado{

          font-weight:bold;

          color:#d48c70;
        }

        a{

          display:inline-block;

          margin-top:25px;

          padding:12px 24px;

          background:#d8b08c;

          color:white;

          text-decoration:none;

          border-radius:12px;
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

      <div class="mensaje">

        <h1>
          💳 Pago Procesado
        </h1>

        <p>
          <strong>Cliente:</strong> ${cliente}
        </p>

        <p>
          <strong>Banco:</strong> ${banco}
        </p>

        <p>
          <strong>Valor:</strong> $${valor}
        </p>

        <p>
          <strong>Referencia:</strong> ${referencia}
        </p>

        <p>
          <strong>Fecha:</strong> ${fecha}
        </p>

        <p class="estado">
          Estado: ${estado}
        </p>

        <a href="/api/pagos-pse">

          Realizar otro pago

        </a>
        <a class="volver" href="/">

           ⬅ Volver al inicio

        </a>

      </div>

    </body>

  </html>

  `);

});

// ===============================
// CONSULTAR PAGO POR REFERENCIA
// ===============================

router.get('/:ref', (req, res) => {

  const referencia = req.params.ref;

  const pago = pagos.find(

    p => p.referencia === referencia

  );

  if (!pago) {

    return res.status(404).json({

      mensaje: 'Pago no encontrado'

    });

  }

  res.json(pago);

});

module.exports = router;