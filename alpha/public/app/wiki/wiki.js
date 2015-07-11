/* Specter : A Solo Wiki Platform */

//
angular.module('app.wiki', [
    'ui.router',
    'ngSanitize',
    'hc.marked'
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
            controller: ['$http', '$location', '$scope', '$state', '$stateParams', 'marked', function($http, $location, $scope, $state, $stateParams, marked) {
                var path = $stateParams.path ? $stateParams.path : '/';
                    date = new Date(),
                    day = date.getDate(),
                    month = date.getMonth() + 1,
                    year = date.getFullYear();
                $scope.path = path;
                $scope.date = '00/00/0000';
                $scope.go = function() {
                    $location.path($scope.path);
                };
                $scope.edit = function() {
                    $state.go('wiki.edit', $stateParams);
                };
                $http.get('/specter/api/pages/' + encodeURIComponent(path))
                    .success(function(data, status, headers, config) {
                        $scope.markup = marked(data.markdown);
                        var date = new Date(data.updated),
                            day = date.getDate(),
                            month = date.getMonth() + 1,
                            year = date.getFullYear();
                        $scope.date = day + '/' + month + '/' + year;
                    }).error(function(data, status, headers, config) {
                        $scope.markup = '';
                    });
            }]
        })
        .state('wiki.edit', {
            params: { path: '' },
            templateUrl: 'specter/app/wiki/wiki.edit.html',
            controller: ['$http', '$window', '$scope', '$state', '$stateParams', 'marked', function($http, $window, $scope, $state, $stateParams, marked) {
                var path = $stateParams.path ? $stateParams.path : '/';
                $scope.path = path;
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
                    $http.post('/specter/api/pages', {
                        path: path,
                        markdown: $scope.markdown
                    }).success(function(data, status, headers, config) {
                        $state.go('wiki.show', $stateParams);
                    }).error(function(data, status, headers, config) {
                        $http.put('/specter/api/pages/' + encodeURIComponent(path), {
                            markdown: $scope.markdown
                        }).success(function(data, status, headers, config) {
                            $state.go('wiki.show', $stateParams);
                        }).error(function(data, status, headers, config) {
                            // TODO handle errors
                            console.log(data);
                        });
                    });
                };
                $scope.markedMarkdown = function() {
                    return marked($scope.markdown) + '';
                };
                $http.get('/specter/api/pages/' + encodeURIComponent(path))
                    .success(function(data, status, headers, config) {
                        $scope.markdown = data.markdown;
                    }).error(function(data, status, headers, config) {
                        $scope.markdown = '';
                    });
            }]
        });
}]);
