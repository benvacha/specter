/* Specter : A Solo Wiki Platform */

//
angular.module('app', [
    'ui.router',
    'app.auth',
    'app.wiki'
])

//
.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    //
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    //
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        console.log('State Change Start:\n  %s >> %s', fromState.name, toState.name);
    });
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
}])

//
.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
