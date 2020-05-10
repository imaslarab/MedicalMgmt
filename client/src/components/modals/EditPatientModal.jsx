import React, { Component } from 'react';

import Modal from '../Modal';
import Form from '../Form';
import Input from '../Input';
import DropDown from '../DropDown';

import PatientApi from '../../api/patient';
import { utilService } from '../../services/UtilService';

class EditPatientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName: '',
            patientId: '',
            dob: '',
            sex: '',
            phone: '',
            address: '',
            email: '',
            password: '',
        }
    
        this.onChange = this.onChange.bind(this);
        this.editPatient = this.editPatient.bind(this);
    }

    onChange(event) {
        this.setState({...this.state, [event.target.name]: event.target.value});
    }

    editPatient() {
        const {patientId, patientName, dob, sex, phone, email, password, address} = this.state;
        const patient = {
            patientName,
            dob: utilService.formatDBDate(dob),
            sex, phone, email, password, 
            address
        }

        PatientApi.editPatient(patientId, patient, (response) => {
            window.location.reload();
        });
    }

    componentWillReceiveProps({patient}) {
        this.setState({...this.state, patientId: patient.patientId, patientName:patient.patientName, 
            dob:patient.dob, email:patient.email, password:patient.password, sex:patient.sex, phone:patient.phone, address:patient.address})
    }

    render() {
        let { isModalOpen } = this.props;
        let {patientName, dob, sex, phone, address, email, password} = this.state;

        let isAddButtonDisabled = false;

        return(
            <Modal isOpen={isModalOpen}>
                <div className="Modal__content">
                <div className="Modal__header clearfix">
                    <h2 className="Modal__heading">Edit Patient</h2>
                    <button type="button" className="Button--close" onClick={this.props.closeModal}>&times;</button>
                </div>
                <div className="Modal__body  clearfix">
                    <Form onSubmit={this.editPatient}>
                        <Input type="text" name="patientName" value={patientName} onChange={this.onChange} placeholder="Enter Patient Name"></Input>
                        <Input type="text" name="email" value={email} onChange={this.onChange} placeholder="Email"></Input>
                        <Input type="password" name="password" value={password} onChange={this.onChange} placeholder="Password"></Input>
                        <Input type="date" name="dob" value={dob} onChange={this.onChange} placeholder="Date of Birth"></Input>
                        <Input type="text" name="sex" value={sex} onChange={this.onChange} placeholder="Sex"></Input>
                        <Input type="text" name="phone" value={phone} onChange={this.onChange} placeholder="Phone number"></Input>
                        <Input type="text" name="address" value={address} onChange={this.onChange} placeholder="Address"></Input>

                        <div>
                            <button type="submit" className="btn btn-secondary" disabled={isAddButtonDisabled}>Edit Patient</button>
                            <button type="button" className="btn btn-danger ml-2" onClick={this.props.closeModal}>Cancel</button>
                        </div>
                    </Form>
                </div>
                </div>
            </Modal>
        );
    }
}

export default EditPatientModal;