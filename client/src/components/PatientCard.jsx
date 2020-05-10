import React, { Component } from 'react';

import { utilService } from '../services/UtilService';

class PatientCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: props.patient
        };
    }

	render() {
        let {patient} = this.state;
        patient.age = utilService.getAgeFromDob(patient.dob);

		return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary"><a href={`/d/patient/${patient.patientId}`}>{patient.patientName}</a></h6>
                        <div>
                            <a href="#" className="btn btn-info btn-circle mr-2" onClick={this.props.openEditPatientModal.bind(this, patient)}>
                                <i className="fa fa-edit"></i>
                            </a>
                            <a href="#" className="btn btn-danger btn-circle" onClick={this.props.deletePatient.bind(this, patient.patientId)}>
                                <i className="fa fa-trash-o"></i>
                            </a>
                        </div>
                    </div>
                    <div className="card-body">
                        <p>Patient Id: {patient.patientId}</p>
                        <p>Address: {patient.address}</p>
                        <p>Phone: {patient.phone}</p>
                        <p>Sex: {patient.sex}</p>
                        <p>Age: {patient.age}</p>
                    </div>
                </div>
            </div>
		);
	}
};

export default PatientCard;