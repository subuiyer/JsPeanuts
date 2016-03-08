/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-qunit-junit');
 
    grunt.registerTask('test', ['qunit_junit', 'qunit']);
    
    grunt.initConfig({
		
	jshint: {
            all: ['Gruntfile.js', 'src/**/*.js']
        },
        qunit_junit: {
            options: {
                dest: 'reports'
            }
        },
        qunit: {
            all: ['test/**/*.html']
        }
		
    });
};
