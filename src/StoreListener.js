
var invariant = require('react/lib/invariant');

/**
 * Mixin for a component that listens for changes to one or more stores. The
 * component is required to define a `getStateFromStores` method.
 *
 * Example:

 var StoreListener = require('../stores/StoreListener'),
     UserStore = require('../stores/UserStore'),
     OtherStore = require('../stores/OtherStore');

 var SomeComponent = React.createClass({
    mixins: [
        StoreListener(UserStore, OtherStore)
    ],

    getStateFromStores: function() {
        return {
            user: UserStore.getUser(),
            otherData: OtherStore.getData()
        };
    }
});

 */
var StoreListener = function(stores) {

    // support varargs of stores
    if (!Array.isArray(stores)) {
        stores = Array.prototype.slice.call(arguments);
    }

    stores.forEach(function(store) {
        invariant(
            store.addChangeListener && store.removeChangeListener,
            'Stores used with the `StoreListener` should extend `BaseStore` and have methods ' +
                '`addChangeListener` and `removeChangeListener`'
        );
    });

    return {

        getInitialState: function() {
            invariant(
                this.getStateFromStores,
                'Components with `StoreListener` must define `getStateFromStores`'
            );
            return this.getStateFromStores();
        },

        _onChange: function() {
            this.setState(this.getStateFromStores());
        },

        componentDidMount: function() {
            stores.forEach(function(store) {
                store.addChangeListener(this._onChange);
            }, this);
        },

        componentWillUnmount: function() {
            stores.forEach(function(store) {
                store.removeChangeListener(this._onChange);
            }, this);
        }

    };
};

StoreListener.componentWillMount = function() {
    invariant(
        false,
        '`StoreListener` itself is not a mixin, but a function to create a mixin.  Pass the ' +
        'stores you want to listen to as arguments to the function.  For example: ' +
        '`mixins: [ StoreListener(UserStore) ]`.' +
        (this.constructor.displayName ? '  See component: ' + this.constructor.displayName : '')
    );
};

module.exports = StoreListener;
