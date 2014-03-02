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
                    "css/frontsize.css" : "compile.less"
                }
            }
        },
        csso: {
            options: {
                restructure: true
            },
            production: {
                files: {
                    "css/frontsize.min.css": ["css/frontsize.css"]
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
                src: ['css/frontsize.production.css']
            },
            test_min: {
                options: {
                  csslintrc: '.csslintrc'
                },
                src: ['css/frontsize.min.css']
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks("grunt-csso");

    grunt.registerTask("test", [
        "less:development",
        "csslint:test"
    ]);

    grunt.registerTask("test_min", [
        "less:development",
        "csso:production",
        "csslint:test_min"
    ]);
};
