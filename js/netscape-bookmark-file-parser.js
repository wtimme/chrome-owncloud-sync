/**
 * Netscape Bookmark File Parser
 */

var NetscapeBookmarkFileParser = (function () {
    var that = this;

    that.getBookmarkHierarchyFromString = function (bookmarkFileContentString) {
        var pageElements        = jQuery(data),
            elementIndex,
            numberOfElements    = pageElements.length,
            element,
            elementTagName,
            linkListElements,
            bookmarkLink,
            bookmarkHref,
            bookmarkTitle,
            bookmarkTags,
            bookmarks           = [];

        jQuery.each(pageElements, function (index, pageElement) {
            elementTagName  = 'undefined' == typeof this.tagName ? '' : this.tagName;
            elementTagName  = elementTagName.toLowerCase();

            if ('dl' == elementTagName) {
                linkListElements = jQuery(this).find('dt a');

                jQuery.each(linkListElements, function (index, linkListElement) {
                    var bookmarkLink = jQuery(this),
                        bookmark;

                    bookmarkHref    = bookmarkLink.attr('href');
                    bookmarkTitle   = bookmarkLink.text();
                    bookmarkTags    = bookmarkLink.attr('tags').split(',');

                    bookmark = ownCloudBookmark(bookmarkHref, bookmarkTitle, bookmarkTags);

                    bookmarks.push(bookmark);
                });
            }
        });

        return bookmarkHierarchy;
    };

    return {
        getBookmarkHierarchyFromString  : that.getBookmarkHierarchyFromString
    };
}());