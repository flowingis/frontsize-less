module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            develop: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "css/frontsize-less-2.0.0/test/frontsize.css.map"
                },
                files: {
                    "css/frontsize-less-2.0.0/test/frontsize.css" : "css/frontsize-less-2.0.0/compile.less"
                }
            },
            production: {
                options: {
                    compress          : true,
                    cleancss          : true,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "css/frontsize.min.css.map"
                },
                files: {
                    "css/frontsize.min.css" : "css/frontsize-less-2.0.0/compile.less"
                }
            },
            test: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "css/frontsize-less-2.0.0/test/frontsize.test.css.map"
                },
                files: {
                    "css/frontsize-less-2.0.0/test/frontsize.test.css" : "css/frontsize-less-2.0.0/test.less"
                }
            },
            testAutoprefixer: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "css/frontsize-less-2.0.0/test/frontsize.autoprefixer.css.map",
                    modifyVars: {
                        "use-css-prefix": false
                    }
                },
                files: {
                    "css/frontsize-less-2.0.0/test/frontsize.test.autoprefixer.css" : "css/frontsize-less-2.0.0/test_autoprefixer.less"
                }
            }
        },

        autoprefixer: {
            options: {
                // browsers: ["> 1%", "Firefox > 3.6", "last 10 versions", "ie 8", "ie 7", "Firefox ESR", "Opera > 10.1"],
                diff: true
            },
            test: {
                src: "css/frontsize-less-2.0.0/test/frontsize.test.autoprefixer.css",
                dest: "css/frontsize-less-2.0.0/test/frontsize.autoprefixer.css"
            }
        },

        watch: {
            options: {
                atBegin : true,
                event: ["added", "changed"],
            },
            develop : {
                files: [
                    "*.less",
                    "**/*.less"
                ],
                tasks: [
                    "less:production",
                    "less:test",
                    "csslint:test",
                    "assets"
                ]
            }
        },

        csslint: {
            options: {
                csslintrc : ".csslintrc"
            },
            test: {
                options: {
                    csslintrc : ".csslintrc"
                },
                src: ["css/frontsize-less-2.0.0/test/frontsize.test.css"]
            },
            testMin: {
                options: {
                    csslintrc : ".csslintrc"
                },
                src: ["css/frontsize-less-2.0.0/test/frontsize.test.min.css"]
            },
            testPrefixed: {
                options: {
                    csslintrc : ".csslintrc"
                },
                src: ["css/frontsize-less-2.0.0/test/frontsize.prefixed.css"]
            }
        },

        clean: {
            assets: {
                src: [
                    "img/theme"
                ]
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        expand  : true,
                        flatten : true,
                        src     : ["css/frontsize-less-2.0.0/themes/default/img/theme/*"],
                        dest    : "img/theme/",
                        filter  : "isFile"
                    }
                ]
            }
        }

    });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("production", [
        "less:production"
    ]);

    grunt.registerTask("develop", [
        "watch:develop"
    ]);

    grunt.registerTask("assets", [
        "clean:assets",
        "copy:assets"
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
