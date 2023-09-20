const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

// Ruta para actualizar el nombre del usuario
router.put("/update-name/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Obtiene el ID del usuario de los parámetros de la URL
    const { newName } = req.body; // Obtiene el nuevo nombre del cuerpo de la solicitud
    // Busca y actualiza el usuario en la base de datos por su ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { nombre: newName },
      { new: true } // Devuelve el usuario actualizado
    );

    if (!updatedUser) {
      // Si el usuario no se encuentra, responde con un estado 404 y un mensaje de error
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Si el usuario se actualiza muestra un mensaje de exito
    res.json({ message: "Nombre actualizado con éxito", usuario: updatedUser });
  } catch (error) {
    // Manejo de errores: responde con un estado 500 y un mensaje de error en caso de fallo
    res
      .status(500)
      .json({ message: "Error al actualizar el nombre", error: error.message });
  }
});

// Ruta para actualizar el correo electrónico del usuario
router.put("/update-email/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Obtiene el ID del usuario de los parámetros de la URL
    const { newEmail } = req.body; // Obtiene el nuevo correo electrónico del cuerpo de la solicitud
    // Busca y actualiza el usuario en la base de datos por su ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email: newEmail },
      { new: true }
    );
    // Si el email se actualiza muestra un mensaje de exito
    res.json({
      message: "Correo electrónico actualizado con éxito",
      usuario: updatedUser,
    });
  } catch (error) {
    // responde con un estado 500 y un mensaje de error en caso de fallo
    res.status(500).json({
      message: "Error al actualizar el correo electrónico",
      error: error.message,
    });
  }
});

// Ruta para actualizar la contraseña del usuario
router.put("/update-password/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Obtiene el ID del usuario de los parámetros de la URL
    const { currentPassword, newPassword } = req.body; // Obtiene contraseñas actuales y nuevas
    // Busca el usuario en la base de datos por su ID
    const user = await User.findById(userId);

    if (!user) {
      // Si el usuario no se encuentra, responde con un estado 404 y un mensaje de error
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Compara la contraseña actual proporcionada con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      // Si la contraseña actual no coincide, responde con un estado 401 y un mensaje de error
      return res.status(401).json({ message: "Contraseña actual incorrecta" });
    }
    // Hashea la nueva contraseña y actualiza el usuario en la base de datos
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true } // Devuelve el contraseña actualizada
    );
    // Si la contraseña se actualizo responde con un mensaje de exito
    res.json({
      message: "Contraseña actualizada con éxito",
      usuario: updatedUser,
    });
  } catch (error) {
    // responde con un estado 500 y un mensaje de error en caso de fallo
    res.status(500).json({
      message: "Error al actualizar la contraseña",
      error: error.message,
    });
  }
});

module.exports = router;
