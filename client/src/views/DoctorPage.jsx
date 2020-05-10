import React, { Component } from 'react';

import DoctorCard from '../components/DoctorCard';
import DoctorApi from '../api/doctor';

import AddDoctorModal from '../components/modals/AddDoctorModal';
import EditDoctorModal from '../components/modals/EditDoctorModal';

class DoctorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            doctors: [],
            isAddDoctorModalOpen: false,
            isEditDoctorModalOpen: false,
            currentDoctor: {}
        };

        this.openAddDoctorModal = this.openAddDoctorModal.bind(this);
        this.openEditDoctorModal = this.openEditDoctorModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.addDoctor = this.addDoctor.bind(this);
        this.deleteDoctor = this.deleteDoctor.bind(this);
    }

    addDoctor(doctor) {
        let {doctors} = this.state;
        doctors.push(doctor);
        this.setState({doctors});
    }


    deleteDoctor(doctorId) {
        DoctorApi.deleteDoctor(doctorId, () => {
            let {doctors} = this.state;

            doctors = doctors.filter((doctor) => doctor.doctorId !== doctorId);
            this.setState({doctors});
        });
    }

    openAddDoctorModal() {
        this.setState({isAddDoctorModalOpen: true});
    }

    openEditDoctorModal(doctor) {
        this.setState({isEditDoctorModalOpen: true, currentDoctor:doctor});
    }

    closeModal() {
        this.setState({isAddDoctorModalOpen: false, isEditDoctorModalOpen:false});
    }

    componentDidMount() {
        DoctorApi.listAllDoctors((response)=> {
            this.setState({...this.state, isLoading:false, doctors: response});
        });
    }

    render() {
        let {isLoading, doctors, isAddDoctorModalOpen, isEditDoctorModalOpen, currentDoctor} = this.state;

        const cardsList = [];

        if(doctors) {
            doctors.forEach((dr) => {
                cardsList.push(<DoctorCard key={dr.doctorId} doctor={dr} 
                    openEditDoctorModal={this.openEditDoctorModal}  deleteDoctor={this.deleteDoctor} 
                    {...this.props}></DoctorCard>);
            });
        }

        return (
            <div id="content">
                <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Doctors List 
                    <a href="#" className="btn btn-primary ml-3" onClick={this.openAddDoctorModal}><i className="fa fa-plus"></i></a>
                </h1>
                
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    :
                    <div className="row">
                        {cardsList}
                    </div>
                }
                </div>
                <AddDoctorModal doctor={null} addDoctor={this.addDoctor} isModalOpen={isAddDoctorModalOpen} closeModal={this.closeModal}/>
                <EditDoctorModal doctor={currentDoctor} isModalOpen={isEditDoctorModalOpen} closeModal={this.closeModal}/>
            </div>
		);
	}
};

export default DoctorPage;