import React, { Component } from 'react';

import { utilService } from '../services/UtilService';

import PatientCard from '../components/PatientCard';
import PatientApi from '../api/patient';

import AddPatientModal from '../components/modals/AddPatientModal';
import EditPatientModal from '../components/modals/EditPatientModal';

class PatientPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            patients: [],
            isAddPatientModalOpen: false,
            isEditPatientModalOpen: false,
            currentPatient: {}
        };

        this.openAddPatientModal = this.openAddPatientModal.bind(this);
        this.openEditPatientModal = this.openEditPatientModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.addPatient = this.addPatient.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
    }

    addPatient(patient) {
        let {patients} = this.state;
        patients.push(patient);
        this.setState({patients});
    }


    deletePatient(patientId) {
        PatientApi.deletePatient(patientId, (response) => {
            let {patients} = this.state;

            patients = patients.filter((patient) => patient.patientId !== patientId);
            this.setState({patients});
        });        
    }

    openAddPatientModal() {
        this.setState({isAddPatientModalOpen: true});
    }

    openEditPatientModal(patient) {
        this.setState({isEditPatientModalOpen: true, currentPatient:patient});
    }

    closeModal() {
        this.setState({isAddPatientModalOpen: false, isEditPatientModalOpen:false});
    }

    componentDidMount() {
        PatientApi.listAllPatients((response)=> {
            this.setState({...this.state, isLoading:false, patients:response});
        });
    }

    render() {
        let {isLoading, patients, currentPatient, isAddPatientModalOpen, isEditPatientModalOpen} = this.state;

        const cardsList = [];

        if(patients) {
            patients.forEach((patient) => {
                patient.dob = new Date(patient.dob);
                cardsList.push(<PatientCard key={patient.patientId} patient={patient} 
                    openEditPatientModal={this.openEditPatientModal}  deletePatient={this.deletePatient} {...this.props}></PatientCard>);
            });
        }

        return (
            <div id="content">
                <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Patient List 
                    <a href="#" onClick={this.openAddPatientModal} className="btn btn-primary ml-3"><i className="fa fa-plus"></i></a>
                </h1>
                
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    :
                    <div className="row">
                        {cardsList}
                    </div>
                }
                </div>
                <AddPatientModal doctor={null} addPatient={this.addPatient} isModalOpen={isAddPatientModalOpen} closeModal={this.closeModal}/>
                <EditPatientModal patient={currentPatient} doctor={null} isModalOpen={isEditPatientModalOpen} closeModal={this.closeModal}/>
            </div>
		);
	}
};

export default PatientPage;