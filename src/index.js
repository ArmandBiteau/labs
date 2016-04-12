'use strict';

import Vue from 'vue';

import domready from 'domready';

import Application from './components/application';

class Main {

	constructor() {

		this.bind();

		this.addEventListener();

		this.start();
	}

	bind() {}

	addEventListener() {}

	start() {

		Promise.all([
			//SoundManager.start()
		])

		.then(() => {

			new Vue(Application);

		});

	}
}

domready(() => {

    const labs = new Main();

});
