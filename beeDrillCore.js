var superagent = require('superagent')
var chai = require('chai')
var expect = chai.expect;

var data = require('./data')
var login = require('./lib/login')

describe('Bee-drill tests', function() {
    beforeEach(function() {

        browser.wait(function() {
            browser.sleep(2000)
            return true;
        }).then(function() {});
    });

    //1. login begin
    it('should attempt but fail a DoS NoSQL injection on login', function() {
        login.login();
        login.validatelogin();
    });   
});
    