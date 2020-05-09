import React, { Component } from 'react';

import DoctorCard from '../components/DoctorCard';
import PatientApi from '../api/patient';

import AddPatientModal from '../components/modals/AddPatientModal';
import EditPatientModal from '../components/modals/EditPatientModal';

class DoctorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            doctors: [
                {doctorId:1, name: "Robin Hood", phoneNumber: '2902139012', speciality: 'Internal Medicine, MD'},
                {doctorId:2, name: "Reena Potter", phoneNumber: '9232339012', speciality: 'Surgery'},
                {doctorId:3, name: "Hermione Smith", phoneNumber: '9232339012', speciality: 'Physician'}
            ]
        };

        // this.openAddPatientModal = this.openAddPatientModal.bind(this);
        // this.openEditPatientModal = this.openEditPatientModal.bind(this);
        // this.closeModal = this.closeModal.bind(this);

        // this.addPatient = this.addPatient.bind(this);
        // this.deletePatient = this.deletePatient.bind(this);
    }

    // addPatient(patient) {
    //     let {patients} = this.state;
    //     patient.patientd = patients[patients.length-1].patientId + 1;
    //     patients.push(patient);
    //     this.setState({patients});
    // }


    // deletePatient(patientId) {
    //     let {patients} = this.state;

    //     patients = patients.filter((patient) => patient.patientId != patientId);
    //     this.setState({patients});
    // }

    // openAddPatientModal() {
    //     this.setState({isAddPatientModalOpen: true});
    // }

    // openEditPatientModal(patient) {
    //     this.setState({isEditPatientModalOpen: true, currentPatient:patient});
    // }

    // closeModal() {
    //     this.setState({isAddPatientModalOpen: false, isEditPatientModalOpen:false});
    // }

    componentDidMount() {
        // PatientApi.listAllPatients((response)=> {
        //     this.setState({...this.state, isLoading:false, patients:response.patients});
        // });
    }

    render() {
        let {isLoading, doctors} = this.state;

        const cardsList = [];

        if(doctors) {
            doctors.forEach((dr) => {
                cardsList.push(<DoctorCard key={dr.doctorId} doctor={dr} 
                    {...this.props}></DoctorCard>);
            });
        }

        return (
            <div id="content">
                <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Doctors List 
                    <a href="#" className="btn btn-primary ml-3"><i className="fa fa-plus"></i></a>
                </h1>
                
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    :
                    <div className="row">
                        {cardsList}
                    </div>
                }
                </div>
                {/* <AddPatientModal doctor={null} addPatient={this.addPatient} isModalOpen={isAddPatientModalOpen} closeModal={this.closeModal}/>
                <EditPatientModal patient={currentPatient} doctor={null} isModalOpen={isEditPatientModalOpen} closeModal={this.closeModal}/> */}
            </div>
		);
	}
};

export default DoctorPage;