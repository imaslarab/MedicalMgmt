import React, { Component } from 'react';

class Header extends Component {

	render() {
		return (
		<header className="Header">
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<div className="container">
				<a className="navbar-brand" href="/">Medical Management System</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarResponsive">
					<ul className="navbar-nav ml-auto">
					<li className="nav-item active">
						<a className="nav-link" href="/">Home
						<span className="sr-only">(current)</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/about">About</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/contact">Contact</a>
					</li>
					</ul>
				</div>
				</div>
			</nav>
		</header>
		);
	}
};

export default Header;