import React from 'react';
import {Button,Card,CardImg} from 'reactstrap';
import * as CommonConstants from '../common';
import {FadeTransform} from 'react-animation-components';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
import '../style/main.css';
class DealerBoard extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        
        const card = this.props.dealerDeck.length ? this.props.dealerDeck.map((item)  => {
            console.log(item);
            let img = process.env.PUBLIC_URL +"/images/" + CommonConstants.getCardImage(item.card_value,item.card_type);
            return(
                
            <div className="col-sm-2">
               <CSSTransition key ={item.id} timeout="300" classNames="card">
            <Card>
            <CardImg src = {img} />
            </Card>
            </CSSTransition>
            </div>
            
        )}) :(<div></div>); 
        return(
            <div className ="dealer-board__main row">
               <h2>Dealer Deck</h2>
                 
                   {card}
                   
            </div>
        );
    }
}

export default DealerBoard;