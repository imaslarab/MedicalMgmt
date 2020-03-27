import React, { Component } from 'react';

class PatientCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: props.patient
        };
    }

	render() {
        const {patient} = this.state;

		return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">{patient.name}</h6>
                    </div>
                    <div className="card-body">
                        <p>Patient Id: {patient.patientId}</p>
                        <p>Patient Name: {patient.name}</p>
                        <p>Patient Age: {patient.age}</p>
                    </div>
                </div>
            </div>
		);
	}
};

export default PatientCard;