import React, { Component } from 'react';

import AppointmentCard from '../../components/AppointmentCard';
import AppointmentApi from '../../api/appointment';
import AuthService from '../../services/AuthService';

class PAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: AuthService.getUserId(),
            isLoading: false,
            appointments: [],
            past_appointments: []
        };
    }

    componentDidMount() {
        let {userId} = this.state;
        AppointmentApi.getAppointmentByPatient(userId, (response)=> {
            this.setState({...this.state, isLoading:false, appointments:response});
        });
    }

    render() {
        let {isLoading, appointments, past_appointments} = this.state;

        const cardsList = [];

        const pastCards = [];
        
        // // let patient = {patientId:1, patientName:"Sami Baral", age:25, sex:"Female", phoneNumber:'220922029', address:'Worcester, MA'};
        // appointments = [
        //     {appointmentId:21, date:"April 27, 2020", time:"5:30pm"},
        //     {appointmentId:22, date:"June 27, 2020", time:"4:00pm"},
        //     {appointmentId:23, date:"August 27, 2020", time:"3:30pm"}
        // ];

        past_appointments = [
            {appointmentId:11, appointDate:"03/27/2020"},
            {appointmentId:12, appointDate:"02/17/2020"},
            {appointmentId:13, appointDate:"12/9/2019"}
        ];

        if(appointments) {
            appointments.forEach((appointment) => {
                cardsList.push(<AppointmentCard key={appointment.appointmentId} appointment={appointment} {...this.props}></AppointmentCard>);
            });
        } else {
            cardsList.push(<span>No Upcoming Appointments</span>);
        }

        if(past_appointments) {
            past_appointments.forEach((appointment) => {
                pastCards.push(<AppointmentCard key={appointment.appointmentId} appointment={appointment} inactive={true} {...this.props}></AppointmentCard>);
            });
        }

        return (
            <div id="content">
                <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Upcoming Appointments</h1>
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    : <div className="row">{cardsList}</div>
                }
                <br></br>
                <h1 className="h3 mb-4 text-gray-800">Past Appointments</h1>
                <div className="row">{pastCards}</div>
                </div>
            </div>
		);
	}
};

export default PAppointment;