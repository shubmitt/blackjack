import React from 'react';
import {Button,Card,CardImg} from 'reactstrap';
import * as CommonConstants from '../common';
import {FadeTransform} from 'react-animation-components';

class PlayerBoard extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const card = this.props.playerDeck.length ? this.props.playerDeck.map((item) => {
            console.log(item);
            let img = process.env.PUBLIC_URL +"/images/" + CommonConstants.getCardImage(item.card_value,item.card_type);
            return(
              
            <div className="col-sm-2">
                  <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
            <CardImg src = {img} />
            </Card>
            </FadeTransform>
            </div>
           
        )}) :(<div></div>); 
        return(
            <div className='player-board__main row'>
               <h2>Your Deck</h2>
                    {card}
             
           
            <div className ="player-board__btn-group row">
        {(!this.props.playerStick || !this.props.gameOver) && <Button onClick={this.props.onHitClick} className="col-sm-3" disabled={this.props.playerStick || this.props.gameOver}>Hit</Button> }
              {(!this.props.playerStick || !this.props.gameOver) && <Button onClick={this.props.onStickClick} disabled={this.props.gameOver} className="col-sm-3">Stick</Button>}
            </div>
            </div>
        );
    }
}
{/* ${CommonConstants.getCardImage(item.card_value,item.card_type)} */}

export default PlayerBoard;