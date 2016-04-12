'use strict';

import Vue from 'vue';

export default Vue.extend({

	template: require('./template.html'),

	data: function() {

		return {

			experiments: [{
				title: 'Exp1',
				shortDesc: 'desc1'
			},{
				title: 'Exp2',
				shortDesc: 'desc2'
			}]

		};

	},

	created: function() {

		this.bind();

	},

	ready: function() {

        this.addEventListener();

	},

	watch: {

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

	}

});
