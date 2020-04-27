import React, { Component } from 'react';

import AppointmentCard from '../components/AppointmentCard';
import AddAppointmentModal from '../components/modals/AddAppointmentModal';
// import PatientApi from '../api/patient';

class AppointmentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            appointments: [],
            isAddAppointmentModalOpen:false
        };
        this.openAddAppointmentModal = this.openAddAppointmentModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openAddAppointmentModal() {
        this.setState({isAddAppointmentModalOpen: true});
    }

    closeModal() {
        this.setState({isAddAppointmentModalOpen: false});
    }

    componentDidMount() {
        // PatientApi.listAllPatients((response)=> {
        //     this.setState({...this.state, isLoading:false, patients:response.patients});
        // });
    }

    render() {
        let {isLoading, appointments, isAddAppointmentModalOpen} = this.state;

        const cardsList = [];
        
        let patients = [
            {patientId:1, patientName:"Sami Baral", age:25, sex:"Female", phoneNumber:'220922029', address:'Worcester, MA'},
            {patientId:2, patientName:"Mickey Barber", age:15, sex:"Male", phoneNumber:'720822029', address:''},
            {patientId:3, patientName:"Donald Tomgato", age:21, sex:"Male", phoneNumber:'900208299', address:''},
            {patientId:4, patientName:"Sean Mars", age:50, sex:"Male", phoneNumber:'220192029', address:''},
            {patientId:5, patientName:"Adam Newton", age:35, sex:"Male", phoneNumber:'09111919', address:''},
            {patientId:6, patientName:"Monica Geller", age:40, sex:"Female", phoneNumber:'12302029', address:''},
            {patientId:7, patientName:"Rita Bing", age:50, sex:"Female", phoneNumber:'920922029', address:''},
        ];
        appointments = [
            {appointmentId:1, date:"April 27, 2020", time:"5:30pm", patient:patients[3]},
            {appointmentId:2, date:"April 27, 2020", time:"6:00pm", patient:patients[2]},
            {appointmentId:3, date:"April 27, 2020", time:"6:30pm", patient:patients[7]},
            {appointmentId:4, date:"April 28, 2020", time:"4:00pm", patient:patients[4]},
            {appointmentId:5, date:"May 1, 2020", time:"5:00pm", patient:patients[2]},
            {appointmentId:6, date:"May 3, 2020", time:"3:00pm", patient:patients[0]},
            {appointmentId:7, date:"May 25, 2020", time:"3:00pm", patient:patients[1]},
        ];
        if(appointments) {
            appointments.forEach((appointment) => {
                cardsList.push(<AppointmentCard key={appointment.appointmentId} patient={appointment.patient} appointment={appointment} {...this.props}></AppointmentCard>);
            });
        }

        return (
            <div id="content">
                <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">
                    Appointment List
                    <a href="#" onClick={this.openAddAppointmentModal} className="btn btn-primary ml-3"><i className="fa fa-plus"></i></a>
                    </h1>
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    : <div className="row">{cardsList}</div>
                }
                </div>
                <AddAppointmentModal isModalOpen={isAddAppointmentModalOpen} closeModal={this.closeModal} />
            </div>
		);
	}
};

export default AppointmentPage;