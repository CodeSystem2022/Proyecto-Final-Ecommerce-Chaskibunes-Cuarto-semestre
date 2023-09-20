import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterBar from "../../components/Filter/Filter";
import "../../components/Productos/ProductoStyle.css";
import { setActiveFilter } from "../../reducer/FilterSlice";
import { addToCart } from "../../reducer/cartReducer.js";
import products from "./Products";

const Producto = () => {
  const activeFilter = useSelector((state) => state.filter.activeFilter);
  const dispatch = useDispatch();

  // Filtra los productos según el filtro activo
  const filteredProducts = products.filter(
    (product) => activeFilter === "all" || product.category === activeFilter
  );
  // Determina la clase de columna (Bootstrap) en función del filtro activo
  const getColumnClassName = (filter) => {
    return filter === "all" ? "col-lg-4" : "col-lg-11, col-sm-11";
  };
  // Maneja la función para agregar un producto al carrito
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} se ha agregado al carrito`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };
  return (
    <Container id="productos" className="py-5 main-content">
      <h2 className="text-center mb-4">Nuestros Productos</h2>
      <FilterBar applyFilters={(filter) => dispatch(setActiveFilter(filter))} />
      <Row>
        {filteredProducts.map((product) => (
          <Col
            key={product.id}
            xs={12}
            sm={7}
            className={getColumnClassName(activeFilter)}
          >
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

                <Link to={`/productos/${product.id}`}>
                  <Button className="btn" variant="primary">
                    Más información
                  </Button>
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
