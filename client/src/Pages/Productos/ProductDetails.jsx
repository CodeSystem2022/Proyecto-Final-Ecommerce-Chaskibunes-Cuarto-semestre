import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../reducer/cartReducer.js";
import "./ProductosDetails.css";
import products from "./Productsdetail.jsx";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams(); // Obtiene el id del producto de los parámetros de la URL
  const product = products.find((product) => product.id === productId); // Busca el producto por su id

  // Verifica si el producto existe
  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  // Maneja la función para agregar un producto al carrito
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} se ha agregado al carrito`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
    });// Muestra una notificación de éxito utilizando react-toastify
  };
  return (
    <Container className="product-details-container py-5">
      <Row className="product-details-row">
        <Col xs={12} md={5}>
          <Image
            src={product.image}
            alt={product.name}
            className="product-details-image"
          />
        </Col>
        <Col xs={12} md={7} className="product-details-content">
          <h2 className="product-details-title">{product.name}</h2>
          <p className="product-details-description">{product.description}</p>
          <p className="product-details-price">$ {product.price}</p>
          <Button
            variant="primary"
            className="product-details-button"
            onClick={() => handleAddToCart(product)}
          >
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default ProductDetails;
