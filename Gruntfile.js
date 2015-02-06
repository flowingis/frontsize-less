
// sudo npm install --save-dev grunt-contrib-compass
// sudo npm install --save-dev grunt-contrib-jshint

/*

Available grunt commands

$ grunt watch:assets     # Copy images inside frontsize/themes/default/img into production images folder
$ grunt watch:frontsize  # Compiles Frontsize
$ grunt watch:frnAssets  # Compiles Frontsize and copy images
$ grunt watch:autoprefix # Compiles Frontsize using Autoprefixer and disabling Frontsize prefixes
$ grunt watch:autoAssets # Compiles Frontsize using Autoprefixer disabling Frontsize prefixes and copy images
$ grunt watch:all        # Performs assets, frontsize, autoprefix and cleanAll tasks

$ grunt assets           # Copy images inside frontsize/themes/default/img into production images folder
$ grunt frontsize        # Compiles Frontsize
$ grunt frnAssets        # Compiles Frontsize and copy images
$ grunt autoprefix       # Compiles Frontsize using Autoprefixer and disabling Frontsize prefixes
$ grunt autoAssets       # Compiles Frontsize using Autoprefixer disabling Frontsize prefixes and copy images
$ grunt all              # Performs assets, frontsize, autoprefix and cleanAll tasks

$ grunt clean            # Uses uncss to minified css to remove unused css if is not used
$ grunt cleanAuto        # Uses uncss to autoprefixed css to remove unused css if is not used
$ grunt cleanAll         # Uses uncss to minified and autoprefixed css to remove unused css if is not used
*/

'use strict';

module.exports = function(grunt) {


    grunt.initConfig({
        f : grunt.file.readJSON('frontsize.json'),

        uncssPages      : [
            'app/index.html',
            'app/about.html'
        ],

        less: {
            production: {
                options: {
                    compress          : true,
                    cleancss          : true,
                    strictUnits       : true,
                    dumpLineNumbers   : 'comments',
                    sourceMap         : true,
                    sourceMapFilename : '<%= f.css %>.map',
                    sourceMapURL      : '<%= f.css %>.map',
                    modifyVars        : {
                        'theme' : '<%= f.themeName %>'
                    }
                },
                files: {
                    '<%= f.css %>' : '<%= f.compile %>'
                }
            },
            autoprefixer: {
                options: {
                    compress          : true,
                    cleancss          : true,
                    strictUnits       : true,
                    dumpLineNumbers   : 'comments',
                    sourceMap         : true,
                    sourceMapFilename : '<%= f.autoprefixerCss %>.map',
                    sourceMapURL      : '<%= f.autoprefixerCss %>.map',
                    modifyVars        : {
                        'theme'          : '<%= f.themeName %>',
                        'use-css-prefix' : false
                    }
                },
                files: {
                    '<%= f.autoprefixerCss %>' : '<%= f.compile %>'
                }
            },
            test: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : 'comments',
                    sourceMap         : true,
                    sourceMapFilename : '<%= f.testCss %>.map',
                    sourceMapURL      : '<%= f.testCss %>.map',
                    modifyVars        : {
                        'theme' : '<%= f.themeName %>'
                    }
                },
                files: {
                    '<%= f.testCss %>' : '<%= f.compileTest %>'
                }
            }
        },

        autoprefixer: {
            options: {
                // browsers: ['> 1%', 'Firefox > 3.6', 'last 10 versions', 'ie 8', 'ie 7', 'Firefox ESR', 'Opera > 10.1'],
                diff : true
            },
            test: {
                src  : '<%= f.autoprefixerCss %>',
                dest : '<%= f.autoprefixerCss %>'
            }
        },

        uncss: {
            production: {
                options: {
                    ignore       : [ '#added_at_runtime', /test\-[0-9]+/],
                    media        : [ '(min-width: 700px) handheld and (orientation: landscape)'],
                    csspath      : '<%= f.productionCss %>',
                    raw          : '',
                    stylesheets  : [ '<%= f.testCss %>' ],
                    ignoreSheets : [ ],
                    timeout      : 1000,
                    htmlroot     : 'public',
                    report       : 'min'
                },
                files: {
                    '<%= f.css %>' : '<%= uncssPages %>'
                }
            }
        },

        watch: {
            options: {
                atBegin : true,
                event: [
                    'added',
                    'changed'
                ]
            },
            frontsize : {
                files : [ '*.less', '**/*.less' ],
                tasks : [ 'frontsize' ]
            },
            devAssets : {
                files : [ '*.less', '**/*.less' ],
                tasks : [ 'devAssets' ]
            },
            autoprefix : {
                files : [ '*.less', '**/*.less' ],
                tasks : [ 'autoprefix' ]
            },
            autoAssets : {
                files : [ '*.less', '**/*.less' ],
                tasks : [ 'autoAssets' ]
            },
            all : {
                files : [ '*.less', '**/*.less' ],
                tasks : [ 'all' ]
            }
        },

        csslint: {
            test: {
                options: {
                    csslintrc : '.csslintrc'
                },
                src: ['<%= f.testCss %>']
            }
        },

        clean: {
            assets: {
                src: [
                    '<%= f.productionImg %>*'
                ]
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        expand  : true,
                        flatten : true,
                        src     : [ 'themes/<%= f.themeName %>/img/*' ],
                        dest    : '<%= f.productionImg %>',
                        filter  : 'isFile'
                    }
                ]
            }
        }

    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('frontsize', [
        'less:production',
        'test',
        'clean'
    ]);

    grunt.registerTask('devAssets', [
        'less:production',
        'test',
        'assets'
    ]);

    grunt.registerTask('autoprefix', [
        'less:autoprefixer',
        'test',
        'autoprefixer',
        'cleanAuto'
    ]);

    grunt.registerTask('autoAssets', [
        'less:autoprefixer',
        'test',
        'autoprefixer',
        'cleanAuto',
        'assets'
    ]);

    grunt.registerTask('all', [
        'less:production',
        'less:autoprefixer',
        'test',
        'autoprefixer',
        'assets',
        'cleanAll'
    ]);

    grunt.registerTask('assets', [
        'clean:assets',
        'copy:assets'
    ]);

    grunt.registerTask('test', [
        'less:test',
        'csslint:test'
    ]);

    grunt.registerTask('cleanAll', [
        //'uncss:production',
        //'uncss:autoprefixer'
    ]);

    grunt.registerTask('clean', [
        //'uncss:production'
    ]);

    grunt.registerTask('cleanAuto', [
        //'uncss:autoprefixer'
    ]);
};
