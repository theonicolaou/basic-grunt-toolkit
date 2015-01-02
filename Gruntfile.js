module.exports = function (grunt) {
// load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    
			grunt.initConfig({
  		
  		//clean main compiled css file and minified version.
  		clean: {
    		css: ['css/tn.css', 'css/tn.min.css']
			},
  		
  		//compile SCSS files into CSS.
  		sass: {
    		dist: {
      		files: {
        		'css/tn.css': 'scss/tn.scss',
      		},
      		options: {
      			sourcemap: 'none'
      		},
      	}
  		},
  		
  		//lint main CSS file.
  		csslint: {
  			strict: {
    			options: {
      			import: 2
    			},
    			src: ['css/tn.css']
  			},
/*
  			lax: {
    			options: {
      			import: false
    			},
    			src: ['css/tn.css']
  			},
*/
			},
			
			//watch for changes to SCSS files.
  		watch: {
    		sass: {
      		files: ['scss/*/*.scss'],
      		tasks: ['sass'],
    		},
    	},
    	
    	//concatenate all CSS files with .css extension in "css" folder.
    	concat: {
  			css: {
    			src: ['css/*.css'],
    			dest: 'css/tn.css'
  			}
			},
			
			//minify main CSS file.
    	cssmin: {
  			target: {
    			files: [{
      			expand: true,
      			cwd: 'css',
      			src: 'tn.css',
      			dest: 'css',
      			ext: '.min.css'
    			}]
  			}
			},
  		
  		//configurations for OS X notifications, for each task.
  		notify: {
  			clean: {
  				options: {
  				  title: "Clean",
      			message: "CSS file clean complete",
      			success: true,
      			duration: 5	
  				}
  			},
  			
  			sass: {
  				options: {
  				  title: "SCSS Compilation",
      			message: "SCSS compilation complete",
      			success: true,
      			duration: 5	
  				}
  			},
  			
  			watch: {
  				options: {
  				  title: "Watch",
      			message: "SCSS Watch in progress",
      			success: true,
      			duration: 5	
  				}
  			},
  			
  			concat: {
  				 	options: {
  				 	title: "CSS file concatenation",
      			message: "CSS files concatenated",
      			success: true,
      			duration: 5
  				}
  			},
  			
  			cssmin: {
  				  options: {
  				  title: "CSS file minification",
      			message: "CSS files minified",
      			success: true,
      			duration: 5
  				}
  			},
  			
  			csslint: {
  				options: {
      			title: "CSS Lint",
      			message: "CSS lint complete",
      			success: true,
      			duration: 5
    			}
  			}
  		}	  		
  });
  
	grunt.registerTask('develop', ['clean', 'notify:clean', 'sass', 'notify:sass', 'watch', 'notify:watch']);
	grunt.registerTask('lintcss', ['csslint', 'notify:csslint']);
	grunt.registerTask('build', ['clean', 'notify:clean', 'sass', 'notify:sass', 'concat:css', 'notify:concat', 'cssmin', 'notify:cssmin']);
};