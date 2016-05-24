'use strict';

require('./dancer');

class GLAudio{

    constructor() {

        this.dancer = new Dancer();

    }

    init(mp3) {

        return new Promise((resolve, reject) => {

            var audio = new Audio();
            audio.src = mp3;
            // audio.volume = 0.01;
            audio.volume = 1;

            this.dancer.load(audio);

            resolve();

        });

    }

    play() {

        this.dancer.play();

    }

}

export default new GLAudio();
