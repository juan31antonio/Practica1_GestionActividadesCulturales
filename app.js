const express = require('express');
const dotenv = require('dotenv');
const conectarDB = require('./config/db');

dotenv.config();
const app = express();

conectarDB();

app.use(express.json());

app.use('/proveedores', require('./routes/proveedor.routes'));
app.use('/actividades', require('./routes/actividad.routes'));
app.use('/clientes', require('./routes/cliente.routes'));
app.use('/compras', require('./routes/compra.routes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});