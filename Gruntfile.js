'use strict';

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		eslint: {
			browser: {
				options: {
					configFile: '.eslintrc.browser.json'
				},
				src: [
					'app/**/*.js'
				]
			},
			jasmine: {
				options: {
					configFile: '.eslintrc.jasmine.json'
				},
				src: [
					'controllers/**/*.js',
					'views/**/*.js',
					'services/**/*.js'
				]
			}
		}
	});

	grunt.registerTask('lint', ['eslint']);
};
