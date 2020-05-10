import React, { Component } from 'react';

import doctorImg from '../assets/images/doctor.svg';

import DoctorApi from '../api/doctor';
import AuthService from '../services/AuthService';

import EditDoctorModal from '../components/modals/EditDoctorModal';

class PProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            doctor: {},
            isEditDoctorModalOpen: false
        };

        this.openEditDoctorModal = this.openEditDoctorModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openEditDoctorModal() {
        this.setState({isEditDoctorModalOpen: true});
    }

    closeModal() {
        this.setState({isEditDoctorModalOpen:false});
    }

    componentDidMount() {
        let doctorId = AuthService.getUserId();
        DoctorApi.getDoctor(doctorId, (response)=> {
            this.setState({...this.state, isLoading:false, doctor:response});
        });
    }

    render() {
        let {isLoading, doctor, isEditDoctorModalOpen} = this.state;

        return (
            <div id="content">
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-2">
                            <img className="img-profile rounded-circle profile-img" src={doctorImg} alt="" />
                        </div>
                        <div className="col-md-10 profile-detail">
                            <h1 className="h3 text-gray-800">{doctor.doctorName} 
                                <a href="#" className="btn btn-info btn-circle ml-2" onClick={this.openEditDoctorModal}>
                                    <i className="fa fa-edit"></i>
                                </a>
                            </h1>
                            <p><strong>Doctor ID: </strong>{doctor.doctorId}</p>
                            <p><strong>Phone number: </strong>{doctor.phone}</p>
                            <p><strong>Email Address: </strong>{doctor.email}</p>
                            <p><strong>Speciality: </strong>{doctor.speciality}</p>
                        </div>
                    </div>
                </div>
                <EditDoctorModal doctor={doctor} isModalOpen={isEditDoctorModalOpen} closeModal={this.closeModal}/>
            </div>
		);
	}
};

export default PProfile;