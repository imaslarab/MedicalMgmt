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
                        <h6 className="m-0 font-weight-bold text-primary">Patient 1</h6>
                    </div>
                    <div className="card-body">
                        <p>Patient Id: 123</p>
                        <p>Patient Name: Patient 1</p>
                        <p>Patient Age: 20</p>
                    </div>
                </div>
            </div>
		);
	}
};

export default PatientCard;