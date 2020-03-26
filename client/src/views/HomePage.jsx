import React, { Component } from 'react';

import MainSidebar from '../components/MainSidebar';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    componentDidMount() {
        // CardApi.listAllCards((response)=> {
        //     this.setState({...this.state, isLoading:false, cards:response.cardsList});
        // });
    }

    render() {
        let {isLoading} = this.state;

        // const cardsList = [];

        // if(cards) {
        //     cards.forEach((card) => {
        //         cardsList.push(<Card key={card.cardId} card={card} {...this.props}></Card>);
        //     });
        // }

        return (
            <div className="container main-container">
                { isLoading ? 
                    <div className="row">Loading... </div> 
                    :
                    <div className="row">
                        <MainSidebar/>
                        <div className="col-lg-9 list-group">
                            <div className="row"> 
                                Empty List
                            </div>
                        </div>
                    </div>
                }
            </div>
		);
	}
};

export default HomePage;