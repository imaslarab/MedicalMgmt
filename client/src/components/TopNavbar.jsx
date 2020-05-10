import React, { Component } from 'react';
import adminImg from '../assets/images/admin.png';
import doctorImg from '../assets/images/doctor.svg';
import patientImg from '../assets/images/patient.svg';

import authService from '../services/AuthService';

class TopNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: '',
            user: {}
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        authService.logout();
        window.location.href = '/login';
    }

    componentDidMount() {
        this.setState({userRole: authService.getUserRole(), user: authService.getUserDetail()});
    }

    render() {
        let {userRole, user} = this.state;

        let loginDetails = {
            name: userRole == 'doctor' ? 'Dr. ' + user.name : user.name,
            profileIcon: null
        }

        if(userRole == 'doctor') {
            loginDetails.profileIcon = doctorImg;
        } else if (userRole == 'admin') {
            loginDetails.profileIcon = adminImg;
        } else {
            loginDetails.profileIcon = patientImg;
        }

        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fa fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-search fa-fw"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fa fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <div className="topbar-divider d-none d-sm-block"></div>
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{loginDetails.name}</span>
                            <img className="img-profile rounded-circle" src={loginDetails.profileIcon} alt="" />
                        </a>

                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a className="dropdown-item" href={userRole =='doctor' || userRole == 'admin' ? '/' : '/p/profile'}>
                                <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </a>
                            {/* <a className="dropdown-item" href="#">
                                <i className="fa fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                Settings
                            </a> */}
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick={this.logout}>
                                <i className="fa fa-sign-out fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>

            </nav>
        );
    }
}

export default TopNavbar;