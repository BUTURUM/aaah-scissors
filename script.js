import {model, outputBus} from './model.js';
import {
  playingReset, playingStart, inputBus
} from './view.js';

outputBus.addEventListener('start-round', () => {
  playingStart();
});
outputBus.addEventListener('stop-round', () => {
  playingReset();
});

inputBus.addEventListener('chose-hand', (event) => {
  model.choseHand(event.detail.hand);
});
inputBus.addEventListener('play-game', () => model.play());