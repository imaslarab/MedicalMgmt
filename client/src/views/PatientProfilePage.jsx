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
            patient: {
                patientId:1, name:"John Trump", age:28, sex:"Male",
                phone:900999292,
                address: "192 Institute Road, Worcester MA"
            },
            appointments: [
                {appointmentId:1, date:"March 27, 2020", time:"3:00pm", patient:null},
                {appointmentId:2, date:"April 27, 2020", time:"1:00pm", patient:null},
                {appointmentId:3, date:"April 28, 2020", time:"1:00pm", patient:null},
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
        PatientApi.listAllPatients((response)=> {
            this.setState({...this.state, isLoading:false, patients:response.patients});
        });
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
                            <h1 className="h3 text-gray-800">{patient.name}</h1>
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