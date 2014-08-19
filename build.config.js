module.exports = {
    build_dir: 'build',
    compile_dir: 'dist',
    app_files: {
        manifest:'src/manifest.json',
        js: [
            'src/**/!(mock|spec|e2e)*.js',
            '!src/assets/**/*.js'
        ],
        jsunit: [
            'src/app/**/spec.*.js'
        ],
        assets: [
            'src/assets/**/*'
        ],
        templates: [
            '**/*.tpl.html'
        ],
        html: [ 'src/index.html' ],
        less: 'src/less/main.less'
    },
    test_files: {
        mocks: [
            'src/**/mock.*.js'
        ],
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
    vendor_files: {
        js: [
            'vendor/angular/angular.js',
            'vendor/angular-messages/angular-messages.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/angular-ui-utils/ui-utils.js'
        ],
        /** This can be LESS or just reg CSS files **/
        less: [
            'vendor/angular/angular-csp.css',
            'vendor/bootstrap/less/bootstrap.less'
        ],
        assets: []
    }
};