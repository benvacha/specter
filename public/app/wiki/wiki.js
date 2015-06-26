/* Specter : A Solo Wiki Platform */

//
angular.module('app.wiki', [
    'ui.router'
])

//
.config(['$urlMatcherFactoryProvider', '$stateProvider', function($urlMatcherFactoryProvider, $stateProvider) {
    //
    $urlMatcherFactoryProvider.type('nonURIEncoded', {
        encode: function(val) { return val !== null ? val.toString() : val; },
        decode: function(val) { return val !== null ? val.toString() : val; },
        is: function() { return true; }
    });
    //
    $stateProvider
        .state('wiki', {
            data: { requireUser: true },
            templateUrl: 'specter/app/wiki/wiki.html'
        })
        .state('wiki.page', {
            url: '/{path:nonURIEncoded}',
            params: { path: '' },
            views: {
                'control': {
                    template: '<a ng-click="edit()">edit</a>',
                    controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
                        $scope.edit = function() {
                            $state.go('.edit', $stateParams);
                        }
                    }]
                },
                'content': {
                    template: '<h1>Wiki</h1><h3>{{path}}</h3>',
                    controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
                        $scope.path = $stateParams.path;
                    }]
                }
            }
        })
        .state('wiki.page.edit', {
            params: { path: '' },
            views: {
                'control@wiki': {
                    template: '<a ng-click="save()">save</a>',
                    controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
                        $scope.save = function() {
                            console.log($stateParams);
                            $state.go('^', $stateParams);
                        }
                    }]
                },
                'content@wiki': {
                    template: '<h1>Wiki Edit</h1><h3>{{path}}</h3>',
                    controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
                        $scope.path = $stateParams.path;
                    }]
                }
            }
        });
}]);
