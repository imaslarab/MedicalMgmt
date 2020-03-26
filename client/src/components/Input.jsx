import React, { Component } from 'react';

class Input extends Component {
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
        const {type, placeholder, name, value, errorMessage, className, containerClassName} = this.props;

        return (
            <div className={`form-group ${containerClassName}`}>
                <input className={`form-control ${className}`} placeholder={placeholder} 
                        name={name} value={value} type={type} onChange={this.handleChange}></input>
                {errorMessage ? <span className="error"></span> : null}
            </div>
        );
    }
};

export default Input;