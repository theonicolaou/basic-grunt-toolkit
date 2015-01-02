module.exports = function (grunt) {
// load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    
			grunt.initConfig({
  		
  		clean: {
    		css: ['css/tn.css', 'css/tn.min.css']
			},
  		
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
  		
  		csslint: {
  			strict: {
    			options: {
      			import: 2
    			},
    			src: ['css/tn.css']
  			},
  			lax: {
    			options: {
      			import: false
    			},
    			src: ['css/tn.css']
  			}
			},

  		watch: {
    		sass: {
      		files: ['scss/*/*.scss'],
      		tasks: ['sass'],
    		},
    	},
    	
    	concat: {
  			css: {
    			src: ['css/*.css'],
    			dest: 'css/tn.css'
  			}
			},
			
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
			
    	notify_hooks: {
    		options: {
      		enabled: true,
      		title: "Grunt tasks completed",
      		success: true,
      		duration: 5
    		}
  		}	  		
  });

	grunt.registerTask('develop', ['clean', 'sass', 'watch', 'csslint', 'notify_hooks']);
	grunt.registerTask('build', ['clean', 'sass', 'concat:css', 'cssmin', 'notify_hooks']);
};