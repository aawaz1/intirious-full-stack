import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import "./cartScreen.css";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="cartScreen-wrapper">
      <div className="cartItems-wrapper">
        {/* heading */}
        <h1 style={{ margin: "20px 15px", fontFamily: "sans-serif" }}>
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="empty-msg">
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="one-item">
                <div className="cartItem-card">
                  {/* image */}
                  <div className="cartImage-wrapper">
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </div>

                  <div className="cartItem-info">
                    {/* item title */}
                    <div className="cartItem-title">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </div>

                    {/* item price */}
                    <div className="cartItem-price">&#8377;{item.price}</div>

                    {/* set the quantity */}
                    <div className="cartItem-qty">
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </div>

                    {/* delete button */}
                    <div className="cartItem-delete">
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="subtotal-wrapper">
          {/* subtotal info div */}
          <div className="subtotal-info-div">
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            <span>
            &#8377;
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
            </span>
            
          </div>

          {/* proceed to checkout button div */}
          <div className="checkout-btn-wrapper">
            <button
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to checkout
            </button>
          </div>
        
      </div>
    </div>
  );
};

export default CartScreen;