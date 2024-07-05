import {model, outputBus} from './model.js';
import {
  playingReset, playingStart, inputBus, changePlayerHand, changeComputerHand, logOutcome
} from './view.js';

outputBus.addEventListener('start-round', () => {
  model.reset();

  playingStart();
});
outputBus.addEventListener('stop-round', () => {
  const outcome = model.score();

  playingReset();

  changePlayerHand(model.user.hand);
  changeComputerHand(model.computer.hand);

  logOutcome(outcome, model.user.score, model.computer.score);
});

inputBus.addEventListener('chose-hand', (event) => {
  model.choseHand(event.detail.hand);
});
inputBus.addEventListener('play-game', () => model.start());