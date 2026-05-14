const express = require('express');

const router = express.Router();

// ===============================
// PEDIDOS
// ===============================

let pedidos = [];

// ===============================
// FORMULARIO
// ===============================

router.get('/', (req, res) => {

  let html = `

  <html>

    <head>

      <title>Pedidos - Lovely Aaron</title>

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

          max-width:600px;

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

        .volver{

          display:block;

          margin-top:25px;

          text-align:center;

          color:white;

          text-decoration:none;
        }

      </style>

    </head>

    <body>

      <div class="card">

        <h1>🛍️ Realizar Pedido</h1>

        <form method="POST" action="/api/pedidos">

          <label>Nombre completo</label>

          <input
            type="text"
            name="cliente"
            placeholder="Escribe tu nombre"
            required
          >

          <label>Correo electrónico</label>

          <input
            type="email"
            name="email"
            placeholder="correo@gmail.com"
            required
          >

          <label>Teléfono</label>

          <input
            type="text"
            name="telefono"
            placeholder="3001234567"
            required
          >

          <label>Ciudad</label>

          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            required
          >

          <label>Producto</label>

          <select name="producto" required>

            <option value="">Selecciona</option>

            <option>Shampoo Hidratante</option>

            <option>Mascarilla Reparadora</option>

            <option>Acondicionador Nutritivo</option>

            <option>Serum Capilar</option>

            <option>Spray Protector Térmico</option>

            <option>Tónico Anticaída</option>

            <option>Vitamina Capilar</option>

            <option>Peluca Humana</option>

            <option>Peluca Lace Front</option>

            <option>Peluca de Encaje</option>

            <option>Peluca de Fibra Sintética</option>

            <option>Extensiones Sintéticas</option>

            <option>Extensiones Humanas</option>

            <option>Extensiones de Clip</option>

            <option>Extensiones Adhesivas</option>

            <option>Bases de maquillaje</option>

            <option>Labiales</option>

            <option>Paleta de Sombras</option>

            <option>Delineador Líquido</option>

          </select>

          <label>Cantidad</label>

          <input
            type="number"
            name="cantidad"
            min="1"
            required
          >

          <button type="submit">

            Confirmar Pedido

          </button>

        </form>

        <a class="volver" href="/">

          ⬅ Volver al inicio

        </a>

      </div>

    </body>

  </html>

  `;

  res.send(html);

});

// ===============================
// GUARDAR PEDIDO
// ===============================

router.post('/', (req, res) => {

  const personas = require('../models/personas');

  const {

    cliente,
    producto,
    cantidad,
    email,
    telefono,
    ciudad

  } = req.body;

  const nuevoPedido = {

    id: pedidos.length + 1,

    cliente,

    producto,

    cantidad,

    estado: 'PENDIENTE'

  };

  pedidos.push(nuevoPedido);

  // ===============================
  // REGISTRAR PERSONA
  // ===============================

  const existePersona = personas.find(

    p => p.email === email

  );

  if (!existePersona) {

    const nuevaPersona = {

      id: personas.length + 1,

      tipoDoc: 'CC',

      numDoc: '000000000',

      nombres: cliente,

      apellidos: '',

      email: email,

      telefono: telefono,

      ciudad: ciudad,

      activo: true

    };

    personas.push(nuevaPersona);

  }

  res.send(`

  <html>

    <head>

      <title>Pedido Exitoso</title>

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
        }

        h1{

          color:#8b5e3c;
        }

        p{

          margin-top:15px;
        }

        a{

          display:inline-block;

          margin-top:20px;

          padding:12px 24px;

          background:#d8b08c;

          color:white;

          text-decoration:none;

          border-radius:12px;
        }

      </style>

    </head>

    <body>

      <div class="mensaje">

        <h1>
          ✨ Pedido realizado con éxito ✨
        </h1>

        <p>
          <strong>Cliente:</strong> ${cliente}
        </p>

        <p>
          <strong>Producto:</strong> ${producto}
        </p>

        <p>
          <strong>Cantidad:</strong> ${cantidad}
        </p>

        <p>
          El cliente fue registrado correctamente.
        </p>

        <a href="/api/pedidos">

          Hacer otro pedido

        </a>

      </div>

    </body>

  </html>

  `);

});

module.exports = router;