import { Alert, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../reducer/cartReducer.js";
const ConfirmationPage = () => {
  // Obtener información de la compra desde Redux si lo tienes almacenado
  const cartItems = useSelector((state) => state.cart);
  const totalPrice = getTotalPrice(cartItems);

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="success">
          <Alert.Heading>Pago Exitoso</Alert.Heading>
          <p>Tu compra se ha realizado con éxito. Gracias por tu pedido. Te hemos enviado un correo de confirmación.</p>
          {cartItems.length > 0 && (
            <div>
              <h5>Resumen de la compra:</h5>
              <ul>
                {cartItems.map((product) => (
                  <li key={product.id}>
                    {product.name} - Cantidad: {product.quantity} - Subtotal: $
                    {product.quantity * product.price}
                  </li>
                ))}
              </ul>
              <p>Total: ${totalPrice}</p>
            </div>
          )}
        </Alert>
      </div>
    </Container>
  );
};

export default ConfirmationPage;
