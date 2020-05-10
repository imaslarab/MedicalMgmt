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
                        <h6 className="m-0 font-weight-bold text-primary"><a href={`/a/doctor/${doctor.doctorId}`}>{doctor.doctorName}</a></h6>
                        <div>
                            <a href="#" className="btn btn-info btn-circle mr-2" onClick={this.props.openEditDoctorModal.bind(this, doctor)}>
                                <i className="fa fa-edit"></i>
                            </a>
                            <a href="#" className="btn btn-danger btn-circle" onClick={this.props.deleteDoctor.bind(this, doctor.doctorId)}>
                                <i className="fa fa-trash-o"></i>
                            </a>
                        </div>
                    </div>
                    <div className="card-body">
                        <p>Doctor Id: {doctor.doctorId}</p>
                        <p>Phone: {doctor.phone}</p>
                        <p>Specialization: {doctor.speciality}</p>
                    </div>
                </div>
            </div>
		);
	}
};

export default DoctorCard;