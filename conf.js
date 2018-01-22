exports.config = {
    framework: 'mocha',
    'autoStartStopServer': true,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ["--headless", "--start-maximized", "--disable-gpu", "--no-sandbox"]
        },
        shardTestFiles: true,
        maxInstances: 4
    },
    restartBrowserBetweenTests: false,
    specs: ['beeDrillCore.js'],
    seleniumAddress: 'http://localhost:4444/wd/hub/',
    mochaOpts: {
        reporter: 'spec',
        timeout: 30000
    },
    seleniumSeverJar: './node_modules/selenium-server/lib/runner/selenium-server-standalone-3.6.0.jar',
    onPrepare: function() {
        require('./lib/waitReady')
    }
};