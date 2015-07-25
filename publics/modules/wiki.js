/* Specter : https://github.com/benvacha/specter */

//
//
angular.module('app.wiki', [
    'ui.router',
    'hc.marked'
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
    var formatDatetime = function(epoch) {
        var date = new Date(epoch);
        return (date.getMonth()+1) + '/' + date.getDate() + '/'
            + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    };
    $stateProvider
        .state('wiki', {
            data: { private:true },
            templateUrl: 'specter/views/wiki.html'
        })
        .state('wiki.show', {
            url: '{path:nonURIEncoded}',
            params: { path:'/' },
            templateUrl: 'specter/views/wiki.show.html',
            controller: ['$http','$location','$scope','$state','$stateParams', 
                        function($http,$location,$scope,$state,$stateParams) {
                //
                $scope.path = $stateParams.path;
                $http.get('/specter/apis/pages/' + encodeURIComponent($scope.path))
                    .success(function(data, status, headers, config) {
                        $scope.markdown = data.markdown;
                        $scope.created = formatDatetime(data.created);
                        $scope.updated = formatDatetime(data.updated);
                    })
                    .error(function(data, status, headers, config) {
                        $scope.markdown = 'Server Error';
                    });
                //
                $scope.toggleMenu = function() {
                    $scope.showMenu = !$scope.showMenu;
                }
                $scope.toggleAddress = function() {
                    $scope.showAddress = !$scope.showAddress;
                }
                //
                $scope.go = function(path) {
                    $location.path(path);
                }
                $scope.edit = function() {
                    $state.go('wiki.edit', $stateParams);
                }
            }]
        })
        .state('wiki.edit', {
            params: { path:'/' },
            templateUrl: 'specter/views/wiki.edit.html',
            controller: ['$http','$window','$scope','$state','$stateParams',
                        function($http,$window,$scope,$state,$stateParams) {
                //
                $scope.path = $stateParams.path;
                $http.get('/specter/apis/pages/' + encodeURIComponent($scope.path))
                    .success(function(data, status, headers, config) {
                        $scope.markdown = data.markdown;
                    })
                    .error(function(data, status, headers, config) {
                        $scope.markdown = 'Server Error';
                    });
                //
                if($window.innerWidth  <= 550) {
                    $scope.showMarkdown = true;
                    $scope.showPreview = false;
                } else {
                    $scope.showMarkdown = $scope.showPreview = true;
                }
                $scope.toggleMarkdown = function() {
                    $scope.showMarkdown = !$scope.showMarkdown;
                    if(!$scope.showMarkdown && !$scope.showPreview) {
                        $scope.showPreview = true;
                    } else if($scope.showMarkdown && $window.innerWidth  <= 550) {
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
                //
                $scope.cancel = function() {
                    $state.go('wiki.show', $stateParams);
                };
                $scope.save = function() {
                    $http.put('/specter/apis/pages/' + encodeURIComponent($scope.path), {
                        markdown: $scope.markdown
                    }).success(function(data, status, headers, config) {
                        $state.go('wiki.show', $stateParams);
                    }).error(function(data, status, headers, config) {
                        console.log(data);
                    });
                };
            }]
        });
}]);
