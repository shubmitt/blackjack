import * as Actiontypes from './actiontypes';

export const hitDraw =(currentDraw) => ({
    type:Actiontypes.HIT_DRAW,
    payload:currentDraw
});

export const dealerDraw =(currentDraw) => ({
    type:Actiontypes.STICK_DEALER_DRAW,
    payload:currentDraw
});

export const initialiseDeck =(initialSet) => ({
    type:Actiontypes.INITIALISE_DECK,
    payload:initialSet
    
});