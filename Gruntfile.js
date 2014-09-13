module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.css.map"
                },
                files: {
                    "test/frontsize.css" : "compile.less"
                }
            },
            production: {
                options: {
                    compress          : true,
                    cleancss          : true,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.min.css.map"
                },
                files: {
                    "test/frontsize.min.css" : "compile.less"
                }
            },
            test: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.test.css.map"
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
                    sourceMapFilename : "test/frontsize.autoprefixer.css.map",
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
                // browsers: ["> 1%", "Firefox > 3.6", "last 10 versions", "ie 8", "ie 7", "Firefox ESR", "Opera > 10.1"],
                diff: true
            },
            test: {
                src: "test/frontsize.test.autoprefixer.css",
                dest: "test/frontsize.autoprefixer.css"
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
                csslintrc: ".csslintrc"
            },
            test: {
                options: {
                    csslintrc: ".csslintrc"
                },
                src: ["test/frontsize.test.css"]
            },
            testMin: {
                options: {
                    csslintrc: ".csslintrc"
                },
                src: ["test/frontsize.test.min.css"]
            },
            testPrefixed: {
                options: {
                    csslintrc: ".csslintrc"
                },
                src: ["test/frontsize.prefixed.css"]
            }
        },

        phantomcss: {
            options: {},
            your_target: {
                options: {
                    screenshots: "test/screenshots/",
                    results: "results/"
                },
                src: [
                    "test/**/*.js"
                ]
            }
        }
    });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("production", [
        "test",
        "testAutoprefixer",
        "test_min",
        "production"
    ]);

    grunt.registerTask("test", [
        "less:test",
        "csslint:test"
    ]);

    grunt.registerTask("testAutoprefixer", [
        "less:testAutoprefixer",
        "autoprefixer",
        "csslint:test"
    ]);

    grunt.registerTask("test_min", [
        "less:test",
        "csslint:testMin"
    ]);
};
