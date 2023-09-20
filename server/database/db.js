const mongoose = require("mongoose");
require('dotenv').config();

const db = async () => {
  // Usamos el método 'await' para esperar a que la conexión se establezca de manera asíncrona
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB"); // Si la conexión es exitosa, mostramos un mensaje de éxito
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error); // Si ocurre un error en la conexión, mostramos un mensaje de error
    });
};
module.exports = db;