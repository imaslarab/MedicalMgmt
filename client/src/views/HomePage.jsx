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
            <div id="content">
                <div className="container-fluid">
                { isLoading ? 
                    <h1 className="h3 mb-4 text-gray-800">Loading ..</h1>
                    :
                    <h1 className="h3 mb-4 text-gray-800">Empty Page</h1>
                }
                </div>
            </div>
		);
	}
};

export default HomePage;