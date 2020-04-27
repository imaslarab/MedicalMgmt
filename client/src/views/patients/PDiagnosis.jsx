import React, { Component } from 'react';

import DiagnosisCard from '../../components/DiagnosisCard';
// import PatientApi from '../api/patient';

class PBilling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            diagnosis: [],
        };
    }

    componentDidMount() {
        // PatientApi.listAllPatients((response)=> {
        //     this.setState({...this.state, isLoading:false, patients:response.patients});
        // });
    }

    render() {
        let {isLoading, diagnosis} = this.state;

        const cardsList = [];

        
        let patient = {patientId:1, patientName:"Sami Baral", age:25, sex:"Female", phoneNumber:'220922029', address:'Worcester, MA'};
        diagnosis = [
            {diagnosisId: 23423, date:"Dec 20, 2019", details:"Common cold"},
            {diagnosisId: 20222, date:"Sept 11, 2019", details:"Fever, headache"}
        ];

        if(diagnosis) {
            diagnosis.forEach((diagnosis) => {
                cardsList.push(<DiagnosisCard key={diagnosis.diagnosisId} diagnosis={diagnosis} {...this.props}></DiagnosisCard>);
            });
        }

        return (
            <div id="content">
                <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Diagnosis Details</h1>
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    : <div className="row">{cardsList}</div>
                }
                </div>
            </div>
		);
	}
};

export default PBilling;