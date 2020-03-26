import React, { Component } from 'react';

import './App.scss';

// Routing libraries
import { BrowserRouter as HashRouter, Route, Switch } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';

import Header from './components/Header';

import HomePage from './views/HomePage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {rehydrated: false};
    }

    render() {
        return (
        <HttpsRedirect>
            <HashRouter>
            <div className="App">
                <Header />
                <Switch>
                    <PublicRoute exact path="/" component={HomePage}></PublicRoute>
                    {/* <PublicRoute exact path="/card/:cardId" component={CardPage}></PublicRoute>
                    <PublicRoute path="/recipient-view/:cardId/" component={RecipientCardPage}></PublicRoute> */}
                </Switch>
            </div>
            </HashRouter>
        </HttpsRedirect>
        );
    }
}

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {

        return (
        <div className="App__wrapper">
            <Component {...props} />
        </div>
        );
    }
}/>);

export default App;
