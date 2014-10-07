/*

Available grunt commands

$ grunt watch:assets     # Copy images inside frontsize/themes/default/img into production images folder
$ grunt watch:frontsize  # Compiles Frontsize
$ grunt watch:frnAssets  # Compiles Frontsize and copy images
$ grunt watch:autoprefix # Compiles Frontsize using Autoprefixer and disabling Frontsize prefixes
$ grunt watch:autoAssets # Compiles Frontsize using Autoprefixer disabling Frontsize prefixes and copy images
$ grunt watch:all        # Performs assets, frontsize and autoprefix tasks

$ grunt assets           # Copy images inside frontsize/themes/default/img into production images folder
$ grunt frontsize        # Compiles Frontsize
$ grunt frnAssets        # Compiles Frontsize and copy images
$ grunt autoprefix       # Compiles Frontsize using Autoprefixer and disabling Frontsize prefixes
$ grunt autoAssets       # Compiles Frontsize using Autoprefixer disabling Frontsize prefixes and copy images
$ grunt all              # Performs assets, frontsize and autoprefix tasks

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
                    sourceMapURL      : "<%= productionCss %>.map",
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
                    sourceMapURL      : "<%= autoprefixerCss %>.map",
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
                    sourceMapURL      : "<%= testCss %>.map",
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
            frontsize : {
                files: [ "*.less", "**/*.less" ],
                tasks: [ "frontsize" ]
            },
            devAssets : {
                files: [ "*.less", "**/*.less" ],
                tasks: [ "devAssets" ]
            },
            autoprefix : {
                files: [ "*.less", "**/*.less" ],
                tasks: [ "autoprefix" ]
            },
            autoAssets : {
                files: [ "*.less", "**/*.less" ],
                tasks: [ "autoAssets" ]
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

    grunt.registerTask("frontsize", [
        "less:production",
        "test"
    ]);

    grunt.registerTask("devAssets", [
        "less:production",
        "test",
        "assets"
    ]);

    grunt.registerTask("autoprefix", [
        "less:autoprefixer",
        "test",
        "autoprefixer"
    ]);

    grunt.registerTask("autoAssets", [
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
