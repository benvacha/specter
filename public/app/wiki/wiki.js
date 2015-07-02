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
        .state('wiki.show', {
            url: '/{path:nonURIEncoded}',
            params: { path: '' },
            templateUrl: 'specter/app/wiki/wiki.show.html',
            controller: ['$location', '$scope', '$state', '$stateParams', function($location, $scope, $state, $stateParams) {
                var path = $stateParams.path ? $stateParams.path : '/';
                    date = new Date(),
                    day = date.getDate(),
                    month = date.getMonth() + 1,
                    year = date.getFullYear();
                $scope.path = path;
                $scope.date = day + '/' + month + '/' + year;
                $scope.go = function() {
                    $location.path($scope.path);
                };
                $scope.edit = function() {
                    $state.go('wiki.edit', $stateParams);
                };
            }]
        })
        .state('wiki.edit', {
            params: { path: '' },
            templateUrl: 'specter/app/wiki/wiki.edit.html',
            controller: ['$window', '$scope', '$state', '$stateParams', function($window, $scope, $state, $stateParams) {
                $scope.path = $stateParams.path;
                if($window.innerWidth <= 550) {
                    $scope.showMarkdown = true;
                    $scope.showPreview = false;
                } else {
                    $scope.showMarkdown = true;
                    $scope.showPreview = true;
                }
                $scope.toggleMarkdown = function() {
                    $scope.showMarkdown = !$scope.showMarkdown;
                    if(!$scope.showMarkdown && !$scope.showPreview) {
                        $scope.showPreview = true;
                    } else if($scope.showMarkdown && $window.innerWidth <= 550) {
                        $scope.showPreview = false;
                    }
                };
                $scope.togglePreview = function() {
                    $scope.showPreview = !$scope.showPreview;
                    if(!$scope.showPreview && !$scope.showMarkdown) {
                        $scope.showMarkdown = true;
                    } else if($scope.showPreview && $window.innerWidth <= 550) {
                        $scope.showMarkdown = false;
                    }
                };
                $scope.cancel = function() {
                    $state.go('wiki.show', $stateParams);
                };
                $scope.save = function() {
                    $state.go('wiki.show', $stateParams);
                };
            }]
        });
}]);
