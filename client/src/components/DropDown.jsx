import React, { Component } from 'react';

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorMessage: this.props.errorMessage || "Invalid"
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (this.props.onChange !== undefined) {
            this.props.onChange(event);
        }
    }

    render() {
        const {name, options, placeholder, errorMessage, value, containerClassName} = this.props;

        const optionList = [];

        if(options) {
            options.forEach((opt) => {
                optionList.push(<option key={opt} value={opt}>{opt}</option>);
            });
        }

        return (
            <div className={`form-group ${containerClassName}`}>
                <select name={name} className="form-control" id={name} value={value} onChange={this.handleChange}>
                    <option value="">{placeholder}</option>
                    {optionList}
                </select>
                {errorMessage ? <span className="error"></span> : null}
            </div>
        );
    }
};

export default DropDown;