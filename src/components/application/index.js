'use strict';

import loading from '../loading';

import experiments from '../experiments';

// import {
//     ROOT_URL
// } from '../../core/config';

//import GLManager from '../../GLmanager'

export default {

    el: '#application',

	template: require('./template.html'),

	data: function() {

		return {

            currentView: 'loading'

		};

	},

	created: function() {

		this.bind();

        console.log('Application created');

	},

	ready: function() {

        this.addEventListener();

        window.setTimeout(() => {

            this.currentView = 'experiments';

        }, 1000);

        //this.GLM = new GLManager();

	},

	watch: {

        currentView: function() {

        }

	},

	methods: {

        /*
        * Binding & Events
        */

        bind: function() {

        },

        addEventListener: function() {

        }

	},

	components: {

        loading,
        experiments

	},

    transitions: {

        'fade': {

			enter: function(el, done) {

			},

            leave: function(el, done) {

			}

		}

    }

};
