import React, { Component } from 'react';

import PatientCard from '../components/PatientCard';
import PatientApi from '../api/patient';

import AddPatientModal from '../components/modals/AddPatientModal';
import EditPatientModal from '../components/modals/EditPatientModal';

class PatientPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            patients: [
                {patientId:1, patientName:"John Trump", age:28, sex:"Male", phoneNumber:'920922029', address:''},
                {patientId:2, patientName:"Mickey Barber", age:15, sex:"Male", phoneNumber:'720822029', address:''},
                {patientId:3, patientName:"Donald Tomgato", age:21, sex:"Male", phoneNumber:'900208299', address:''},
                {patientId:4, patientName:"Sean Mars", age:50, sex:"Male", phoneNumber:'220192029', address:''},
                {patientId:5, patientName:"Adam Newton", age:35, sex:"Male", phoneNumber:'09111919', address:''},
                {patientId:6, patientName:"Monica Geller", age:40, sex:"Female", phoneNumber:'12302029', address:''},
                {patientId:7, patientName:"Rita Bing", age:50, sex:"Female", phoneNumber:'920922029', address:''},
            ],
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
        patient.patientd = patients[patients.length-1].patientId + 1;
        patients.push(patient);
        this.setState({patients});
    }


    deletePatient(patientId) {
        let {patients} = this.state;

        patients = patients.filter((patient) => patient.patientId != patientId);
        this.setState({patients});
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
        // PatientApi.listAllPatients((response)=> {
        //     this.setState({...this.state, isLoading:false, patients:response.patients});
        // });
    }

    render() {
        let {isLoading, patients, currentPatient, isAddPatientModalOpen, isEditPatientModalOpen} = this.state;

        const cardsList = [];

        if(patients) {
            patients.forEach((patient) => {
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