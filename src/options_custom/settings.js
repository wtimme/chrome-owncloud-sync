$.noConflict();

jQuery(document).ready(function () {

    new FancySettings.initWithManifest(function (settings) {
        settings.manifest.loginButton.addEvent("action", function () {
            var serverUrl = settings.manifest.serverUrl.element.value,
                username    = settings.manifest.username.element.value,
                password    = settings.manifest.password.element.value,
                successCallback = function () {
                    alert('logged in successfully.');
                },
                errorCallback   = function () {
                    alert('Error while logging in.');
                };

            ownCloudBookmarkServer.init(serverUrl, true);

            ownCloudBookmarkServer.loginWithCredentials(username, password, successCallback, errorCallback);
        });
    });
});