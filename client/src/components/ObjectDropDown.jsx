import React, { Component } from 'react';

class ObjectDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleChange = this.handleChange.bind(this);
        this.findSelectedElement = this.findSelectedElement.bind(this);
    }

    findSelectedElement(value) {
        const {type, options} = this.props;
        switch(type) {
            case 'text':
            case 'image':
                return options.find((opt) => {return opt.elementId === value});
            case 'card':
                return options.find((opt) => {return opt.cardId === value});
            
            default:
                return options.find((opt) => {return opt.id === value});
        }
    }

    handleChange(event) {
        if (this.props.onChange !== undefined) {
            let selectedElement = this.findSelectedElement(event.target.value);
            this.props.onChange(selectedElement);
        }
    }

    render() {
        const {name, options, type, value, placeholder, containerClassName} = this.props;

        const optionList = [];

        if(options && type === 'text') {
            options.forEach((opt) => {
                optionList.push(<option key={opt.elementId} value={opt.elementId}>{`${opt.text}_(${opt.locationX},${opt.locationY})_${opt.fontName}`}</option>);
            });
        }

        if(options && type === 'card') {
            options.forEach((opt) => {
                optionList.push(<option key={opt.cardId} value={opt.cardId}>{`${opt.recipient}_${opt.eventType}_${opt.orientation}`}</option>);
            });
        }

        if(options && type === 'image') {
            options.forEach((opt) => {
                optionList.push(<option key={opt.elementId} value={opt.elementId}>{`${opt.name}_(${opt.locationX},${opt.locationY})`}</option>);
            });
        }

        return (
            <div className={`form-group ${containerClassName}`}>
                <select name={name} className="form-control" id={name} 
                        value={type === 'card' ? value.cardId : value.elementId} 
                        onChange={this.handleChange}>
                    <option value={{}}>{placeholder}</option>
                    {optionList}
                </select>
            </div>
        );
    }
};

export default ObjectDropDown;