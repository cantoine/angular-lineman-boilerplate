/*global module:false*/
/*module.exports = function(grunt) {
  require('./config/lineman').config.grunt.run(grunt);
};*/
module.exports = function( grunt ) {

    // Load the tasks we need
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-testem');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-debug-task');

    // Load custom tasks for Action Hero
    grunt.loadTasks('./tasks/');

    var userConfig = require( './build.config.js' );

    taskConfig = {
        pkg: grunt.file.readJSON('package.json'),
        clean: [
          '<%= build_dir %>',
          '<%= compile_dir %>'
        ],
        concat: {
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= vendor_files.js %>',
                    'module.prefix',
                    '<%= app_files.js %>',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
            },
            compile_spec: {
                src: '<%= test_files.client.spec %>',
                dest: '<%= compile_dir %>/spec.js'
            }
        },
        copy: {
            build_manifest: {
                files: [ 
                    {
                        src: '<%= app_files.manifest %>',
                        dest: '<%= build_dir %>/manifest.json',
                        cwd: '.'
                    }
                ]
            },
            build_app_assets: {
                files: [
                    {
                        src: '<%= app_files.assets %>',
                        dest: '<%= build_dir %>/assets/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendor_assets: {
                files: [
                    {
                        src: [ '<%= vendor_files.assets %>' ],
                        dest: '<%= build_dir %>/assets/',
                        cwd: '.',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            build_appjs: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_spec: {
                files: [
                    {
                        src: [ '<%= test_files.client.spec %>' ],
                        dest: '<%= build_dir %>',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
        },
        delta: {
            /**
            * Adding option to reload browser when any change is saved. 
            * Defaulting to false.
            */
            options: {
                livereload: false
            },
            /**
            * When the Gruntfile changes, we just want to lint it. In fact, when
            * your Gruntfile changes, it will automatically be reloaded!
            */
            gruntfile: {
                files: [ 'Gruntfile.js', 'build.config.js' ],
                tasks: [ 'jshint:gruntfile', 'build' ],
                options: {
                    livereload: false
                }
            },

            /**
            * When our JavaScript source files change, we want to run lint them and
            * run our unit tests.
            */
            jssrc: {
                files: '<%= app_files.js %>',
                tasks: [ 'jshint:app', 'copy:build_appjs' ]
            },

            manifest: {
                files: '<%= app_files.manifest %>',
                tasks: ['copy:build_manifest']
            },

            /**
            * When assets are changed, copy them. Note that this will *not* copy new
            * files, so this is probably not very useful.
            */
            assets: {
                files: '<%= app_files.assets %>',
                tasks: [ 'copy:build_app_assets' ]
            },

            /**
            * When index.html changes, we need to compile it.
            */
            html: {
                files: [ '<%= app_files.html %>' ],
                tasks: [ 'index:build' ]
            },

            ngtemplates: {
                files: '<%= app_files.templates %>',
                tasks: [ 'ngtemplates' ]
            },

            /**
            * When the CSS files change, we need to compile and minify them.
            */
            less: {
                files: [ 'src/**/*.less' ],
                tasks: [ 'less:development' ]
            },

            spec: {
                files: [ '<%= test_files.client.spec %>' ],
                tasks: [ 'copy:build_spec' ]
            }
        },
        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= build_dir %>/assets/*.css',
                    '<%= ngtemplates.build.dest %>',
                ]
            },
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= less.production.files[0].dest %>'
                ]
            }
        },
        jshint: {
            app: [
                '<%= app_files.js %>'
            ],
            test: [
                '<%= app_files.jsunit %>'
            ],
            gruntfile: [
                'Gruntfile.js',
                'build.config.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            }
        },
        less: {
            development: {
                options: {
                    sourceMap: true
                },
                files: [
                    {
                        dest: '<%= build_dir %>/assets/app-<%= pkg.version %>.css',
                        src: '<%=app_files.less %>'
                    },
                    {
                        dest: '<%= build_dir %>/assets/vendor-<%= pkg.version %>.css',
                        src: '<%=vendor_files.less %>'
                    }
                ]
            },
            production: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: [
                    {
                        dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css',
                        src: [
                            '<%=vendor_files.less %>',
                            '<%=app_files.less %>'
                        ]
                    }
                ]
            }
        },
        /**
        * The banner is the comment that is placed at the top of our compiled
        * source files. It is first processed as a Grunt template, where the `<%=`
        * pairs are evaluated based on this very configuration object.
        */
        meta: {
            banner:
                '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n'
        },
        mochaTest: {
            spec: {
                options: {
                    reporter: 'tap'
                },
                src: '<%= test_files.server.spec %>'
            },
            e2e: {
                options: {
                    reporter: 'tap'
                },
                src: '<%= test_files.server.e2e %>'
            }
        },
        protractor: {
            options: {
                configFile: 'node_modules/protractor/referenceConf.js',
                keepAlive: true,
                chromeOnly: false,
                args: {
                }
            },
            development: {
                options: {
                    args: {
                        baseUrl: 'http://localhost:9090',
                        seleniumAddress: 'http://localhost:4444/wd/hub',
                        specs: '<%= test_files.client.e2e %>',
                        browser: 'chrome',
                        verbose: true
                    }
                }
            },
            ci: {
                options: {
                    args: {
                        seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.39.0.jar',
                        specs: '<%= test_files.client.e2e %>',
                        browser: 'chrome'
                    }
                }
            }
        },
        ngmin: {
            compile: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        cwd: '<%= compile_dir %>',
                        dest: '<%= compile_dir %>',
                        expand: true
                    }
                ]
            }
        },
        ngtemplates: {
            build: {
                src: '<%= app_files.templates %>',
                dest: '<%= build_dir %>/src/templates.js',
                cwd: 'src/app',
                options: {
                    module: '<%= pkg.name %>'
                }
            },
            compile: {
                src: '<%= app_files.templates %>',
                dest: '<%= compile_dir %>/src/templates.js',
                options: {
                    module: '<%= pkg.name %>'
                }
            }
        },
        testem: {
            dev: {
                options: {
                    serve_files: grunt.util._.union( userConfig.test_files.client.app, userConfig.test_files.client.spec).map(function(path){ return '<%= build_dir %>/' + path; }),
                    watch_files: [ '<%= build_dir %>/**/*.*', 'server/*.*' ],
                    launchers: {
                        "API Unit": {
                            command: 'grunt mochaTest:spec',
                            protocol: "tap"
                        },
                        "API Integration": {
                            command: 'grunt mochaTest:e2e',
                            protocol: "tap"
                        }
                    },
                    parallel: 8,
                    launch_in_dev: [ 'Chrome', 'API Unit', 'API Integration']
                }
            },
            production: {
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= concat.compile_spec.dest %>'
                ],
                options: {
                    serve_files: grunt.util._.union( userConfig.test_files.client.app, userConfig.test_files.client.spec),
                    parallel: 8,
                    launchers: {
                        "API Unit": {
                            command: 'grunt mochaTest:spec',
                            protocol: "tap"
                        },
                        "API Integration": {
                            command: 'grunt mochaTest:e2e',
                            protocol: "tap"
                        }
                    },
                    launch_in_ci: [ 'Chrome', 'API Unit', 'API Integration' ]
                }
            }
        },
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },
    };

    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    grunt.renameTask( 'watch', 'delta' );
    grunt.registerTask( 'watch', [ 'build', 'delta' ] );
    grunt.registerTask( 'default', [ 'build', 'compile' ] );
    grunt.registerTask( 'build', [
        'clean', 'ngtemplates:build', 'jshint', 'less:development', 'copy:build_app_assets', 'copy:build_appjs', 
        'copy:build_vendor_assets', 'copy:build_vendorjs', 'copy:build_manifest', 'index:build'
    ]);
    grunt.registerTask( 'compile', [
        'clean', 'jshint:app', 'less:production', 'concat:compile_js', 'uglify', 'index:compile'
    ]);

    grunt.registerTask( 'test-watch', [ 'copy:build_spec', 'testem:run:dev' ]);

    grunt.registerTask( 'server-spec', [ 'mochaTest:spec' ]);
    grunt.registerTask( 'server-e2e', [ 'mochaTest:e2e' ]);

    grunt.registerTask( 'test-server', [ 'mochaTest:spec', 'mochaTest:e2e' ]);
    grunt.registerTask( 'test-client', [ 'compile', 'testem:ci:production', 'protractor:test' ]);
    grunt.registerTask( 'test-application', [ 'test-client', 'test-server'  ]);

    /**
    * A utility function to get all app JavaScript sources.
    */
    function filterForJS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.js$/ );
        });
    }

    /**
    * A utility function to get all app CSS sources.
    */
    function filterForCSS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.css$/ );
        });
    }

    grunt.registerMultiTask( 'index', 'Process index.html template', function () {
        var dirRE = new RegExp( '^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g' ),
            jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
                return file.replace( dirRE, '' );
            }),
            cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
                return file.replace( dirRE, '' );
            });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function ( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config( 'pkg.version' )
                    }
                });
            }
        });
    });
};