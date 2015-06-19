/* Specter : A Solo Wiki Platform */

// add application modules
angular.module('app', [
    'ui.router'
])

// add state vars to root scope
.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])

// use non-hash urls when possible
.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
