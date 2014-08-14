module.exports = {
    build_dir: 'build',
    compile_dir: 'bin',
    server: {
        dir: process.cwd() + '/server',
        config: {
            logger: {
                transports: null
            }
        }
    },
    app_files: {
        manifest:'src/manifest.json',
        js: [
            'src/background.js',
            'src/**/!(spec|e2e)*.js',
            '!src/assets/**/*.js',
            '!src/spec/helpers/*.js'
        ],
        assets: [
            'src/assets/**/*'
        ],

        jsunit: [
            'src/app/**/spec.*.js'
        ],

        templates: [
            'src/**/*.tpl.html'
        ],

        html: [ 'src/index.html' ],
        less: 'src/less/main.less'
    },
    test_files: {
        client: {
            app:[
                'vendor/angular/angular.js',
                'src/app/**/!(spec|e2e)*.js'
            ],
            spec:[
                'vendor/angular-mocks/angular-mocks.js',
                'src/**/spec.*.js',
            ],
            e2e:[
                'src/**/e2e.*.js',
            ]
        },
        server: {
            spec:[
                '<%= server.dir %>/**/*.spec.js',
            ],
            e2e:[
                '<%= server.dir %>/**/*.e2e.js',
            ]
        }
    },
    vendor_files: {
        js: [
            'vendor/jaydata/release/jaydata.js',
            'vendor/angular/angular.js',
            'vendor/jaydata/JayDataModules/angular.js'
        ],
        /** This can be LESS or just reg CSS files **/
        less: [
            'vendor/angular/angular-csp.css',
            'vendor/bootstrap/less/bootstrap.less'
        ],
        assets: []
    }
};