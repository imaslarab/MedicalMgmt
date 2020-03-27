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
        
        let patients = [
            {patientId:1, name:"John Trump", age:28},
            {patientId:2, name:"Mickey Barber", age:15},
            {patientId:3, name:"Donald Tomgato", age:21},
            {patientId:4, name:"Sean Mars", age:50},
            {patientId:5, name:"Adam Newton"}
        ];
        appointments = [
            {appointmentId:1, date:"March 27, 200", time:"3:00pm", patient:patients[0]},
            {appointmentId:2, date:"March 27, 200", time:"4:00pm", patient:patients[1]},
            {appointmentId:3, date:"March 27, 200", time:"5:00pm", patient:patients[2]},
            {appointmentId:4, date:"March 28, 200", time:"3:00pm", patient:patients[3]},
            {appointmentId:5, date:"March 29, 200", time:"3:00pm", patient:patients[4]},
        ];
        if(appointments) {
            appointments.forEach((appointment) => {
                cardsList.push(<AppointmentCard key={appointment.appointmentId} appointment={appointment} {...this.props}></AppointmentCard>);
            });
        }

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