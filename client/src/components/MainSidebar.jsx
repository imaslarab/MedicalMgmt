import React, { Component } from 'react';

import Form from '../components/Form';
import Input from '../components/Input';
import DropDown from '../components/DropDown';

import CONSTANTS from '../constants/constants';

class MainSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: '',
            eventType: '',
            orientation: '',
            cards: props.cards,
            isDupilcateCardModalOpen: false,
            isShowImagesModalOpen: false,
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentWillReceiveProps({cards}) {
        this.setState({...this.state, cards})
    }

    render() {

        return(
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon">
                <i className="fa fa-user-md"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Main Dash</div>
            </a>
            <hr className="sidebar-divider my-0"/>
            <li className="nav-item">
                <a className="nav-link" href="/appointments">
                <i className="fa fa-fw fa-tachometer-alt"></i>
                <span>Appointments</span></a>
            </li>

            <hr className="sidebar-divider my-0"/>
            <li className="nav-item">
                <a className="nav-link" href="/patients">
                <i className="fa fa-fw fa-tachometer-alt"></i>
                <span>Patients</span></a>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
        );
    }  
}

export default MainSidebar;