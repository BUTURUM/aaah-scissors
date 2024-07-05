const playerHand = document.querySelector('.hand-box.left');
const computerHand = document.querySelector('.hand-box.right');
const playerCount = document.querySelector('.score-box.left > .score-count');
const computerCount = document.querySelector('.score-box.right > .score-count');

const playButton = document.getElementById('play-game');
const actionPanel = document.getElementById('action-panel');
const logTitle = document.getElementById('log-title');

const pictures = {
  rock: new Image(), paper: new Image(), scissors: new Image()
}
pictures.rock.src = 'icons/rock-hand.svg';
pictures.paper.src = 'icons/paper-hand.svg';
pictures.scissors.src = 'icons/scissors-hand.svg';

playerHand.append(pictures.rock.cloneNode());
computerHand.append(pictures.rock.cloneNode());

function lockActionPanel(){
  for(let actionButton of actionPanel.children){
    actionButton.disabled = true;
  }
}
lockActionPanel();

function resetActionPanel(){
  for(let actionButton of actionPanel.children){
    actionButton.disabled = false;
    actionButton.classList.remove('selected');
  }
};

export const inputBus = new EventTarget();

export function playingStart(){
  playerHand.classList.add('shaking');
  computerHand.classList.add('shaking');

  resetActionPanel();

  changePlayerHand();
  changeComputerHand();

  logTitle.innerText = '';

  playButton.hidden = true;
}
export function playingReset(){
  playerHand.classList.remove('shaking');
  computerHand.classList.remove('shaking');

  lockActionPanel();

  playButton.hidden = false;
}

export function logOutcome(outcome, playerScore, computerScore){
  const messages = {
    'victory': "You won, good job!",
    'defeat': "You lost, we're sorry(",
    'draw': "Just a draw, man"
  }
  if(!outcome){
    logTitle.innerText = "You haven't chosen hand.";
  } else{
    logTitle.innerText = messages[outcome];
  }
  playerCount.innerText = playerScore;
  computerCount.innerText = computerScore;
}

function changeHand(el, hand){
  if(hand){
    el.replaceChildren(pictures[hand].cloneNode());
  } else{
    el.replaceChildren(pictures.rock.cloneNode());
  }
}
export const changePlayerHand = (hand) => changeHand(playerHand, hand);
export const changeComputerHand = (hand) => changeHand(computerHand, hand);

playButton.addEventListener('click', () => {
  inputBus.dispatchEvent(new CustomEvent('play-game'));
});
window.addEventListener('keyup', (event) => {
  if(event.key === ' '){
    inputBus.dispatchEvent(new CustomEvent('play-game'));
  }
});

actionPanel.addEventListener('click', (event) => {
  let composedPath = event.composedPath();
  for(let i = 0; composedPath[i] !== actionPanel; i++){
    if(!composedPath[i].hasAttribute('data-hand')){
      continue
    }
    composedPath[i].classList.add('selected');
    lockActionPanel();

    inputBus.dispatchEvent(new CustomEvent('chose-hand', {
      detail: {hand: composedPath[i].getAttribute('data-hand')}
    }));
  }
});