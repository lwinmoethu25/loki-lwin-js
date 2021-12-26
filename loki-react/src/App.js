import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/header/index';
import Footer from './components/footer/index';
import * as routes from './store/constants/routes';
import PetList from 'pages/pet/PetList';
import SignIn from 'pages/auth/signIn/SignIn';
import Cart from 'pages/cart/Cart';
import PetDetail from 'pages/pet/PetDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact={true} path={routes.HOME} component={PetList} />
            <Route exact={true} path={routes.PET} component={PetDetail} />
            <Route exact={true} path={routes.CART} component={Cart} />
            <Route exact={true} path={routes.SIGNIN} component={SignIn} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
