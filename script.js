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
inputBus.addEventListener('play-game', () => model.play());