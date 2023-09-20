const bcrypt = require("bcrypt");
const Usuario = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET; // Obtener la clave secreta JWT desde las variables de entorno

const login = async (req, res) => {
  // Extraer el email y la contraseña del cuerpo de la solicitud (req.body)
  const { email, password } = req.body;
  // Buscar un usuario en la base de datos por su dirección de correo electrónico
  Usuario.findOne({ email }).then((usuario) => {
    if (!usuario) {
      // Si no se encuentra un usuario con el correo proporcionado, responder con un mensaje de error
      return res.json({ message: "Correo no registrado" });
    }
    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    bcrypt.compare(password, usuario.password).then((esCorrecta) => {
      if (esCorrecta) {
        // Si la contraseña es correcta, extraer el ID y el nombre del usuario
        const { id, nombre } = usuario;
        // Crear un objeto de datos que se utilizará para firmar el token JWT
        const data = {
          id,
          nombre,
        };
        // Generar un token JWT firmado con la clave secreta y configurar su tiempo de expiración (24 horas)
        const token = jwt.sign(data, secret, {
          expiresIn: 86400 /* 24hs */,
        });
        // Responder con un mensaje de éxito y los datos del usuario junto con el token JWT
        res.status(200).json({
          message: "Usuario logeado correctamente",
          usuario: {
            id,
            nombre,
            token,
          },
        });
      } else {
        // Si la contraseña no es correcta, responder con un mensaje de error
        res.json({ message: "Contraseña incorrecta" });
      }
    });
  });
};

module.exports = login;
