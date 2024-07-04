const playerHand = document.querySelector('.hand-box.left');
const computerHand = document.querySelector('.hand-box.right');
const playButton = document.getElementById('play-game');
const actionPanel = document.getElementById('action-panel');

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

  playButton.hidden = true;
}
export function playingReset(){
  playerHand.classList.remove('shaking');
  computerHand.classList.remove('shaking');

  lockActionPanel();

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