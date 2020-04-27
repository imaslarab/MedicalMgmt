import React, { Component } from 'react';

import AppointmentCard from '../components/AppointmentCard';
import BillingInfoCard from '../components/BillingInfoCard';
import DiagnosisCard from '../components/DiagnosisCard';

import PatientApi from '../api/patient';
import App from '../App';

import patientImg from '../assets/images/patient.svg';

class PatientProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            patients: [
                {patientId:1, patientName:"Sami Baral", age:25, sex:"Female", phoneNumber:'220922029', address:'Worcester, MA'},
                {patientId:"2", patientName:"Mickey Barber", age:15, sex:"Male", phoneNumber:'720822029', address:''},
                {patientId:"3", patientName:"Donald Tomgato", age:21, sex:"Male", phoneNumber:'900208299', address:''},
                {patientId:"4", patientName:"Sean Mars", age:50, sex:"Male", phoneNumber:'220192029', address:''},
                {patientId:"5", patientName:"Adam Newton", age:35, sex:"Male", phoneNumber:'09111919', address:''},
                {patientId:"6", patientName:"Monica Geller", age:40, sex:"Female", phoneNumber:'12302029', address:''},
                {patientId:"7", patientName:"Rita Bing", age:50, sex:"Female", phoneNumber:'920922029', address:''},
            ],
            patient: {},
            appointments: [
                {appointmentId:1, date:"April 27, 2020", time:"5:30pm", patient:null},
                {appointmentId:2, date:"May 20, 2020", time:"1:00pm", patient:null},
                {appointmentId:3, date:"May 25, 2020", time:"1:00pm", patient:null},
            ],
            billings: [
                {billingId: 201, date:"Dec 20, 2019", title:"Normal Checkup", amount:"$100"},
                {billingId: 101, date:"Nov 16, 2019", title:"Whole body checkup", amount:"$300"}
            ],
            diagnosisDetails: [
                {diagnosisId: 23423, date:"Dec 20, 2019", details:"Common cold"}
            ]
        };
    }

    componentDidMount() {
        const { patientId } = this.props.match.params;

        let {patients} = this.state;
        let currentPatient = patients.filter((obj) => obj.patientId==patientId )[0];
        this.setState({...this.state, patient:currentPatient});
        
        // PatientApi.listAllPatients((response)=> {
        //     this.setState({...this.state, isLoading:false, patients:response.patients});
        // });
    }

    render() {
        let {isLoading, patient, appointments, billings, diagnosisDetails} = this.state;
        let appointmentList = [], billingList = [], diagnosisList = [];
        if(appointments) {
            appointments.forEach((appointment) => {
                appointmentList.push(<AppointmentCard appointment={appointment}/>);
            });
        }
        if(billings) {
            billings.forEach((bill) => {
                billingList.push(<BillingInfoCard bill={bill}/>);
            });
        }

        if(diagnosisDetails) {
            diagnosisDetails.forEach((diagnosis) => {
                diagnosisList.push(<DiagnosisCard diagnosis={diagnosis}/>);
            });
        }

        return (
            <div id="content">
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-2">
                            <img className="img-profile rounded-circle profile-img" src={patientImg} alt="" />
                        </div>
                        <div className="col-md-10 profile-detail">
                            <h1 className="h3 text-gray-800">{patient.patientName}</h1>
                            <p>Patient ID: {patient.patientId}</p>
                            <p><span>Age: {patient.age}</span><span>Sex: {patient.sex}</span></p>
                            <p>Phone number: {patient.phone}</p>
                            <p>Address: {patient.address}</p>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-6 mb-5">
                            <h1 className="h3 text-gray-800">Appointments</h1>
                            <div className="row">
                                {appointmentList}
                            </div>
                        </div>
                        <div className="col-md-6 mb-5">
                            <div className="mb-5">
                                <h1 className="h3 text-gray-800">Diagnosis</h1>
                                <div className="row">
                                    {diagnosisList}
                                </div>
                            </div>
                            <div className="mb-5">
                                <h1 className="h3 text-gray-800">Billing Details</h1>
                                <div className="row">
                                    {billingList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
};

export default PatientProfilePage;