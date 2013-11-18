/**
 * ownCloud bookmark sync
 */

jQuery(document).ready(function () {

    ownCloudSyncExtension.Initialize();

    // ownCloudBookmarkServer.getBookmarks(function (bookmarks) {
    //     console.info('Got bookmarks.');
    //     console.log(bookmarks);

    //     var bookmarkList = jQuery('#bookmark-list');

    //     jQuery.each(bookmarks, function (index, bookmark) {
    //         var link    = jQuery('<a>').attr('href', bookmark.getHref()).attr('target', '_blank').append(bookmark.getTitle()),
    //             listItem    = jQuery('<li>').append(link);
    //         bookmarkList.append(listItem);
    //         // bookmarkList.append(jQuery('li').append('a').attr('href', bookmark.getHref()).append(bookmark.getTitle()));
    //         // bookmarkList.append(jQuery('<li>').append('a').attr('href', bookmark.getHref()).append(bookmark.getTitle()));
    //     });
    // }, function () {
    //     /*
    //     chrome.windows.create({'url': ownCloudBookmarkServer.getLoginUrl(), 'type': 'popup'}, function(window) {
    //     });
    //     */
    //     console.warn('Error receiving bookmarks.');
    // });
});