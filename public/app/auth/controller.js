/* Specter : A Solo Wiki Platform */

//
angular.module('app.auth', [
    'ui.router'
])

//
.run(['$window', '$rootScope', '$state', function($window, $rootScope, $state) {
    //
    if($window.localStorage['com.specter.user']) {
        $rootScope.user = JSON.parse($window.localStorage['com.specter.user']);
    }
    //
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //
        if(toState.data && toState.data.requireUser && !$rootScope.user) {
            event.preventDefault();
            $state.go('auth.signin');
        }
    });
}])

//
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('auth', {
            templateUrl: 'specter/app/auth/auth.html'
        })
        .state('auth.signin', {
            templateUrl: 'specter/app/auth/auth.signin.html',
            controller: ['$window','$rootScope','$scope','$state', function($window,$rootScope,$scope,$state) {
                $scope.signin = function() {
                    if(!$scope.username || !$scope.password) {
                        $scope.error = 'Missing Sign In Credentials';
                    } else if($scope.username !== 'dev' || $scope.password !== 'dev') {
                        $scope.error = 'Invalid Sign In Credentials';
                    } else {
                        $rootScope.user = { username: $scope.username };
                        $window.localStorage['com.specter.user'] = JSON.stringify($rootScope.user);
                        $state.go('wiki');
                    }
                };
            }]
        })
        .state('auth.signup', {
            templateUrl: 'specter/app/auth/auth.signup.html',
            controller: ['$window','$rootScope','$scope','$state', function($window,$rootScope,$scope,$state) {
                $scope.signup = function() {
                    if(!$scope.username || !$scope.password1 || !$scope.password2) {
                        $scope.error = 'Missing Sign Up Credential';
                    } else if($scope.password1 !== $scope.password2) {
                        $scope.error = 'Passwords Must Match';
                    } else {
                        $rootScope.user = { username: $scope.username };
                        $window.localStorage['com.specter.user'] = JSON.stringify($rootScope.user);
                        $state.go('wiki');
                    }
                };
            }]
        })
        .state('auth.signout', {
            templateUrl: 'specter/app/auth/auth.signout.html',
            controller: ['$window','$rootScope','$state', function($window,$rootScope,$state) {
                $rootScope.user = null;
                $window.localStorage.removeItem('com.specter.user');
            }]
        });
}]);
