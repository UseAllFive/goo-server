var _;
var matchdep;
var chalk;
var module;

_ = require('underscore');
matchdep = require('matchdep');
chalk = require('chalk');

module.exports = function(grunt) {

    var config;
    var isDevTasks;
    var pkg;
    var tasks;

    pkg = grunt.file.readJSON('package.json');
    config = grunt.file.readYAML('config/grunt.yml').config;
    isDevTasks = !(_.contains(grunt.cli.tasks, 'deploy') || _.contains(grunt.cli.tasks, 'prod'));

    grunt.initConfig({
        pkg: pkg,
        jshint: {
            options: {
                jshintrc: true
            },
            inline: {
                files: {
                    src: config.files.js.app.src
                }
            },
            startup: {
                options: {
                    force: true
                },
                files: {
                    src: config.files.js.app.src
                }
            }
        },
        jscs: {
            inline: {
                files: {
                    src: config.files.js.app.src
                }
            },
            startup: {
                options: {
                    force: true
                },
                files: {
                    src: config.files.js.app.src
                }
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            'pre-commit-hook': {
                src: 'pre-commit-hook.sh',
                dest: '.git/hooks/pre-commit'
            }
        }
    });
    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    tasks = [
        'symlink:pre-commit-hook',
    ];

    // Default grunt task: `grunt`
    grunt.registerTask('default', tasks);

    // Register task for validating code.
    // `grunt validate-code`
    grunt.registerTask('validate-code', ['jshint:inline', 'jscs:inline']);
};
