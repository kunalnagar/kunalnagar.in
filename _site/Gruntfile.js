/**
 * Use Grunt to perform repetitive tasks.
 */
module.exports = function(grunt) {
	/**
	 * Display the elapsed execution time of grunt tasks.
	 */
	require('time-grunt')(grunt);

	/**
	 * Autoload Grunt plugins.
	 */
	require('load-grunt-tasks')(grunt);

	/**
	 * Initialize the main Grunt Config.
	 */
	grunt.initConfig({

		shell: {
			jekyllBuild: {
				command: 'jekyll build'
			},
			jekyllServe: {
				command: 'bundle exec jekyll serve'
			}
		},

		sass: {
			dist: {
				files: {
					'_site/css/style.css': '_scss/style.scss'
				}
			}
		},

		autoprefixer: {
			dist: {
				files: {
					'_site/css/style.css': '_site/css/style.css'
				}
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'_site/css/style.min.css': ['_site/css/style.css']
				}
			}
		},

		// concat: {
		// 	options: {
		// 		separator: ';;',
		// 		stripBanners: {
		// 			block: true,
		// 			line: true
		// 		}
		// 	},
		// 	dist: {
		// 		src: [
		// 			'node_modules/jquery/dist/jquery.min.js',
		// 			'node_modules/underscore/underscore-min.js',
		// 			'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        //
		// 			'_jssrc/main.js'
		// 		],
		// 		dest: '_site/js/main.js'
		// 	}
		// },

		uglify: {
			my_target: {
				files: {
					'_site/js/main.js': [
						'node_modules/jquery/dist/jquery.min.js',
						'node_modules/underscore/underscore-min.js',
						'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
						'_jssrc/main.js'
					]
				}
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			serve: [
				'watch',
				'shell:jekyllServe'
			]
		},

		watch: {
			sass: {
				files: ['_scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin']
			},
			concat: {
				files: ['_jssrc/**/*.js'],
				tasks: ['uglify']
			}
		}
	});

	grunt.registerTask('serve', [
		'concurrent:serve'
	]);

	grunt.registerTask('build', [
		'shell:jekyllBuild',
		'sass'
	]);
};
