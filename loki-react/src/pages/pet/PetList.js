import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Modal, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as petAction from '../../store/actions/PetAction';
import * as petConstant from '../../store/constants/PetConstant';
import Pet from '../../components/pet/Pet';
import ErrorMessage from '../../components/message/ErrorMessage';
import HomeLoader from '../../components/loader/HomeLoader';
import Meta from '../../components/meta/Meta';
import * as routes from '../../store/constants/routes';
import Swal from 'sweetalert2';
import {
  Button as MaterialButton,
  TextField,
  CircularProgress,
  makeStyles,
} from '@material-ui/core/';
import { confirmAlert } from 'react-confirm-alert';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 330,
    top: 6,
    left: -4,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: '#fff',
  },
}));

const PetList = () => {
  const [sort, setSort] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [ltORgt, setLtORgt] = useState('');
  const [filters, setFilters] = useState({});

  const [initialLoading, setInitialLoading] = useState(true);

  // Get Pet List
  const listPets = useSelector((state) => state.listPets);
  const { loading, pets, error, success } = listPets;

  // Create Pet List
  const createPet = useSelector((state) => state.createPet);
  const { success: createSuccess, error: createFail, loading: createLoading } = createPet;

  // Delete Pet List
  const deletePet = useSelector((state) => state.deletePet);
  const { success: deleteSuccess, error: deleteFail } = deletePet;

  // Filter Pets
  const queryParams = new URLSearchParams(window.location.search);
  const searchPet = queryParams.get('search') ? queryParams.get('search').trim() : '';

  const classes = useStyles();

  const [openForm, setOpenForm] = useState(false);

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('http://placekitten.com/200/200');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    if (createSuccess) {
      setOpenForm(false);
      setName('');
      setDescription('');
      setTotalCount(1);
      setGender();
      setAge('');
      setSize('');
      setColor('');
      setPrice('');

      dispatch({ type: petConstant.CREATE_PET_RESET });
      Swal.fire(
        'Loki',
        'Pet has been created.',
        'success'
      )
    }
    fetchPetList();

    // eslint-disable-next-line
  }, [dispatch, deleteSuccess, createSuccess]);

  const dispatch = useDispatch();

  const handleFilters = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    } else {
      fetchPetList();
    }
    // eslint-disable-next-line
  }, [dispatch, filters, success]);

  useEffect(() => {
    handleFilters('keyWord', searchPet);
    // eslint-disable-next-line
  }, [searchPet]);

  useEffect(() => {
    handleFilters('sort', sort.join(','));
    // eslint-disable-next-line
  }, [sort]);

  const fetchPetList = () => {
    dispatch(
      petAction.petListAction(
        {
          ...filters,
        },
        initialLoading
      )
    );
  };

  const handleSort = (value) => {
    sort.includes(value) ? setSort(sort.filter((s) => s !== value)) : setSort((preState) => [...preState, value]);
  };

  const handlePriceRange = () => {
    if ([priceRange, ltORgt].includes('')) {
      return;
    }
    filterPrevPrice();
    handleFilters(`price[${ltORgt}]`, priceRange);
  };

  const filterPrevPrice = () => {
    const filterprice = Object.keys(filters).filter((price) => ['price[lt]', 'price[gte]'].includes(price));
    filterprice.forEach((price) => {
      if (filters[price]) {
        delete filters[price];
      }
    });
  };

  const cancelCreatePet = () => {
    setOpenForm(false);
  };

  const createPetHandler = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      description === '' ||
      imageUrl === '' ||
      totalCount === 0 ||
      gender === '' ||
      age === '' ||
      size === '' ||
      color === '' ||
      price === ''
    ) {
      return;
    }

    const formData = {
      name: name,
      description: description,
      imageUrl: imageUrl,
      totalCount: totalCount,
      gender: gender,
      age: age,
      size: size,
      color: color,
      price: price
    }
    dispatch(petAction.createPetAction(formData));
  };

  const deletePetHandler = (id, e) => {
    e.preventDefault(); 
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(petAction.deletePetAction(id)) 
        Swal.fire(
          'Loki',
          'Pet has been deleted.',
          'success'
        )
      }
    });
  };

  const createNewPetHandler = () => {
    if (openForm) {
      return (
        <>
          <Modal show={openForm} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">Create Pet</Modal.Title>
            </Modal.Header>
            {createFail && (
              <ErrorMessage
                header="Something went wrong"
                message={createFail}
                reset={petConstant.CREATE_PET_RESET}
              />
            )}
            <Form onSubmit={createPetHandler}>
              <Modal.Body className="show-grid">
                <Container>
                  <Row>
                    <Col xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        autoFocus
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Col>
                  </Row>
  
                  <Row>
                    <Col xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        type="number"
                        margin="normal"
                        required
                        fullWidth
                        id="totalCount"
                        label="Total Count"
                        name="totalCount"
                        autoComplete="totalCount"
                        autoFocus
                        value={totalCount}
                        onChange={(e) => setTotalCount(Number(e.target.value))}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="gender"
                        label="Gender"
                        name="gender"
                        autoComplete="gender"
                        autoFocus
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </Col>
                  </Row>
  
                  <Row>
                    <Col xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="age"
                        label="Age"
                        name="age"
                        autoComplete="age"
                        autoFocus
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="size"
                        label="Size"
                        name="size"
                        autoComplete="size"
                        autoFocus
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="color"
                        label="Color"
                        name="color"
                        autoComplete="color"
                        autoFocus
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        name="price"
                        autoComplete="price"
                        autoFocus
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <MaterialButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="mr-2"
                  disabled={createLoading}
                >
                  {createLoading ? <CircularProgress color="inherit" className={classes.prgressColor} /> : <>Submit</>}
                </MaterialButton>{' '}
                <MaterialButton variant="contained" color="primary" onClick={cancelCreatePet}>
                  Close
                </MaterialButton>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      );
    }
  };

  return (
    <>
      <Meta />
      {loading ? (
        <HomeLoader />
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          {searchPet ? (
            <>
              <Link to={routes.HOME} className="btn btn-light">
                Go Back
              </Link>
              <h1>
                Search Pets for {searchPet}({pets.length})
              </h1>
            </>
          ) : (
            <div className="clearfix">
              <span className="float-left">
                <h1>Pets</h1>
              </span>
              <span className="float-right">
                <MaterialButton variant="contained" color="primary" onClick={() => setOpenForm(true)}>
                  <i className="fas fa-plus mr-2"></i> Create Pet
                </MaterialButton>
              </span>
            </div>
            
          )}
          <div className="container">
            {!pets.length && <h4>No Pet Found</h4>}
            <Row>
              {pets.map((pet) => (
                <Col key={pet.id} sm={12} md={6} lg={4} xl={3}>
                  <Pet pet={pet} onDelete={deletePetHandler}/>
                </Col>
              ))}
            </Row>
          </div>
         
        </>
      )}
      {createNewPetHandler()}
    </>
  );
};

export default PetList;
