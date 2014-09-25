/*

Available grunt commands

$ grunt watch:develop
$ grunt watch:fullDev
$ grunt watch:autoprefix
$ grunt watch:fullAutoprefix
$ grunt watch:all

$ grunt develop
$ grunt fullDev
$ grunt autoprefix
$ grunt fullAutoprefix
$ grunt all

*/


module.exports = function(grunt) {
    grunt.initConfig({

        compileFile     : "compile.less",
        compileFileTest : "compile-test.less",
        themeName       : "default",
        themeImg        : "themes/default/img/",
        testCss         : "test/frontsize.test.css",
        autoprefixerCss : "test/frontsize.autoprefixer.css",
        productionCss   : "test/frontsize.min.css",
        productionImg   : "img/theme/",

        less: {
            production: {
                options: {
                    compress          : true,
                    cleancss          : true,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "<%= productionCss %>.map",
                    modifyVars        : {
                        "theme" : "<%= themeName %>"
                    }
                },
                files: {
                    "<%= productionCss %>" : "<%= compileFile %>"
                }
            },
            autoprefixer: {
                options: {
                    compress          : true,
                    cleancss          : true,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "<%= autoprefixerCss %>.map",
                    modifyVars        : {
                        "theme"          : "<%= themeName %>",
                        "use-css-prefix" : false
                    }
                },
                files: {
                    "<%= autoprefixerCss %>" : "<%= compileFile %>"
                }
            },
            test: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "<%= testCss %>.map",
                    modifyVars        : {
                        "theme" : "<%= themeName %>"
                    }
                },
                files: {
                    "<%= testCss %>" : "<%= compileFileTest %>"
                }
            }
        },

        autoprefixer: {
            options: {
                // browsers: ["> 1%", "Firefox > 3.6", "last 10 versions", "ie 8", "ie 7", "Firefox ESR", "Opera > 10.1"],
                diff : true
            },
            test: {
                src  : "<%= autoprefixerCss %>",
                dest : "<%= autoprefixerCss %>"
            }
        },

        watch: {
            options: {
                atBegin : true,
                event: [
                    "added",
                    "changed"
                ]
            },
            develop : {
                files: [ "*.less", "**/*.less" ],
                tasks: [ "develop" ]
            },
            fullDev : {
                files: [ "*.less", "**/*.less" ],
                tasks: [ "fullDev" ]
            },
            autoprefix : {
                files: [ "*.less", "**/*.less" ],
                tasks: [ "autoprefix" ]
            },
            fullAutoprefix : {
                files: [ "*.less", "**/*.less" ],
                tasks: [ "fullAutoprefix" ]
            },
            all : {
                files: [ "*.less", "**/*.less" ],
                tasks: [ "all" ]
            }
        },

        csslint: {
            test: {
                options: {
                    csslintrc : ".csslintrc"
                },
                src: ["<%= testCss %>"]
            }
        },

        clean: {
            assets: {
                src: [
                    "<%= productionImg %>*"
                ]
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        expand  : true,
                        flatten : true,
                        src     : [ "<%= themeImg %>*" ],
                        dest    : "<%= productionImg %>",
                        filter  : "isFile"
                    }
                ]
            }
        }

    });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("develop", [
        "less:production",
        "test"
    ]);

    grunt.registerTask("fullDev", [
        "less:production",
        "test",
        "assets"
    ]);

    grunt.registerTask("autoprefix", [
        "less:autoprefixer",
        "test",
        "autoprefixer"
    ]);

    grunt.registerTask("fullAutoprefix", [
        "less:autoprefixer",
        "test",
        "autoprefixer",
        "assets"
    ]);

    grunt.registerTask("all", [
        "less:production",
        "less:autoprefixer",
        "test",
        "autoprefixer",
        "assets"
    ]);

    grunt.registerTask("assets", [
        "clean:assets",
        "copy:assets"
    ]);

    grunt.registerTask("test", [
        "less:test",
        "csslint:test"
    ]);
};
