import React, { Component } from 'react';

import './App.scss';

// Routing libraries
import { BrowserRouter as HashRouter, Route, Switch } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';

import Header from './components/Header';
import Footer from './components/Footer';
import MainSidebar from './components/MainSidebar';
import TopNavbar from './components/TopNavbar';

import PatientPage from './views/PatientPage';
import AppointmentPage from './views/AppointmentPage';
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
                    
                    <PrivateRoute exact path="/" component={PatientPage}></PrivateRoute>
                    <PrivateRoute exact path="/appointments" component={AppointmentPage}></PrivateRoute>
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
        <div id="wrapper">
            <MainSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <TopNavbar />
                <Component {...props} />
                <Footer />
            </div>
        </div>
        );
    }
}/>);

export default App;
