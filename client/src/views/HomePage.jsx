import React, { Component } from 'react';

import Card from '../components/Card';
import PatientApi from '../api/patient';

class HomePage extends Component {
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
                cardsList.push(<Card key={patient.patientId} patient={patient} {...this.props}></Card>);
            });
        }

        cardsList.push(<Card key={1} patient={null}></Card>);
        cardsList.push(<Card key={2} patient={null}></Card>);
        cardsList.push(<Card key={3} patient={null}></Card>);
        cardsList.push(<Card key={4} patient={null}></Card>);
        cardsList.push(<Card key={5} patient={null}></Card>);

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

export default HomePage;