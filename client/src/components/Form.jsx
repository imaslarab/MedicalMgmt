import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addErrorHandlerToChildren = this.addErrorHandlerToChildren.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.props.onSubmit !== undefined) {
            this.props.onSubmit(event);
        }
    }

    addErrorHandlerToChildren() {
        return React.Children.map(this.props.children, child => {
            if(child === null || child.type === null || child.type === undefined) {
            return child;
            }
            if(child.props.typeName === 'TextInput') {
                return React.cloneElement(child, {onError: this.onError, onErrorResolved: this.onErrorResolved, errorMessage: this.state.errorMessage[child.props.name], validate: this.validate});
            } else {
                return child;
            }
        });
    }

    render() {
        let {className} = this.props;
        return (
            <form onSubmit={this.handleSubmit} className={className}>
                {this.addErrorHandlerToChildren()}
            </form>
        );
    }
}

export default Form;