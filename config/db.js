const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB');
    }
    catch (error) {
        console.error('Error al conectar la base de datos:', error);
        process.exit(1);
    }
};

module.exports = conectarDB;
