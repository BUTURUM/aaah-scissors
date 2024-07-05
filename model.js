export const outputBus = new EventTarget();

function randomHand(){
  const hands = ['rock', 'paper', 'scissors'];
  return hands[Math.floor(Math.random() * hands.length)];
}
function determineOutcome(yourHandChoice, enemyHandChoice){
  if(yourHandChoice === enemyHandChoice){
    return 'draw';
  }
  switch(enemyHandChoice){
    case 'rock':
      if(yourHandChoice === 'paper') return 'victory';
      break
    case 'paper':
      if(yourHandChoice === 'scissors') return 'victory';
      break
    case 'scissors':
      if(yourHandChoice === 'rock') return 'victory';
  }
  return 'defeat';
}

export const model = {
  choseHand(hand){
    this.user.hand = hand;
  },
  defineHand(){
    this.computer.hand = randomHand();
  },
  score(){
    this.defineHand();

    if(!this.user.hand){
      this.computer.score++;
      return null;
    }

    let outcome = determineOutcome(this.user.hand, this.computer.hand);
    if(outcome === 'victory'){
      this.user.score++;
    } else if(outcome === 'defeat'){
      this.computer.score++;
    }
    return outcome;
  },
  reset(){
    this.computer.hand = null;
    this.user.hand = null;
  },
  start(){
    if(this.playing){
      return
    }
    setTimeout(() => {
      outputBus.dispatchEvent(new CustomEvent('stop-round'));
      this.playing = false;
    }, 2300);
    outputBus.dispatchEvent(new CustomEvent('start-round'));
    this.playing = true;
  },
  user: {
    hand: null, score: 0
  },
  computer: {
    hand: null, score: 0
  },
  playing: false
};