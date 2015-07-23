/* Specter : https://github.com/benvacha/specter */

//
// initialize
angular.module('app', [
    'ui.router',
    'app.authorize',
    'app.wiki'
])

//
//
.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}])

//
//
.run(['$rootScope','$state','$stateParams', function($rootScope,$state,$stateParams) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        console.log('State Change Success:\n  %s >> %s', fromState.name, toState.name);
    });
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log('State Change Error:\n  %s >> %s', fromState.name, toState.name);
        console.log(error);
    });
    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
        console.log('State Not Found:\n  %s', unfoundState.name);
    });
}]);
