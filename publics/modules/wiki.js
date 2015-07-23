/* Specter : https://github.com/benvacha/specter */

//
//
angular.module('app.wiki', [
    'ui.router'
])

//
//
.config(['$urlMatcherFactoryProvider', function($urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.type('nonURIEncoded', {
        encode: function(val) { return val !== null ? val.toString() : val; },
        decode: function(val) { return val !== null ? val.toString() : val; },
        is: function() { return true; }
    });
}])

//
//
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('wiki', {
            data: { private:true },
            templateUrl: 'specter/views/wiki.html'
        })
        .state('wiki.show', {
            url: '/{path:nonURIEncoded}',
            params: { path:'' },
            templateUrl: 'specter/views/wiki.show.html'
        })
}]);
