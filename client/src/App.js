import React, { Component } from 'react';

import './App.scss';

// Routing libraries
import { BrowserRouter as HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';

import Header from './components/Header';
import Footer from './components/Footer';
import MainSidebar from './components/MainSidebar';
import TopNavbar from './components/TopNavbar';

import Root from './views/Root';
import LoginPage from './views/LoginPage';

//doctor related routes
import PatientPage from './views/PatientPage';
import PatientProfilePage from './views/PatientProfilePage';
import AppointmentPage from './views/AppointmentPage';
import DoctorPage from './views/DoctorPage';

//patients related routes
import PAppointment from './views/patients/PAppointment';
import PProfile from './views/patients/PProfile';
import PDiagnosis from './views/patients/PDiagnosis';
import PBilling from './views/patients/PBilling';

import AuthService from './services/AuthService';

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
                    
                    <PrivateRoute exact path="/" component={Root}></PrivateRoute>

                    <PrivateRoute exact path="/p/appointments" component={PAppointment}></PrivateRoute>
                    <PrivateRoute exact path="/p/profile" component={PProfile}></PrivateRoute>
                    <PrivateRoute exact path="/p/diagnosis" component={PDiagnosis}></PrivateRoute>
                    <PrivateRoute exact path="/p/billings" component={PBilling}></PrivateRoute>

                    <PrivateRoute exact path="/d/patients" component={PatientPage}></PrivateRoute>
                    <PrivateRoute exact path="/d/patient/:patientId" component={PatientProfilePage}></PrivateRoute>
                    <PrivateRoute exact path="/d/appointments" component={AppointmentPage}></PrivateRoute>

                    <PrivateRoute exact path="/a/doctors" component={DoctorPage}></PrivateRoute>
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
            AuthService.isLoggedIn() ? (
                <div id="wrapper">
                    <MainSidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <TopNavbar />
                        <Component {...props} />
                        <Footer />
                    </div>
                </div>) : (
                <Redirect push to={{
                    pathname: "/login",
                    state: { from: props.location }
                }}/>
                )
        );
    }
}/>);

const PrivateDoctorRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {

        if(AuthService.isLoggedIn) {
            return (
                AuthService.getUserRole == 'doctor' || AuthService.getUserRole == 'admin' ? (
                    <div id="wrapper">
                        <MainSidebar/>
                        <div id="content-wrapper" className="d-flex flex-column">
                            <TopNavbar />
                            <Component {...props} />
                            <Footer />
                        </div>
                    </div>) : (
                        <Redirect push to={{pathname: "/p/appointments"}}/>
                    )
            );
        } else {
            return (
                <Redirect push to={{
                    pathname: "/login",
                    state: { from: props.location }
                }}/>
            );
        }
    }
}/>);


export default App;
