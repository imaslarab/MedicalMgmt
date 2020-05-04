import React, { Component } from 'react';

import BillingInfoCard from '../../components/BillingInfoCard';
// import PatientApi from '../api/patient';

class PBilling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            billings: [],
            past_billingss: []
        };
    }

    componentDidMount() {
        // PatientApi.listAllPatients((response)=> {
        //     this.setState({...this.state, isLoading:false, patients:response.patients});
        // });
    }

    render() {
        let {isLoading, billings} = this.state;

        const cardsList = [];

        
        let patient = {patientId:1, name:"John Trump", age:28};
        billings = [
            {billingId: 201, date:"Dec 20, 2019", title:"Normal Checkup", amount:"$100"},
            {billingId: 101, date:"Nov 16, 2019", title:"Whole body checkup", amount:"$300"}
        ];

        if(billings) {
            billings.forEach((bill) => {
                cardsList.push(<BillingInfoCard key={billings.billingId} bill={bill} {...this.props}></BillingInfoCard>);
            });
        }

        return (
            <div id="content">
                <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Billing Details</h1>
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    : <div className="row">{cardsList}</div>
                }
                </div>
            </div>
		);
	}
};

export default PBilling;