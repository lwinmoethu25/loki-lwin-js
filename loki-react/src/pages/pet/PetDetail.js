import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import ErrorMessage from '../../components/message/ErrorMessage';
import { Select, Button, FormControl, makeStyles, MenuItem } from '@material-ui/core/';
import * as petAction from '../../store/actions/PetAction';
import SinglePageLoader from '../../components/loader/SinglePageLoader';
import { addToCartAction }  from '../../store/actions/CartAction';
import * as routes from '../../store/constants/routes';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 85,
    top: -17,
    left: 6,
    position: 'absolute',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const PetDetail = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const petDetail = useSelector((state) => state.pet);
  const { loading, pet, error } = petDetail;

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(petAction.petAction(match.params.id));
    // eslint-disable-next-line
  }, [dispatch, match]);

  const addToCartHandler = () => {
    dispatch(addToCartAction(match.params.id, qty));
    history.push(routes.CART);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to={routes.HOME}>
        Go Back
      </Link>
      {loading ? (
        <SinglePageLoader />
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={pet.imageUrl} alt={pet.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{pet.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Price: RM {pet.price}</ListGroup.Item>
                <ListGroup.Item>Gender: {pet.gender}</ListGroup.Item>
                <ListGroup.Item>Age: {pet.age}</ListGroup.Item>
                <ListGroup.Item>Size: {pet.size}</ListGroup.Item>
                <ListGroup.Item>Color: {pet.color}</ListGroup.Item>
                <ListGroup.Item>Description: {pet.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>RM {pet.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl className={classes.formControl}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              onChange={(e) => setQty(e.target.value)}
                              label="Qty"
                              value={qty}
                            >
                              {[...Array(pet.totalCount).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addToCartHandler}
                      fullWidth
                      disabled={!pet.totalCount}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default PetDetail;
