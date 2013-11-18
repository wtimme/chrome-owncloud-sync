/**
 * ownCloud bookmark server
 */

var ownCloudBookmarkServer = (function () {
    var that = this;

    that.useSSL = function () {
        var useSSL = true;

        if (useSSL) {
            console.log('Using SSL for connection.');
        }
        else {
            console.warn('Warning: Using unsafe connection. (SSL is highly recommended!)')
        }

        return useSSL;
    };

    that.getProtocol = function () {
        var protocol = that.useSSL() ? 'https://' : 'http://';

        return protocol;
    };

    that.getHost = function () {
        var host = '<owncloud-host-should-go-here>';

        return host;
    };

    that.getOwnCloudUrlWithPath = function (path) {
        var protocol    = that.useSSL() ? 'https://' : 'http://',
            host        = that.getHost(),
            url         = protocol + host + path;

        return url;
    };

    that.getAddUrl = function () {
        var path    = '/index.php/apps/bookmarks/addBm.php?output=popup',
            url     = that.getOwnCloudUrlWithPath(path);

        return url;
    };

    that.getEditUrl = function () {
        var path    = '/index.php/apps/bookmarks/ajax/editBookmark.php',
            url     = that.getOwnCloudUrlWithPath(path);

        return url;
    }

    that.getExportUrl = function () {
        var path    = '/index.php/apps/bookmarks/export.php',
            url     = that.getOwnCloudUrlWithPath(path);

        return url;
    };

    that.getLoginUrl = function () {
        var path    = '/index.php',
            url     = that.getOwnCloudUrlWithPath(path);

        return url;
    };

    that.getLogoutUrl = function () {
        var path    = '/index.php?logout=true',
            url     = that.getOwnCloudUrlWithPath(path);

        return url;
    };

    that.getRequestToken = function (successCallback, errorCallback) {
        jQuery.ajax({
            method  : 'GET',
            url     : that.getAddUrl(),
            success : function (data, textStatus, jqXHR) {
                var requestTokenInput   = jQuery('<div></div>').append(data).find('input[name="requesttoken"]'),
                    requestToken        = requestTokenInput.val();

                successCallback(requestToken);
            },
            error   : function (jqXHR, textStatus, error) {
                errorCallback();
            }
        })
    };

    that.getBookmarks = function (successCallback, errorCallback) {
        jQuery.ajax({
            method      : 'GET',
            url         : that.getExportUrl(),
            dataType    : 'html',
            error       : function (jqXHR, textStatus, error) {
                errorCallback();
            },
            success     : function (data, textStatus, jqXHR) {
                var bookmarkHierarchy   = NetscapeBookmarkFileParser.getBookmarkHierarchyFromString(data);

                successCallback(bookmarkHierarchy);
            }
        });
    };

    that.addBookmark = function (bookmark, requestToken) {
        if ('undefined' == typeof requestToken) {
            that.getRequestToken(function (requestToken) {
                that.addBookmark(bookmark, requestToken);
            }, function () {
                console.warn('Error while getting request token.');
            });
        }
        else {
            jQuery.ajax({
                method  : 'POST',
                url     : that.getEditUrl(),
                data    : {
                    title           : bookmark.getTitle(),
                    url             : bookmark.getHref(),
                    item            : {
                        tags : bookmark.getTags()
                    },
                    description     : 'Chrome bookmarks do not have a description.',
                    record_id       : '',
                    requesttoken    : requestToken
                },
                success : function (data, textStatus, jqXHR) {
                    console.debug(data);
                    console.log('add successful');
                },
                error   : function (jqXHR, textStatus, error) {
                    console.warn('Adding failed.');
                }
            });
        }
    };

    that.loginWithCredentials = function (username, password, successCallback, errorCallback) {
        jQuery.ajax({
            method      : 'POST',
            url         : that.getLoginUrl(),
            dataType    : 'html',
            data        : {
                'user'              : username,
                'password'          : password,
                'password-clone'    : password
            },
            error       : function (jqXHR, textStatus, error) {
                var wasPageNotFound = 404 == jqXHR.status,
                    didLoginFail    = true;

                if (wasPageNotFound) { 
                    // My host is not correctly configured.
                    // Redirecting to a page that does not exist means that the
                    // login was successful.
                    didLoginFail = false;
                }

                if (didLoginFail) {
                    console.warn('Error while logging in.');
                    console.debug('response: ' + jqXHR.responseText);

                    errorCallback();
                }
                else {
                    console.info('Successfully logged in.');

                    successCallback();
                }
            },
            success     : function (data, textStatus, jqXHR) {
                if (that.doesHtmlContainLoginForm(data)) {
                    console.warn('Login failed, please try again.');

                    errorCallback();
                }
                else {
                    console.info('Successfully logged in.');

                    successCallback();
                }
            }
        });
    };

    that.doesHtmlContainLoginForm = function (html) {
        var documentObjects             = jQuery(html),
            documentObject,
            isLoginContainer,
            doesContainLoginForm        = false,
            isMetaRedirectToLoginForm   = false;

        jQuery.each(documentObjects, function (index, element) {
            documentObject              = jQuery(this);
            isLoginContainer            = 'login' == documentObject.attr('id');
            isMetaRedirectToLoginForm   = 'refresh' == documentObject.attr('http-equiv');

            if (isLoginContainer || isMetaRedirectToLoginForm) {
                doesContainLoginForm = true;
            }
        });

        return doesContainLoginForm;
    };

    that.logout = function (successCallback, errorCallback) {
        jQuery.ajax({
            method  : 'GET',
            url     : that.getLogoutUrl(),
            dataType    : 'html',
            success     : function (data, textStatus, jqXHR) {
                if (that.doesHtmlContainLoginForm(data)) {
                    successCallback();
                }
                else {
                    errorCallback();

                    console.debug(data);
                }
            },
            error       : function (jqXHR, textStatus, error) {
                console.warn('Error logging out.');
                console.debug(jqXHR.responseText);

                errorCallback();
            }
        });
    };

    return {
        loginWithCredentials    : that.loginWithCredentials,
        logout                  : that.logout,
        addBookmark             : that.addBookmark,
        getBookmarks            : that.getBookmarks
    };
}());