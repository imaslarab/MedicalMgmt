import React, { Component } from 'react';

import Form from '../components/Form';
import Input from '../components/Input';
import DropDown from '../components/DropDown';

import CONSTANTS from '../constants/constants';

import authService from '../services/AuthService';

class MainSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: authService.getUserRole()
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {userRole} = this.state;

        return(
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon">
                <i className="fa fa-hospital-o"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Main Dash</div>
            </a>
            <hr className="sidebar-divider my-0"/>

            <hr className="sidebar-divider my-0"/>
            { userRole == 'doctor' || userRole == 'admin' ? 
                <>
                    <li className="nav-item">
                        <a className="nav-link" href='/d/appointments'>
                        <i className="fa fa-calendar-o fa-fw"></i>
                        <span>Appointments</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/d/patients">
                        <i className="fa fa-users fa-fw"></i>
                        <span>Patients</span></a>
                    </li>
                </>
                : 
                <>
                    <li className="nav-item">
                        <a className="nav-link" href='/p/appointments'>
                        <i className="fa fa-calendar-o fa-fw"></i>
                        <span>Appointments</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/p/diagnosis">
                        <i className="fa fa-medkit fa-fw"></i>
                        <span>Diagnosis</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/p/billings">
                        <i className="fa fa-money fa-fw"></i>
                        <span>Billings</span></a>
                    </li>
                </> 
            } 

            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
        );
    }  
}

export default MainSidebar;