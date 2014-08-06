
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

/**
 * Reusable store prototype object.  To create a new store, merge this object
 * with store-specific functions, and create with `Object.create()`.
 *
 * Example:
     var UserStore = Object.create(merge(BaseStore, {

        getFullName: function() {
            return this.firstName + ' ' + this.lastName;
        }

    }));
 */
var BaseStore = merge(EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});

module.exports = BaseStore;
