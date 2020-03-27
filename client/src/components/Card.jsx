import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.key,
            patient: props.patient
        };
    }

	render() {
        const {patient} = this.state;
		return (
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Patient 1</h6>
                    </div>
                    <div class="card-body">
                        <p>Patient Id: 123</p>
                        <p>Patient Name: Patient 1</p>
                        <p>Patient Age: 20</p>
                    </div>
                </div>
            </div>
		);
	}
};

export default Card;