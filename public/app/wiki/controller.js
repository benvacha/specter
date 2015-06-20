/* Specter : A Solo Wiki Platform */

//
angular.module('app.wiki', [
    'ui.router'
])

//
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('wiki', {
            url: '/*uri',
            template: '<h1>Wiki</h1><h3>{{uri}}</h3><a ui-sref="auth.signout">Sign Out</a>',
            data: {
                requireUser: true
            },
            controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
                $scope.uri = $stateParams.uri;
            }]
        });
}]);
