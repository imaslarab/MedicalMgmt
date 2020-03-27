import React, { Component } from 'react';

import './App.scss';

// Routing libraries
import { BrowserRouter as HashRouter, Route, Switch } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';

import Header from './components/Header';

import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {rehydrated: false};
    }

    render() {
        return (
        <HttpsRedirect>
            <HashRouter>
              <Switch>
                  <PublicRoute exact path="/login" component={LoginPage}></PublicRoute>
                  
                  <PrivateRoute exact path="/" component={HomePage}></PrivateRoute>
                  {/* <PublicRoute exact path="/card/:cardId" component={CardPage}></PublicRoute>
                  <PublicRoute path="/recipient-view/:cardId/" component={RecipientCardPage}></PublicRoute> */}
              </Switch>
            </HashRouter>
        </HttpsRedirect>
        );
    }
}

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {

        return (
        <div className="App bg-gradient-primary">
            <Component {...props} />
        </div>
        );
    }
}/>);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {

      return (
        <div className="App">
          <Header />
          <div className="App__wrapper">
              <Component {...props} />
          </div>
        </div>
      );
  }
}/>);

export default App;
