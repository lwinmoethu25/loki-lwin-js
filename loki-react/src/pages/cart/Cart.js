import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { addToCartAction, removeItemFromCartAction } from '../../store/actions/CartAction';
import * as cartConstant from '../../store/constants/CartConstant';
import { Select, Button, FormControl, makeStyles, MenuItem } from '@material-ui/core/';
import { interpolate } from '../../utils/string';
import * as routes from '../../store/constants/routes';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Cart = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const classes = useStyles();
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeItemFromCartAction(id));
  };

  const handleCheckout = () => {   
      Swal.fire({
      title: 'Loki',
      text: "Are you sure to checkout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, checkout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('cartItems');
        dispatch({
          type: cartConstant.CART_RESET,
        });
        Swal.fire(
          'Loki',
          'Success, thanks for ordering our pet.',
          'success'
        )
      }
    });
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {!cartItems.length ? (
          <>
            Your cart is empty <Link to={routes.HOME}>Go Back</Link>
          </>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <Image src={item.imageUrl} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={interpolate(routes.PET, {
                        id: item.id
                      })}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>RM {item.price}</Col>
                  <Col md={2}>
                  <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Qty"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCartAction(item.id, Number(e.target.value)))}
                      >
                        {[...Array(item.totalCount).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) pets</h2>RM 
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                fullWidth
                disabled={!cartItems.length}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
