var data = require('../data')
var chai = require('chai')
var expect = chai.expect;

module.exports = {

    login: function() {

        browser.get(data.url);

        browser.sleep(3000);
        element(by.model('<auth model>.username')).sendKeys(data.credentials.emailOne);
        element(by.model('<auth model>.password')).sendKeys(data.credentials.emailOnePass);
        element(by.id('Login-Button')).click();
        browser.sleep(3000);
    },
    invalidatelogin: function() {
        browser.getTitle().then(function(title) {
            expect(title).to.equal(data.test_one.exp_title);
        });
    },
}