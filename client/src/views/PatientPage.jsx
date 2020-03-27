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

        patients = [
            {patientId:1, name:"John Trump", age:28},
            {patientId:2, name:"Mickey Barber", age:15},
            {patientId:3, name:"Donald Tomgato", age:21},
            {patientId:4, name:"Sean Mars", age:50},
            {patientId:5, name:"Adam Newton", age:35},
            {patientId:6, name:"Monica Geller", age:40},
            {patientId:7, name:"Chandler Bing", age:50},
        ];

        if(patients) {
            patients.forEach((patient) => {
                cardsList.push(<PatientCard key={patient.patientId} patient={patient} {...this.props}></PatientCard>);
            });
        }

        return (
            <div id="content">
                <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Patient List</h1>
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    :
                    <div className="row">
                        {cardsList}
                    </div>
                }
                </div>
            </div>
		);
	}
};

export default PatientPage;