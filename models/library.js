/**
 * Library
 * 
 * Simple storage mechanism.
 */

var Library = function () {
    var that = this;

    that.getStorage = function () {
        if ('undefined' == typeof that.storage) {
            that.storage = {};
        }

        return that.storage;
    };

    that.get = function (key) {
        return that.getStorage()[key];
    };

    that.set = function (key, value) {
        that.getStorage()[key] = value;
    };

    return {
        get : that.get,
        set : that.set
    };
};