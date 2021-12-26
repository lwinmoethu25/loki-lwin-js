import React from 'react';
import { Link } from 'react-router-dom';
import { Card , Button } from 'react-bootstrap';
import * as routes from '../../store/constants/routes';
import { interpolate } from '../../utils/string';
import 'animate.css';

const Pet = props => {
  return (
    <Card className="my-3 p-3 rounded  animate__animated animate__fadeInUp">
      <Link to={interpolate(routes.PET, { id: props.pet.id })}>
        <Card.Img src={props.pet.imageUrl} variant="top" />
      </Link>

      <Card.Body>
        <Link to={interpolate(routes.PET, { id: props.pet.id })}>
          <Card.Title as="h4">
            <strong>{props.pet.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text className="mb-2">{props.pet.gender} | {props.pet.color}</Card.Text> 
        <Card.Text as="h5" style={{ color: 'red' }}  className="mb-3">RM {props.pet.price}</Card.Text>  
        <span className="float-right">
          <Button variant="danger" className="btn-sm" onClick={(e) => {
                props.onDelete(props.pet.id, e);
              }}>
            <i className="fas fa-trash"></i>
          </Button>
         </span>
      </Card.Body>
    </Card>
  );
};

export default Pet;
