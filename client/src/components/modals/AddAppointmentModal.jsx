import React, { Component } from 'react';

import Modal from '../Modal';
import Form from '../Form';
import Input from '../Input';
import DropDown from '../DropDown';

class AddAppointmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            date: '',
            time: ''
        }
    
        this.onChange = this.onChange.bind(this);
        this.addAppointment = this.addAppointment.bind(this);
    }

    onChange(event) {
        this.setState({...this.state, [event.target.name]: event.target.value});
    }

    addAppointment() {
        const {patient, date, time} = this.state;
        const appointment = {
            patient,
            date,
            time
        }

        // this.props.addAppointment(appointment);
        this.props.closeModal();

        // ElementApi.addTextElement(currentPage.pageId, textElement, (response) => {
        //     window.location.reload(true);
        // }) ;

    }

    render() {
        let { isModalOpen } = this.props;
        let {date, time, patient } = this.state;

        let isAddButtonDisabled = !date || !time || !patient;

        return(
            <Modal isOpen={isModalOpen}>
                <div className="Modal__content">
                <div className="Modal__header clearfix">
                    <h2 className="Modal__heading">Add a new appointment</h2>
                    <button type="button" className="Button--close" onClick={this.props.closeModal}>&times;</button>
                </div>
                <div className="Modal__body  clearfix">
                    <Form onSubmit={this.addAppointment}>
                        <Input type="text" name="patientName" value={patient.patientName} onChange={this.onChange} placeholder="Enter Patient Name"></Input>
                        <Input type="text" name="date" value={date} onChange={this.onChange} placeholder="Enter Appointment Date"></Input>
                        <Input type="text" name="time" value={time} onChange={this.onChange} placeholder="Enter Appointment Time"></Input>

                        <div>
                            <button type="submit" className="btn btn-secondary" disabled={isAddButtonDisabled}>Add Appointment</button>
                            <button type="button" className="btn btn-danger ml-2" onClick={this.props.closeModal}>Cancel</button>
                        </div>
                    </Form>
                </div>
                </div>
            </Modal>
        );
    }
}

export default AddAppointmentModal;