const Usuario = require("../models/User");

const getUserById = async (req, res) => {
  // Extraer la ID del usuario desde el objeto 'req.user'
  const { id } = req.user;
  // Verificar si la ID tiene una longitud válida (en este caso, 24 caracteres)
  if (id.length === 24) {
    // Buscar un usuario por su ID en la base de datos
    Usuario.findById(id).then((usuario) => {
      if (!usuario) {
        // Si no se encuentra ningún usuario con esa ID, responder con un mensaje
        return res.json({
          message: "No se encontro ningun usuario con esa ID",
        });
      } else {
        // Si se encuentra el usuario, extraer información sensible y responder con el resto de los datos
        const { _id, contraseña, __v, ...resto } = usuario._doc;
        res.json(resto);
      }
    });
  } else {
    // Si la ID no tiene la longitud esperada, responder con un mensaje de error
    res.json({ message: "Estas enviando una contraseña incorrecta" });
  }
};

module.exports = getUserById;
