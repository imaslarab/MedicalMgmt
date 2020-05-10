import React, { Component } from 'react';

import {utilService} from '../services/UtilService';

class AppointmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: props.appointment
        };
    }

	render() {
        const {appointment} = this.state;
        let inactive = this.props.inactive;

        let time = utilService.formatTimeFromDate(appointment.appointDate);
        let date = utilService.formatDate(appointment.appointDate);

        let activeCardClass = inactive ? 'border-left-inactive' : 'border-left-info';
		return (
            <div className="col-xl-8 col-md-6 mb-4">
                <div className={`card shadow h-100 py-2 ${activeCardClass}`}>
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold ${inactive ? '' : 'text-success'} text-uppercase mb-1`}>Appointment {appointment.key}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">Date: {date}</div>
                                <div>Time: {time}</div>
                                {appointment.patientId ? <div>Patient: {appointment.patientId}</div> : null}
                                {appointment.doctorId ? <div>Doctor: {appointment.doctorId}</div> : null}
                            </div>
                            <div className="col-auto">
                                <i className="fa fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
};

export default AppointmentCard;