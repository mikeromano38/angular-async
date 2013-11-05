module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: ['app/lib/helios-kernel/kernel.js', 'app/js/angular-async.js'],
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		concat: {
			options: {
				separator: ';',
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: ['app/lib/helios-kernel/kernel.js', 'app/js/angular-async.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify']);

};