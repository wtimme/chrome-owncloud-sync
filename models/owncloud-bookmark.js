/**
 * ownCloud bookmark
 */

var ownCloudBookmark = function (href, title, tags) {
    var that = this;

    that.href = href;
    that.title = 'undefined' == typeof title ? '' : title;
    that.tags = 'undefined' == typeof tags ? {} : tags;

    that.getHref = function () {
        return href;
    };

    that.getTitle = function () {
        return 'undefined' == typeof title ? '' : title;
    };

    that.getTags = function () {
        return 'undefined' === typeof tags ? [] : tags;
    };

    return {
        getHref     : that.getHref,
        getTitle    : that.getTitle,
        getTags     : that.getTags
    };
};