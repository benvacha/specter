/* Specter : https://github.com/benvacha/specter */

//
//
angular.module('app.authorize', [
    'ui.router'
])

//
//
.run(['$http','$window','$rootScope','$state', function($http,$window,$rootScope,$state) {
    if($window.localStorage['com.specter.token']) {
        $http.defaults.headers.common['x-access-token'] = $window.localStorage['com.specter.token'];
    }
    $rootScope.$on('$stateChangeStart', function(event,toState,toParams,fromState,fromParams) {
        if(toState.data && toState.data.private && !$http.defaults.headers.common['x-access-token']) {
            event.preventDefault();
            $state.go('authorize.signin');
        }
    });
}])

//
//
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('authorize', {
            templateUrl: 'specter/views/authorize.html'
        })
        .state('authorize.signin', {
            templateUrl: 'specter/views/authorize.signin.html',
            controller: ['$http','$window','$scope','$state', function($http,$window,$scope,$state) {
                $scope.signIn = function() {
                    $http.post('/specter/apis/tokens', {
                        username: $scope.username,
                        password: $scope.password
                    }).success(function(data, status, headers, config) {
                        $window.localStorage['com.specter.token'] = data.token;
                        $http.defaults.headers.common['x-access-token'] = data.token;
                        $state.go('wiki.show');
                    }).error(function(data, status, headers, config) {
                        $scope.error = data.desc;
                    });
                }
            }]
        })
        .state('authorize.fakein', {
            template: '',
            controller: ['$http','$window','$state', function($http,$window,$state) {
                $window.localStorage['com.specter.token'] = 'json.web.token';
                $http.defaults.headers.common['x-access-token'] = $window.localStorage['com.specter.token'];
                $state.go('wiki.show');
            }]
        })
        .state('authorize.signout', {
            template: '',
            controller: ['$http','$window','$state', function($http,$window,$state) {
                delete $window.localStorage['com.specter.token'];
                delete $http.defaults.headers.common['x-access-token'];
                $state.go('authorize.signin');
            }]
        });
}]);
