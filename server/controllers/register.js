const bcrypt = require("bcrypt");
const Usuario = require("../models/User.js");

const register = async (req, res) => {
  // Extraer el nombre, email y contraseña del cuerpo de la solicitud (req.body)
  const { nombre, email, password } = req.body;

  // Verifica si el usuario ya existe
  const existingUser = await Usuario.findOne({ email });
  if (existingUser) {
    // Si ya existe un usuario con el mismo correo electrónico, responder con un mensaje de error
    return res.json({ message: "El correo electrónico ya está registrado" });
  } else if (!nombre || !email || !password) {
    // Si falta alguno de los campos obligatorios (nombre, email, contraseña), responder con un mensaje de error
    return res.json("Falta el nombre / email / password");
  } else {
    // Si no hay un usuario existente con el mismo correo y se proporcionan todos los campos requeridos, procedemos con el registro

    // Generar un hash de la contraseña proporcionada con bcrypt (con una sal de 10 rondas)
    bcrypt.hash(password, 10, (error, passwordHasheada) => {
      if (error)
        // Si hay un error en el proceso de hashing, responder con un mensaje de error
        res.json({
          error,
        });
      else {
        // Crear un nuevo objeto de usuario con la contraseña hasheada
        const nuevoUsuario = new Usuario({
          nombre,
          email,
          password: passwordHasheada,
        });
        // Guardar el nuevo usuario en la base de datos
        nuevoUsuario
          .save()
          .then((usuario) => {
            // Si el usuario se guarda con éxito, responder con un mensaje de éxito y los datos del usuario registrado
            res.json({ message: "Usuario creado correctamente", usuario });
          })
          // Si ocurre un error al guardar el usuario, imprimir el error en la consola
          .catch((error) => console.error(error));
      }
    });
  }
};
module.exports = register;
