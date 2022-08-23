import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  About,
  Auth,
  Cart,
  Checkout,
  Error,
  Home,
  PrivateRoute,
  Products,
  SingleProduct,
} from './pages';

function App() {
  return (
    <Auth>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path='/' children={<Home />}></Route>
          <Route exact path='/about' children={<About />}></Route>
          <Route exact path='/cart' children={<Cart />}></Route>
          <PrivateRoute exact path='/checkout' children={<Checkout />} />
          <Route exact path='/products' children={<Products />}></Route>
          <Route
            exact
            path='/products/:id'
            children={<SingleProduct />}
          ></Route>
          <Route path='*' children={<Error />}></Route>
        </Switch>
        <Footer />
      </Router>
    </Auth>
  );
}

export default App;
