module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files: {
					'dist/kernel.min.js': [ 'app/lib/helios-kernel/kernel.js' ],
					'dist/angular-async.min.js': [ 'app/js/angular-async.js' ]
				}
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
		},
		copy: {
			build: {
				expand: true,
				flatten: true,
				src: ['README.md', 'app/lib/helios-kernel/kernel.js', 'app/js/angular-async.js' ],
				dest: 'dist/'
			}
		},
		clean: {
			src: 'dist'
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'copy', 'uglify']);

};