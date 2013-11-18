/**
 * ownCloud sync extension
 */

var ownCloudSyncExtension = (function () {
    var that = this;

    that.Initialize = function () {
        LoginForm.Initialize();

        jQuery('#logout-button').on('click', function (event) {
            var bookmark = new ownCloudBookmark('https://your-domain.org/', 'I have a title.', ['test04', 'test05']);
            ownCloudBookmarkServer.addBookmark(bookmark);

            // ownCloudBookmarkServer.logout(function () {
            //     console.info('Logout successful.');
            // }, function () {
            //     console.warn('Error while logging out.');
            // });
        });
    };

    return {
        Initialize : that.Initialize
    };
}());