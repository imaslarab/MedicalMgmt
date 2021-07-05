import React, { Component } from 'react';

import Modal from '../Modal';
import Form from '../Form';
import Input from '../Input';
import DropDown from '../DropDown';

class EditPatientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName: '',
            age: '',
            sex: '',
            phoneNumber: '',
            address: '',
            doctor: props.doctor
        }
    
        this.onChange = this.onChange.bind(this);
        this.editPatient = this.editPatient.bind(this);
    }

    onChange(event) {
        this.setState({...this.state, [event.target.name]: event.target.value});
    }

    editPatient() {
        const {doctor, patientName, age, sex, phoneNumber, address} = this.state;
        const patient = {
            doctor,
            patientName,
            age, sex, phoneNumber, 
            address
        }

        // ElementApi.addTextElement(currentPage.pageId, textElement, (response) => {
        //     window.location.reload(true);
        // }) ;

    }

    componentWillReceiveProps({doctor, patient}) {
        this.setState({...this.state, doctor, patientName:patient.patientName, 
            age:patient.age, sex:patient.sex, phoneNumber:patient.phoneNumber, address:patient.address})
    }

    render() {
        let { isModalOpen } = this.props;
        let {doctor, patientName, age, sex, phoneNumber, address} = this.state;

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
                        <Input type="number" name="age" value={age} onChange={this.onChange} placeholder="Age"></Input>
                        <Input type="text" name="sex" value={sex} onChange={this.onChange} placeholder="Sex"></Input>
                        <Input type="text" name="phoneNumber" value={phoneNumber} onChange={this.onChange} placeholder="Phone number"></Input>
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