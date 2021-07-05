import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import authService from "../services/AuthService";

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: authService.getUserRole()
        }
    }

    render() {
        const {userRole} = this.state;

        let rootPath = '/p/appointments';
        if(userRole == 'admin' || userRole == 'doctor') {
            rootPath = '/d/patients';
        }

        return <Redirect push to={{pathname:rootPath, search:this.props.location.search}}/>
    }
}

export default Root;