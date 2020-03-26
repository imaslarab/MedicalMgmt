import React, { Component } from 'react';

import Form from '../components/Form';
import Input from '../components/Input';
import DropDown from '../components/DropDown';

import CONSTANTS from '../constants/constants';

class MainSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: '',
            eventType: '',
            orientation: '',
            cards: props.cards,
            isDupilcateCardModalOpen: false,
            isShowImagesModalOpen: false,
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentWillReceiveProps({cards}) {
        this.setState({...this.state, cards})
    }

    render() {
        let {recipient, eventType, orientation, cards, isDupilcateCardModalOpen, isShowImagesModalOpen} = this.state;

        return(
            <div className="col-lg-3 list-group">
                <h3>Create </h3>
                <br></br>
                {/* <Form onSubmit={this.createNewCard}>
                    <Input type="text" name="recipient" value={recipient} onChange={this.onChange} placeholder="Recipient"></Input>
                    <DropDown name="eventType" value={eventType} onChange={this.onChange} options={CONSTANTS.EVENTS} placeholder="Select an event type"></DropDown>
                    <DropDown name="orientation" value={orientation} onChange={this.onChange} options={CONSTANTS.ORIENTATIONS} placeholder="Select an orientation"></DropDown>
                    <button type="submit" className="btn btn-block btn-secondary" disabled={!recipient || !eventType || !orientation}>Create</button>
                </Form> */}

            </div>
        );
    }  
}

export default MainSidebar;