import {model, outputBus} from './model.js';
import {
  playingReset, playingStart, inputBus, changePlayerHand
} from './view.js';

outputBus.addEventListener('start-round', () => {
  playingStart();
  model.resetHand();
});
outputBus.addEventListener('stop-round', () => {
  playingReset();
  changePlayerHand(model.userHand);
});

inputBus.addEventListener('chose-hand', (event) => {
  model.choseHand(event.detail.hand);
});
inputBus.addEventListener('play-game', () => model.play());