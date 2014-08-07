react-flux-suppprt
==================

Support files for creating Flux applications with React.

See [facebook/flux](https://github.com/facebook/flux) for a good `Dispatcher` to use as well.

Creating Stores
---------------

To create stores, have them use the `BaseStore` to setup common methods stores need.

**UserStore.js**

    var BaseStore = require('./BaseStore');
    var merge = require('react/lib/merge');

    var UserStore = Object.create(merge(BaseStore, {
        getFullName: function() {
            ...
        }
    }));

    UserStore.dispatchToken = AppDispatcher.register(function(payload) {
        ...
    });

    module.exports = UserStore;


Listening for Store Changes
------------------------------

Use the `StoreListener` to listen for changes.  Components must define a `getStateFromStores()` to be called when the state has been updated.

**Component.jsx**

    var React = require('react'),
        StoreListener = require('../stores/StoreListener'),
        UserStore = require('../stores/UserStore');

    var Component = React.createClass({
        mixins: [
            StoreListener(UserStore)
        ],
        displayName: 'Component',

        getStateFromStores: function() {
            return {
                fullName: UserStore.getFullName()
            };
        },

        ...

    });

    module.exports = Component;
