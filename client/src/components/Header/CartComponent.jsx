import { faShoppingCart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"; // Importa el hook useState de React para gestionar el estado
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; // Importa funciones y selectores de Redux para el carrito y la autenticación del usuario
import { useNavigate } from "react-router-dom"; // Importa la función toast de react-toastify para mostrar notificaciones de tostadas
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* Importa acciones y selectores relacionados con el carrito y la autenticación del usuario desde el archivo "cartReducer.js" y
"userSlice.js" respectivamente*/
import {
  adjustQuantity,
  clearCart,
  closeCart,
  getTotalItemsInCart,
  getTotalPrice,
  removeFromCart,
} from "../../reducer/cartReducer.js";
import { selectIsAuthenticated } from "../../reducer/userSlice.js";
import "./NavbarStyles.css";

const Cart = () => {
  // Obtiene el estado del carrito y la autenticación del usuario desde Redux
  const cart = useSelector((state) => state.cart);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // Obtiene la función dispatch del store de Redux
  const dispatch = useDispatch();
  // Define un estado local para controlar la apertura y cierre del modal del carrito
  const [showCartModal, setShowCartModal] = useState(false);
  // Obtiene la función de navegación para redirigir a otras páginas
  const navigate = useNavigate();
  // Define una función para manejar el proceso de pago o redireccionamiento según el estado del carrito y la autenticación
  const handleCheckout = () => {
    if (cart.length === 0) {
      // Muestra el modal si el carrito está vacío
      setShowCartModal(true);
    } else {
      if (isAuthenticated) {
        // Redirige al usuario a la página de checkout si está autenticado y cierra el carrito
        setShowCartModal(false);
        navigate("/checkout");
        dispatch(closeCart());
      } else {
        // Redirige al usuario a la página de inicio de sesión si no está autenticado y cierra el carrito
        setShowCartModal(false);
        navigate("/login");
        dispatch(closeCart());
      }
    }
  };

  return (
    <>
      <div className="cart-icon" onClick={() => setShowCartModal(true)}>
        <FontAwesomeIcon icon={faShoppingCart} size="20" />
        <span className="cart-count">{getTotalItemsInCart(cart)}</span>
      </div>

      <Modal show={showCartModal} onHide={() => setShowCartModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              {cart.map((product) => (
                <div key={product.id} className="cart-item">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-icon-img"
                  />
                  <div className="cart-item-details">
                    <h5>{product.name}</h5>
                    <p>Precio: ${product.price}</p>
                    <div className="quantity">
                      <button
                        onClick={() => {
                          if (product.quantity > 1) {
                            dispatch(
                              adjustQuantity({ id: product.id, change: -1 })
                            );
                          } else {
                            toast.info(
                              `¡${product.name} ha sido eliminado del carrito!`,
                              {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: true,
                              }
                            );
                            dispatch(removeFromCart(product.id));
                          }
                        }}
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            adjustQuantity({ id: product.id, change: 1 })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="remove-icon"
                      onClick={() => {
                        dispatch(removeFromCart(product.id));
                        toast.info(
                          `¡${product.name} ha sido eliminado del carrito!`,
                          {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                          }
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="total-price">
                <h5>Total: ${getTotalPrice(cart)}</h5>
              </div>
            </>
          )}
        </Modal.Body>
        {cart.length > 0 && (
          <Modal.Footer className="nav-content-model">
            <Button
              onClick={() => {
                dispatch(clearCart());
                toast.info("¡El carrito se ha vaciado!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                });
              }}
              variant="primary"
              size="lg"
              className="clean-button"
            >
              Vaciar Carrito
            </Button>
            <Button
              onClick={handleCheckout}
              variant="primary"
              size="lg"
              className="buy-button"
            >
              Finalizar Compra
            </Button>
            <Button
              onClick={() => setShowCartModal(false)}
              variant="primary"
              size="lg"
              className="clear-button"
            >
              Cerrar
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default Cart;
