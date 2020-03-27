import React, { Component } from 'react';

class AppointmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: props.appointment
        };
    }

	render() {
        const {appointment} = this.state;
		return (
            <div className="row">
                <div className="col-xl-8 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Appointment 1</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">Date: March 27, 2020</div>
                                    <div>Time: 3:00 pm</div>
                                    <div>Patient: Test Patient</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 mb-4"></div>
            </div>
		);
	}
};

export default AppointmentCard;