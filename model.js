export const outputBus = new EventTarget();

export const model = {
  play(){
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
  playing: false
};