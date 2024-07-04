const playerHand = document.querySelector('.hand-box.left');
const computerHand = document.querySelector('.hand-box.right');
const playButton = document.getElementById('play-game');

export const inputBus = new EventTarget();

export function playingStart(){
  playerHand.classList.add('shaking');
  computerHand.classList.add('shaking');

  playButton.hidden = true;
}
export function playingReset(){
  playerHand.classList.remove('shaking');
  computerHand.classList.remove('shaking');

  playButton.hidden = false;
}

playButton.addEventListener('click', () => {
  inputBus.dispatchEvent(new CustomEvent('play-game'));
});
window.addEventListener('keyup', (event) => {
  if(event.key === ' '){
    inputBus.dispatchEvent(new CustomEvent('play-game'));
  }
});