import React, { Component } from 'react';

class DiagnosisCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diagnosis: props.diagnosis
        };
    }

	render() {
        const {diagnosis} = this.state;

		return (
            <div className="col-xl-8 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Diagnosis {diagnosis.diagnosisId}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">Date: {diagnosis.date}</div>
                                <div>Details: {diagnosis.details}</div>
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

export default DiagnosisCard;