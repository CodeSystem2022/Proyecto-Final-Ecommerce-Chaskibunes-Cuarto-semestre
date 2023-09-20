import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STRIPE_PUBLIC_KEY } from "../../config/config.js";
import { clearCart, getTotalPrice } from "../../reducer/cartReducer.js";
import { selectIsAuthenticated } from "../../reducer/userSlice.js";
import "./checkoutPageStyle.css";
// Carga la clave pública de Stripe para inicializar la integración
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

function CheckoutPage() {
  //Iniciamos useStripe y useElements
  const stripe = useStripe();
  const elements = useElements();

  // Seleccione los elementos del carrito desde Redux
  const cartItems = useSelector((state) => state.cart);
  const totalPrice = getTotalPrice(cartItems);

  // Verifica si el usuario está autenticado
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Muestra mensajes de éxito y error
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Controla la visualización del botón de "Cargando"
  const [loading, setLoading] = useState(false);

  // Almacena los datos de la orden (nombre, apellido, correo, dirección, teléfono y carrito de compras)
  const [orderData, setOrderData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    shippingAddress: "",
    phone: "",
    cart: cartItems,
  });

  // Redirige al usuario si no está autenticado
  if (!isAuthenticated) {
    navigate("/inicio");
    return;
  }
  // Maneja cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };
  // Maneja el proceso de pago
  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setLoading(true);

    // Valida que todos los campos obligatorios estén llenos
    if (
      !orderData.firstName ||
      !orderData.lastName ||
      !orderData.email ||
      !orderData.shippingAddress ||
      !orderData.phone
    ) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    // Crea un cliente de Stripe y obtiene un token de tarjeta
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
      setErrorMessage(
        "Hubo un problema al procesar su tarjeta. Por favor, inténtelo de nuevo."
      );
      setLoading(false);
    } else {
      // Datos de la orden
      const order = {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        email: orderData.email,
        shippingAddress: orderData.shippingAddress,
        phone: orderData.phone,
        stripeTokenId: token.id,
        totalAmount: totalPrice,
        cart: cartItems,
      };

      // Enviar los datos de la orden al backend para su procesamiento
      try {
        const response = await fetch("http://localhost:3000/procesar_pago", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Mostrar mensaje de éxito
            setSuccessMessage(
              "¡Pago exitoso! Redirigiendo a la página de confirmación..."
            );

            // Redirige al usuario a la página de confirmación y lo deja por 5 segundos
            setTimeout(() => {
              navigate(data.confirmationUrl);
            }, 5000);

            // Limpia el carrito después de 10 segundos
            setTimeout(() => {
              dispatch(clearCart());
              navigate("/inicio");
            }, 10000);
          }
        }
      } catch (error) {
        setErrorMessage("Hubo un problema al procesar su pedido.");
      }
    }
  };
  const cardStyle = {
    base: {
      fontSize: "16px",
      fontFamily: '"Poppins", sans-serif',
      marginBottom: "25px",
    },
  };
  return (
    <Container className="pay-container">
      <Row>
        <Col md={6} className="mb-3">
          <div>
            {/* Lista de productos en el carrito */}
            <Card>
              <Card.Header className="text-center">
                Productos Seleccionados
              </Card.Header>
              <Card.Body>
                {cartItems.map((product) => (
                  <div key={product.id} className="mb-3">
                    <Row className="align-items-center">
                      <Col sm={4}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="img-fluid"
                        />
                      </Col>
                      <Col sm={8}>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>Cantidad: {product.quantity}</Card.Text>
                        <Card.Text>
                          Subtotal: ${product.quantity * product.price}
                        </Card.Text>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Card.Body>
              <Card.Footer className="text-center">
                <strong>Total: ${totalPrice}</strong>
              </Card.Footer>
            </Card>
          </div>
        </Col>
        <Col md={6}>
          <div className="div-form">
            <Form onSubmit={handlePayment} className="btn-form">
              <h2 className="text-center">Checkout</h2>
              {/* Campos del formulario */}
              <Form.Group>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={orderData.firstName}
                  onChange={handleInputChange}
                  placeholder="Ingrese su nombre"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellido:</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={orderData.lastName}
                  onChange={handleInputChange}
                  placeholder="Ingrese su apellido"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={orderData.email}
                  onChange={handleInputChange}
                  placeholder="Ingrese su correo electrónico"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Dirección de Envío:</Form.Label>
                <Form.Control
                  type="text"
                  name="shippingAddress"
                  value={orderData.shippingAddress}
                  onChange={handleInputChange}
                  placeholder="Ingrese su dirección de envío"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Teléfono:</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  placeholder="Ingrese su número de teléfono"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Información de Tarjeta:</Form.Label>
                <CardElement
                  options={{
                    style: cardStyle,
                    hidePostalCode: true,
                  }}
                  placeholder="Ingrese los detalles de su tarjeta"
                />
              </Form.Group>
              {successMessage && (
                <Alert variant="dark" className="mt-3 text-bg-dark">
                  {successMessage}
                </Alert>
              )}
              {errorMessage && (
                <Alert variant="dark" className="mt-3 text-bg-dark">
                  {errorMessage}
                </Alert>
              )}
              <Button
                variant="primary"
                type="submit"
                className="button-submit"
                disabled={loading} // Desactivar el botón cuando está cargando
              >
                {loading ? (
                  <>
                    Cargando... <Spinner animation="border" size="sm" />
                  </>
                ) : (
                  "Pagar"
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default function StripeCheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
