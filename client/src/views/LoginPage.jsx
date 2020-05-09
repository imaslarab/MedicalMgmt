import React, { Component } from 'react';

import authService from '../services/AuthService';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            error: false,
            errorMessage: '',
            email: '',
            password: '',
        };

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleShowPasswordChange = this.handleShowPasswordChange.bind(this);
    }

    handleChange(e) {
        let currentState = this.state;
        currentState.errorMessage = " ";
        currentState[e.target.name]= e.target.value;
        this.setState(currentState);
    }

    handleShowPasswordChange() {
        let showPassword = this.state.showPassword;
        this.setState({showPassword: !showPassword});
    }

    login() {
        let {email, password} = this.state;

        if(!email || !password) {
            this.setState({error:true, errorMessage:"Invalid email or password"});
            return;
        }

        authService.login(email, password);

        window.setInterval(() => {
            if(!authService.isLoggedIn()) {
                this.setState({error:true, errorMessage:"Invalid email or password"});
            } else {
                this.setState({error:false, errorMessage:""});
            }
        }, 500);
    }


    render() {
        let {showPassword, error, errorMessage, email, password} = this.state;

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-7 col-md-4">
                        <div className="card o-hidden border-0 shadow-lg my-8">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input name="email" type="email" 
                                                        value={email} className="form-control form-control-user" 
                                                        id="exampleInputEmail" aria-describedby="emailHelp" 
                                                        onChange={this.handleChange}
                                                        placeholder="Enter Email Address..." />
                                                </div>
                                                <div className="form-group">
                                                    <input type={showPassword? "text" : "password"} 
                                                        name="password"
                                                        value={password} className="form-control form-control-user" 
                                                        id="exampleInputPassword" placeholder="Password" 
                                                        onChange={this.handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <span className="error-text text-xs">
                                                        {error? errorMessage : ''}
                                                    </span>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" 
                                                        id="showPassword" checked={showPassword} onChange={this.handleShowPasswordChange} />
                                                        <label className="custom-control-label" htmlFor="showPassword">Show Password</label>
                                                    </div>
                                                </div>
                                                <a className="btn btn-primary btn-user btn-block" onClick={this.login}>
                                                Login
                                                </a>
                                            </form>
                                            <hr></hr>
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" href="register.html">Create an Account!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
};

export default LoginPage;