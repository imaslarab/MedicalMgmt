import React, { Component } from 'react';

import AppointmentCard from '../../components/AppointmentCard';
import BillingInfoCard from '../../components/BillingInfoCard';
import DiagnosisCard from '../../components/DiagnosisCard';

import patientImg from '../../assets/images/patient.svg';

import PatientApi from '../../api/patient';
import AuthService from '../../services/AuthService';
import {utilService} from '../../services/UtilService';

import EditPatientModal from '../../components/modals/EditPatientModal';

class PProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            patient: {},
            isEditPatientModalOpen: false
        };

        this.openEditPatientModal = this.openEditPatientModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openEditPatientModal() {
        this.setState({isEditPatientModalOpen: true});
    }

    closeModal() {
        this.setState({isEditPatientModalOpen:false});
    }

    componentDidMount() {
        let patientId = AuthService.getUserId();
        PatientApi.getPatient(patientId, (response)=> {
            this.setState({...this.state, isLoading:false, patient:response});
        });
    }

    render() {
        let {isLoading, patient, isEditPatientModalOpen} = this.state;

        return (
            <div id="content">
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-2">
                            <img className="img-profile rounded-circle profile-img" src={patientImg} alt="" />
                        </div>
                        <div className="col-md-10 profile-detail">
                            <h1 className="h3 text-gray-800">{patient.patientName} 
                                <a href="#" className="btn btn-info btn-circle ml-2" onClick={this.openEditPatientModal}>
                                    <i className="fa fa-edit"></i>
                                </a>
                            </h1>
                            <p><strong>Patient ID: </strong>{patient.patientId}</p>
                            <p><span><strong>Date of Birth: </strong>{utilService.formatDateString(patient.dob)}</span>
                            <span><strong>Sex: </strong>{patient.sex}</span></p>
                            <p><strong>Phone number: </strong>{patient.phone}</p>
                            <p><strong>Address: </strong>{patient.address}</p>
                        </div>
                    </div>
                </div>
                <EditPatientModal patient={patient} doctor={null} isModalOpen={isEditPatientModalOpen} closeModal={this.closeModal}/>
            </div>
		);
	}
};

export default PProfile;