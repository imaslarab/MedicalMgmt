import React, { Component } from 'react';

class DoctorCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: props.doctor
        };
    }

	render() {
        const {doctor} = this.state;

		return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary"><a href={`/a/doctor/${doctor.doctorId}`}>{doctor.name}</a></h6>
                        <div>
                            <a href="#" className="btn btn-info btn-circle mr-2">
                                <i className="fa fa-edit"></i>
                            </a>
                            <a href="#" className="btn btn-danger btn-circle">
                                <i className="fa fa-trash-o"></i>
                            </a>
                        </div>
                    </div>
                    <div className="card-body">
                        <p>Doctor Id: {doctor.doctorId}</p>
                        <p>Doctor Name: {doctor.name}</p>
                        <p>Phone: {doctor.phoneNumber}</p>
                        <p>Specialization: {doctor.speciality}</p>
                    </div>
                </div>
            </div>
		);
	}
};

export default DoctorCard;