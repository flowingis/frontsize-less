module.exports = function(grunt) {
    grunt.initConfig({
        // running `grunt less` will compile once
        less: {
            development: {
                options: {
                    compress: false,
                    cleancss: false
                },
                files: {
                    "test/frontsize.css" : "compile.less"
                }
            },
            test: {
                options: {
                    compress: false,
                    cleancss: false
                },
                files: {
                    "test/frontsize.css" : "test.less"
                }
            }
        },

        csso: {
            options: {
                restructure: true
            },
            production: {
                files: {
                    "test/frontsize.min.css": ["test/frontsize.css"]
                }
            }
        },

        watch: {
            development : {
                files: [
                    "*.less",
                    "**/*.less"
                ],
                tasks: [
                    "less:development",
                    "csso:production"
                ]
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            test: {
                options: {
                  csslintrc: '.csslintrc'
                },
                src: ['test/frontsize.css']
            },
            test_min: {
                options: {
                  csslintrc: '.csslintrc'
                },
                src: ['test/frontsize.min.css']
            }
        },

        phantomcss: {
            options: {},
            your_target: {
                options: {
                    screenshots: 'test/screenshots/',
                    results: 'results/'
                },
                src: [
                    'test/**/*.js'
                ]
            }
        }
    });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("test", [
        "less:test",
        "csslint:test"
    ]);

    grunt.registerTask("test_min", [
        "less:test",
        "csso:production",
        "csslint:test_min"
    ]);
};
