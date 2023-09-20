const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  // Obtenemos el token del encabezado HTTP de la solicitud
  const token = req.headers["token"];
  // Verificamos si se proporcionó un token
  if (token) {
    // Utilizamos el método 'verify' de 'jsonwebtoken' para verificar el token
    jwt.verify(token, secret, (error, data) => {
      // Si hay un error en la verificación, respondemos con un estado 400 (Bad Request) y un mensaje de token inválido
      if (error) return res.status(400).json({ mensaje: "Token invalido" });
      else {
        // Si el token es válido, adjuntamos los datos del usuario decodificados al objeto 'req' para su uso posterior
        req.user = data;
        // Llamamos a 'next()' para permitir que la solicitud continúe hacia el siguiente middleware o controlador
        next();
      }
    });
  } else {
    // Si no se proporciona un token en el encabezado, respondemos con un estado 400 y un mensaje indicando que se debe enviar un token
    res.status(400).json({ mensaje: "Debes enviar un token" });
  }
};

module.exports = verifyToken;
