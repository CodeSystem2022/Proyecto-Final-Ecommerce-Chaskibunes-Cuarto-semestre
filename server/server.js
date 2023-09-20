const express = require("express");
const cors = require("cors");
const db = require("./database/db");
require("dotenv").config();

const controllers = require("./controllers");
const verifyToken = require("./middleware/verifyToken");

const app = express();
// Habilita el middleware CORS para permitir solicitudes desde otros dominios
app.use(cors());
// Parsea el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas públicas, sin autenticación
// Ruta para registro de usuarios
app.post("/register", controllers.register);
// Ruta para inicio de sesión de usuarios
app.post("/login", controllers.login);

// Rutas protegidas, requieren autenticación
// Ruta que obtiene el token
app.get("/user", verifyToken, controllers.getUserById);

// Rutas para cambiar contraseña, nombre y correo electrónico
// Se incluye middleware verifyToken para verificar la autenticación
app.use("/api/profile", require("./routes/Profile"), verifyToken);

// Ruta para crear un pago utilizando Stripe
app.post("/procesar_pago", controllers.stripe.processPayment);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`SERVER FUNCIONANDO EN EL PUERTO ${PORT}`);
  // Conexión a la base de datos al iniciar el servidor
  db();
});

module.exports = app;
