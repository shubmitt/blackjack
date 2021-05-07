import React from 'react';
import {Provider,connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initialiseDeck,hitDraw,dealerDraw } from './redux/actions';
import * as CommonConstants from './common';
import DealerBoard from './Components/DealerBoard';
import PlayerBoard from './Components/PlayerBoard';
import {Modal,ModalBody,ModalHeader,Button} from 'reactstrap';
import './style/main.css';
import {FadeTransform} from 'react-animation-components';


class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      playerTotal:0,
      dealerTotal:0,
      gameOver:false,
      isModalOpen:true,
      getRandomCard:this.getRandomCard
    }
  }

  getRandomCard = () => {
    let rndmCard = CommonConstants.randomCardGenerator();
     if(!this.props.usedCards.includes(rndmCard.id)){
       return rndmCard;
     }
     else{
       this.getRandomCard();
     }
  }

  initDeck = () =>{
   //this.toggleModal();
    let initArrId = [];let initArr = [];
    while(initArrId.length<3){
      if(initArrId.indexOf(CommonConstants.randomCardGenerator().id) === -1 ){
        initArrId.push(CommonConstants.randomCardGenerator().id);
        initArr.push(CommonConstants.randomCardGenerator());
      }
      
    }
     
    this.props.initialiseDeck({
      dealerSet:[initArr[0]],
      playerSet:[initArr[1],initArr[2]]
    });
  }

  componentDidMount(){
    this.initDeck();
  }
  // toggleModal = () => {
    
  //   this.setState({isModalOpen:!this.state.isModalOpen});
    
   
  // }

  static getDerivedStateFromProps(props,state){
    let playerTotal = props.playerDeck.length?props.playerDeck.reduce((acc,value) => acc+value.card_value,0):0;
    let dealerTotal = props.dealerDeck.length ? props.dealerDeck.reduce((acc,value) => acc+value.card_value,0):0;
    if(props.playerStick){
      if(dealerTotal < 21 && dealerTotal < playerTotal || dealerTotal == playerTotal){
        props.dealerDraw(state.getRandomCard());
      }
      else if(dealerTotal > playerTotal || dealerTotal >= 21) {
         return({gameOver:true,
            playerTotal:playerTotal,
          dealerTotal:dealerTotal });
      }
    }
    if(playerTotal >= 21 ||  dealerTotal >= 21 ){
     
       return({gameOver:true,
            playerTotal:playerTotal,
          dealerTotal:dealerTotal});
    }
     else{
     
      return({
        playerTotal:playerTotal,
        dealerTotal:dealerTotal,
        gameOver:false
      })
    }
    console.log(this.state);
  }
  
  render(){
   
  const hitPickCard = () =>{
    if(this.state.playerTotal < this.state.dealerTotal || this.state.playerTotal < 21){
      this.props.hitDraw(this.getRandomCard());
    }
    else{
      this.setState({...this.state,gameOver:true});
    }
  }

  const dealerDraw = () => {
    console.log('dealer');
    // let playerTotal = this.props.playerDeck.reduce((acc,value) => acc+value);
    // let dealerTotal = [...this.props.dealerDeck];
   //while(this.state.dealerTotal < this.state.playerTotal && this.state.playerTotal < 21 || this.state.dealerTotal <= 21){
      this.props.dealerDraw(this.getRandomCard());
      //this.setState({isGameOver:false});
      //dealerTotal = this.props.dealerDeck.reduce((acc,value) => acc+value);
   //}

  }

  
  return (
    
    <div className="main-container">
      <div className = "row">
      <div className="col-sm-12 col-md-6">
      <PlayerBoard onHitClick = {hitPickCard} onStickClick={dealerDraw} 
      playerDeck={this.props.playerDeck}  gameOver={this.state.gameOver}
      playerStick={this.props.playerStick}/>
      </div>
      <div className = "col-sm-12 col-md-6">
      <DealerBoard dealerDeck={this.props.dealerDeck}/>
      </div>
      {this.state.gameOver && 
        //   <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
    
        // <ModalHeader toggle={this.toggleModal}>Game Over</ModalHeader>
        // <ModalBody> 
        <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
           <div className="col-sm-12 resultBox">
             <h1>Game Over!</h1>
          {((this.state.playerTotal < this.state.dealerTotal && this.state.dealerTotal < 21)|| this.state.playerTotal >= 21) && <h2>You Lost!</h2>}
          {(this.state.playerTotal > this.state.dealerTotal && this.state.playerTotal< 21 )|| this.state.dealerTotal>=21  && <h2>You Won!</h2>}
            <Button onClick={ this.initDeck}>Restart</Button>
          </div>
          </FadeTransform>}
        {/* </ModalBody>
        </Modal> */}
      
      </div>
    </div>
   
  );
  }
}

const mapStateToProps = (state) => ({
    playerDeck: state.playerDeck,
    dealerDeck:state.dealerDeck,
    playerStick:state.playerStick,
    usedCards:state.usedCards
})

const mapDispatchToProps = (dispatch) => ({
  initialiseDeck: (initialDeck) => dispatch(initialiseDeck(initialDeck)),
  hitDraw: (currentDraw) => dispatch(hitDraw(currentDraw)),
  dealerDraw:(currentDraw) => dispatch(dealerDraw(currentDraw))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
