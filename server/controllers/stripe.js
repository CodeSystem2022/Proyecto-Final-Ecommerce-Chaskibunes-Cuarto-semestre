const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");
const userId = require("../models/User");
const PurchasedProduct = require("../models/PurchaseProduct");
require("dotenv").config();

// Controlador para procesar el pago con Stripe
exports.processPayment = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      shippingAddress,
      phone,
      stripeTokenId,
      totalAmount,
      cart,
    } = req.body;


    // Crear una orden en la base de datos
    const order = new Order({
      firstName,
      lastName,
      email,
      shippingAddress,
      phone,
      stripeTokenId,
      totalAmount,
    });

    // Crear un array para almacenar los productos comprados
    const purchasedProducts = [];

    // Iterar a través del carrito del cliente y guardar los detalles de los productos
    for (const cartItem of cart) {
      const { name, description, quantity, image} = cartItem;
      const purchasedProduct = new PurchasedProduct({
        name,
        image,
        description,
        quantity,
      });
      purchasedProducts.push(purchasedProduct);
    }

    // Asignar los productos comprados a la orden
    order.products = purchasedProducts;

    // Guardar la orden y los productos comprados en la base de datos
    await Promise.all([order.save(), ...purchasedProducts.map(product => product.save())]);

    // Realizar el cargo en Stripe
    const charge = await stripe.charges.create({
      amount: totalAmount * 100,
      currency: "USD",
      source: stripeTokenId,
      description: "Descripción del cargo",
      metadata: {
        orderId: order._id.toString(),
      },
    });

    // Verificar si el pago se realizó con éxito
    if (charge.status === "succeeded") {
      // Redirige al usuario a la página de confirmación
      res.json({ success: true, confirmationUrl: "/confirmacion" });
    } else {
      // Si el pago falla, puedes manejarlo de acuerdo a tus necesidades
      res.json({ error: "Error en el pago." });
    }
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.json({ error: "Error al procesar el pago." });
  }
};
