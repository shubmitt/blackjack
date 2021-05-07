import * as Actiontypes from './actiontypes';

const initialState = {
   
    playerDeck:[],
    dealerDeck:[],
    playerStick:false,
    usedCards:[]
};

export const reducer = (state = initialState,action) => {
    switch(action.type){
       case Actiontypes.HIT_DRAW : 
           return {...state,playerDeck:[...state.playerDeck,action.payload],usedCards:[...state.usedCards,action.payload.id]};
    

        case Actiontypes.STICK_DEALER_DRAW:
            return {...state,dealerDeck:[...state.dealerDeck,action.payload],playerStick:true,usedCards:[...state.usedCards,action.payload.id]};

            case Actiontypes.INITIALISE_DECK:
            return {...state,
                playerDeck:[...action.payload.playerSet],
                dealerDeck:[...action.payload.dealerSet],
                playerStick:false,
                usedCards:(action.payload.playerSet.length || action.payload.dealerSet.length) && action.payload.playerSet.map(item => item.id).concat(action.payload.dealerSet.map(item => item.id))
            };
            default:
                return state;
    }



}

