import React, { Component } from 'react';

import AppointmentCard from '../components/AppointmentCard';
// import PatientApi from '../api/patient';

class AppointmentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            appointments: []
        };
    }

    componentDidMount() {
        // PatientApi.listAllPatients((response)=> {
        //     this.setState({...this.state, isLoading:false, patients:response.patients});
        // });
    }

    render() {
        let {isLoading, appointments} = this.state;

        const cardsList = [];

        if(appointments) {
            appointments.forEach((appointment) => {
                cardsList.push(<AppointmentCard key={appointment.appointmentId} appointment={appointment} {...this.props}></AppointmentCard>);
            });
        }

        cardsList.push(<AppointmentCard key={1} patient={null}></AppointmentCard>);
        cardsList.push(<AppointmentCard key={2} patient={null}></AppointmentCard>);
        cardsList.push(<AppointmentCard key={3} patient={null}></AppointmentCard>);
        cardsList.push(<AppointmentCard key={4} patient={null}></AppointmentCard>);
        cardsList.push(<AppointmentCard key={5} patient={null}></AppointmentCard>);

        return (
            <div id="content">
                <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Appointment List</h1>
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    :
                    cardsList
                }
                </div>
            </div>
		);
	}
};

export default AppointmentPage;