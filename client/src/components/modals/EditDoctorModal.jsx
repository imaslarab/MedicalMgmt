import React, { Component } from 'react';

import Modal from '../Modal';
import Form from '../Form';
import Input from '../Input';
import DropDown from '../DropDown';

import DoctorApi from '../../api/doctor';

class EditDoctorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            doctorName: '',
            phone: '',
            email: '',
            password: '',
            speciality: '',
        }
    
        this.onChange = this.onChange.bind(this);
        this.editDoctor = this.editDoctor.bind(this);
    }

    onChange(event) {
        this.setState({...this.state, [event.target.name]: event.target.value});
    }

    editDoctor() {
        const {doctorId, doctorName, phone, email, password, speciality} = this.state;
        const doctor = {
            doctorName,
            phone, 
            email,
            password,
            speciality
        }
        
        DoctorApi.editDoctor(doctorId, doctor, (response) => {
            window.location.reload();
        });
    }

    componentWillReceiveProps({doctor}) {
        this.setState({...this.state, doctorId:doctor.doctorId, doctorName:doctor.doctorName, phone: doctor.phone, 
            email:doctor.email, password: doctor.password, speciality: doctor.speciality});
    }

    render() {
        let { isModalOpen } = this.props;
        const {doctorName, phone, email, password, speciality} = this.state;

        let isAddButtonDisabled = !doctorName || !email || !password;

        return(
            <Modal isOpen={isModalOpen}>
                <div className="Modal__content">
                <div className="Modal__header clearfix">
                    <h2 className="Modal__heading">Edit Doctor</h2>
                    <button type="button" className="Button--close" onClick={this.props.closeModal}>&times;</button>
                </div>
                <div className="Modal__body  clearfix">
                    <Form onSubmit={this.editDoctor}>
                        <Input type="text" name="doctorName" value={doctorName} onChange={this.onChange} placeholder="Enter Doctor Name"></Input>
                        <Input type="text" name="email" value={email} onChange={this.onChange} placeholder="Email"></Input>
                        <Input type="password" name="password" value={password} onChange={this.onChange} placeholder="Password"></Input>
                        <Input type="text" name="phone" value={phone} onChange={this.onChange} placeholder="Phone number"></Input>
                        <Input type="text" name="speciality" value={speciality} onChange={this.onChange} placeholder="Speciality"></Input>

                        <div>
                            <button type="submit" className="btn btn-secondary" disabled={isAddButtonDisabled}>Edit Doctor</button>
                            <button type="button" className="btn btn-danger ml-2" onClick={this.props.closeModal}>Cancel</button>
                        </div>
                    </Form>
                </div>
                </div>
            </Modal>
        );
    }
}

export default EditDoctorModal;