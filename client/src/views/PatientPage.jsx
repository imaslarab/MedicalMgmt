import React, { Component } from 'react';

import PatientCard from '../components/PatientCard';
import PatientApi from '../api/patient';

class PatientPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            patients: []
        };
    }

    componentDidMount() {
        PatientApi.listAllPatients((response)=> {
            this.setState({...this.state, isLoading:false, patients:response.patients});
        });
    }

    render() {
        let {isLoading, patients} = this.state;

        const cardsList = [];

        if(patients) {
            patients.forEach((patient) => {
                cardsList.push(<PatientCard key={patient.patientId} patient={patient} {...this.props}></PatientCard>);
            });
        }

        cardsList.push(<PatientCard key={1} patient={null}></PatientCard>);
        cardsList.push(<PatientCard key={2} patient={null}></PatientCard>);
        cardsList.push(<PatientCard key={3} patient={null}></PatientCard>);
        cardsList.push(<PatientCard key={4} patient={null}></PatientCard>);
        cardsList.push(<PatientCard key={5} patient={null}></PatientCard>);

        return (
            <div id="content">
                <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Patient List</h1>
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    :
                    <div class="row">
                        {cardsList}
                    </div>
                }
                </div>
            </div>
		);
	}
};

export default PatientPage;