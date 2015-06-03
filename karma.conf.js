// karma.conf.js
module.exports = function(config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            "test/**/*",
            "js/*"
        ],
        browsers: [
            "PhantomJS"
        ]
    });
};
