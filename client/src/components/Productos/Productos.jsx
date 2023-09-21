import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../reducer/cartReducer.js";
import "./ProductoStyle.css";
import products from "./Products";

const Producto = () => {
  const dispatch = useDispatch();
  // Función para desplazarse al inicio de la página y cerrar la barra de navegación en dispositivos móviles
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".navbar").click();
  };
  // Función para agregar un producto al carrito de compras y mostrar una notificación de éxito
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} se ha agregado al carrito`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  return (
    <Container id="productos" className="py-5">
      <h2 className="text-center mb-4">Productos destacados</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={7} lg={4}>
            <Card className="mb-4 product-card">
              <Card.Img
                variant="top"
                src={product.image}
                className="product-image"
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>$ {product.price}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al carrito
                </Button>
                <Link to={`/productos/${product.id}`} onClick={handleHomeClick}>
                  <Button variant="primary">Más información</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Producto;
