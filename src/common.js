export const suites = ["clubs","diamonds","spades","hearts"];
export const imgCards = {1:"ace",11:"jack",12:"queen",13:"king"};

export const randomCardGenerator = () => {
   const suit = Math.floor(Math.random()*4) +1;
   const value = Math.floor(Math.random()*13) + 1;
  
    return({
        card_type:suit,
         card_value:value,
        id:suit+'_'+value
    });
}

export const getCardImage = (value,suite) => {
    console.log(value);
    console.log(suite);
    const image = imgCards[value] ? `${imgCards[value]}_of_${suites[suite-1]}.png`:`${value}_of_${suites[suite-1]}.png`;
     return image;
}