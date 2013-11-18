/**
 * Login form
 */

var LoginForm = (function () {
    var that    = this;

    that.library = new Library();

    that.Initialize = function () {
        that.fetchElements();
        that.setupEventListeners();
    };

    that.getLibary = function () {
        return that.library;
    };

    that.fetchElements = function () {
        var library         = that.getLibary(),
            form            = jQuery('#login-form'),
            urlInput        = form.find('#url'),
            usernameInput   = form.find('#username'),
            passwordInput   = form.find('#password'),
            submitButton    = form.find('button[type=submit]');

        library.set('form', form);
        library.set('urlInput', urlInput);
        library.set('submitButton', submitButton);
        library.set('usernameInput', usernameInput);
        library.set('passwordInput', passwordInput);
    };

    that.setupEventListeners = function () {
        var library = that.getLibary();

        library.get('submitButton').on('click', that.onDidClickSubmitButton);
    };

    /**
     * Events
     */
    that.onDidClickSubmitButton = function (event) {
        var library     = that.getLibary(),
            url         = library.get('urlInput').val(),
            username    = library.get('usernameInput').val(),
            password    = library.get('passwordInput').val();

        ownCloudBookmarkServer.loginWithCredentials(username, password, that.onDidLogin, that.onDidFailToLogin);

        event.preventDefault();
    };

    that.onDidLogin = function () {
        console.debug('Show success message, hide form.');
    };

    that.onDidFailToLogin = function () {
        console.debug('Show warning!');
    };

    return {
        Initialize  : that.Initialize
    };
}());