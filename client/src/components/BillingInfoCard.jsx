import React, { Component } from 'react';

class BillingInfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: props.bill
        };
    }

	render() {
        const {bill} = this.state;

		return (
            <div className="col-xl-8 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Billing Info {bill.billingId}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">Date: {bill.date}</div>
                                <div>Title: {bill.title}</div>
                                <div>Amount: {bill.amount}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fa fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
};

export default BillingInfoCard;