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

        autoprefixer: {
              options: {
                    // browsers: ['> 1%', 'Firefox > 3.6', 'last 10 versions', 'ie 8', 'ie 7', 'Firefox ESR', 'Opera > 10.1'],
                    diff: true
              },
              default: {
                    src: "test/frontsize.css",
                    dest: "test/frontsize.prefixed.css"
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
            },
            test_prefixed: {
                options: {
                  csslintrc: '.csslintrc'
                },
                src: ['test/frontsize.prefixed.css']

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


    grunt.registerTask("prefix", [ 
        "less:test", 
        "autoprefixer:default",
        "csslint:test_prefixed" 
    ]);

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
