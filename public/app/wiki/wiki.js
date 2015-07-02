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
                    templateUrl: 'specter/app/wiki/wiki.control.show.html',
                    controller: ['$location', '$scope', '$state', '$stateParams', function($location, $scope, $state, $stateParams) {
                        $scope.path = $stateParams.path ? $stateParams.path : '/';
                        $scope.go = function() {
                            $location.path($scope.path);
                        };
                        $scope.edit = function() {
                            $state.go('wiki.page.edit', $stateParams);
                        };
                    }]
                },
                'content': {
                    templateUrl: 'specter/app/wiki/wiki.content.show.html',
                    controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
                        var path = $stateParams.path ? $stateParams.path : '/';
                            date = new Date(),
                            day = date.getDate(),
                            month = date.getMonth() + 1,
                            year = date.getFullYear();
                        $scope.path = path;
                        $scope.date = day + '/' + month + '/' + year;
                    }]
                }
            }
        })
        .state('wiki.page.edit', {
            params: { path: '' },
            views: {
                'control@wiki': {
                    templateUrl: 'specter/app/wiki/wiki.control.edit.html',
                    controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
                        $scope.save = function() {
                            $state.go('wiki.page', $stateParams);
                        };
                    }]
                },
                'content@wiki': {
                    templateUrl: 'specter/app/wiki/wiki.content.edit.html',
                    controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
                        $scope.path = $stateParams.path;
                    }]
                }
            }
        });
}]);
