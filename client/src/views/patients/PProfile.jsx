import React, { Component } from 'react';

import AppointmentCard from '../../components/AppointmentCard';
import BillingInfoCard from '../../components/BillingInfoCard';
import DiagnosisCard from '../../components/DiagnosisCard';

import PatientApi from '../../api/patient';
import App from '../../App';

import patientImg from '../../assets/images/patient.svg';

class PProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            patient: {
                patientId:1, patientName:"Sami Baral", age:25, sex:"Female",
                phone:'220922029',
                address: "Worcester MA"
            }
        };
    }

    componentDidMount() {
    }

    render() {
        let {isLoading, patient} = this.state;

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
                </div>
            </div>
		);
	}
};

export default PProfile;