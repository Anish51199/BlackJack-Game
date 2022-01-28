//....
let blackjackGame= {
    'you' :{'scorespan':'#your-blackjack-result', 'div':'#yourbox', 'score':0},
    'dealer':{'scorespan':'#dealer-blackjack-result', 'div':'#dealerbox', 'score':0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardmapper': {'2':2, '3': 3, '4': 4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'standMode':false,
    'turnOver':false,
};

const you= blackjackGame['you'];
const dealer= blackjackGame['dealer'];

const hitSound= new Audio('sounds/swish.m4a');
const lossSound=new Audio('sounds/aww.mp3');
const winSound= new Audio('sounds/cash.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerlogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);


function blackjackHit(){
    if( blackjackGame.standMode == false){
    let index= randomCard();
    console.log('--->'+index);
    showcard(index,you);
    updateScore(index,you);
    showScore(you);
    if(you['score']>21)
      dealerlogic();

}
}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function dealerlogic(){
    blackjackGame.standMode=true;

    while( dealer['score'] <16 && blackjackGame.standMode=== true){
    let index= randomCard();
    showcard(index,dealer);
    updateScore(index,dealer);
    showScore(dealer);
    await sleep(1000);
    }

        blackjackGame.turnOver= true;
        let win= computeWinner();
        showWinner(win);

}

function showcard(index,activeplayer){
    if(activeplayer['score'] <=21){
    let cardImage= document.createElement('img');
    cardImage.src=`images/${index}.png`;
    console.log(cardImage.src);
    document.querySelector(activeplayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}


function randomCard(){
    let indexNumber= Math.floor(Math.random()*13);
    console.log(indexNumber);
    return blackjackGame['cards'][indexNumber];
}

function blackjackDeal(){

  if(blackjackGame.turnOver== true){
  let youImage= document.querySelector('#yourbox').querySelectorAll('img');
  let dealerImage= document.querySelector('#dealerbox').querySelectorAll('img');

  for(let i=0;i<youImage.length; i++){
      youImage[i].remove();
  }

  for(let i=0;i<dealerImage.length; i++){
      dealerImage[i].remove();
  }

    you['score']=0;
    dealer['score']=0;

    document.querySelector(you['scorespan']).textContent=0;
    document.querySelector(you['scorespan']).style.color='#ffffff';

    document.querySelector(dealer['scorespan']).textContent=0;
    document.querySelector(dealer['scorespan']).style.color='#ffffff';

    document.querySelector('#blackjack-result').textContent="Let's Play.";
    document.querySelector('#blackjack-result').style.color='black';

    blackjackGame.standMode=false;
    blackjackGame.turnOver=false;

}
}


// card=== index.
function updateScore(card,activeplayer){
    if(card==='A'){
        if(activeplayer['score'] + blackjackGame['cardmapper'][card][1] <=21)
            activeplayer['score'] +=  blackjackGame['cardmapper'][card][1];
        else
            activeplayer['score'] +=  blackjackGame['cardmapper'][card][0];
    }
    else
        activeplayer['score'] +=  blackjackGame['cardmapper'][card];
}

function showScore(activeplayer){
    if(activeplayer['score'] >21){
        document.querySelector(activeplayer['scorespan']).textContent='BUST';
        document.querySelector(activeplayer['scorespan']).style.color='RED';
    }
    else
        document.querySelector(activeplayer['scorespan']).textContent=activeplayer['score'];

}

function computeWinner(){
    let winner;

    if(you['score']<=21){
        if(you['score']> dealer['score'] || dealer['score']>21){
            console.log('you won');
            winner=you;
            blackjackGame['wins']++;
        }
        else if(you['score']<dealer['score']){
            console.log('dealer won');
            winner=dealer;
            blackjackGame['losses']++;
        }
        else if (you['score'] === dealer['score']) {
            console.log('draw');
            blackjackGame['draws']++;
        }
    }

    else if(you['score'] > 21 && dealer['score']<=21){
        console.log('dealer won');
        winner=dealer;
        blackjackGame['losses']++;
    }
     else{
         blackjackGame['draws']++;
     }

    document.querySelector('#wins').textContent=blackjackGame['wins'];
    document.querySelector('#losses').textContent=blackjackGame['losses'];
    document.querySelector('#draws').textContent=blackjackGame['draws'];
    return winner;
}

function showWinner(winner){
    let message, mesaagecolor;

    if(winner== you){
        message='you won!';
        mesaagecolor='green';
        winSound.play();
    }
    else if(winner== dealer){
        message='you lost!';
        mesaagecolor='red';
        lossSound.play();
    }
    else{
        message='you draw!';
        mesaagecolor='black';
    }

    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color=mesaagecolor;
}


