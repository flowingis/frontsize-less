module.exports = function(grunt) {
    grunt.initConfig({
        // running `grunt less` will compile once
        less: {
            development: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.map.css"
                },
                files: {
                    "test/frontsize.css" : "compile.less"
                }
            },
            test: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.test.map.css"
                },
                files: {
                    "test/frontsize.test.css" : "test.less"
                }
            },
            testAutoprefixer: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.autoprefixer.map.css",
                    modifyVars: {
                        "use-css-prefix": false
                    }
                },
                files: {
                    "test/frontsize.test.autoprefixer.css" : "test_autoprefixer.less"
                }
            }
        },

        autoprefixer: {
              options: {
                    // browsers: ['> 1%', 'Firefox > 3.6', 'last 10 versions', 'ie 8', 'ie 7', 'Firefox ESR', 'Opera > 10.1'],
                    diff: true
              },
              test: {
                    src: "test/frontsize.test.autoprefixer.css",
                    dest: "test/frontsize.autoprefixer.css"
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
            },
            test: {
                files: {
                    "test/frontsize.test.min.css": ["test/frontsize.test.css"]
                }
            },
            testAutoprefixer: {
                files: {
                    "test/frontsize.test.min.css": ["test/frontsize.test.autoprefixer.css"]
                }
            },
            autoprefixer: {
                files: {
                    "test/frontsize.autoprefixer.min.css": ["test/frontsize.autoprefixer.css"]
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
                src: ['test/frontsize.test.css']
            },
            testMin: {
                options: {
                  csslintrc: '.csslintrc'
                },
                src: ['test/frontsize.test.min.css']
            },
            testPrefixed: {
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
        "csslint:testPrefixed" 
    ]);

    grunt.registerTask("test_all", [
        "test",
        "testAutoprefixer",
        "test_min",
        "production"
    ]);

    grunt.registerTask("test", [
        "less:test",
        "csso:test",
        "csslint:test"
    ]);

    grunt.registerTask("testAutoprefixer", [
        "less:testAutoprefixer",
        "autoprefixer",
        "csso:testAutoprefixer",
        "csso:autoprefixer",
        "csslint:test"
    ]);

    grunt.registerTask("test_min", [
        "less:test",
        "csso:test",
        "csslint:testMin"
    ]);

    grunt.registerTask("production", [
        "less:development",
        "csso:production"
    ]);

};
