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
                $scope.error = {};
                $scope.signin = function() {
                    $scope.error = {};
                    if(!$scope.username) {
                        $scope.error.username = 'required';
                    } else if($scope.username !== 'dev') {
                        $scope.error.username = 'invalid';
                    }
                    if(!$scope.password) {
                        $scope.error.password = 'required';
                    } else if($scope.password !== 'dev') {
                        $scope.error.password = 'invalid';
                    }
                    if(!$scope.error.username && !$scope.error.password) {
                        $rootScope.user = { username: $scope.username };
                        $window.localStorage['com.specter.user'] = JSON.stringify($rootScope.user);
                        $state.go('wiki.show');
                    }
                };
            }]
        })
        .state('auth.signup', {
            templateUrl: 'specter/app/auth/auth.signup.html',
            controller: ['$window','$rootScope','$scope','$state', function($window,$rootScope,$scope,$state) {
                $scope.error = {};
                $scope.signup = function() {
                    $scope.error = {};
                    if(!$scope.username) {
                        $scope.error.username = 'required';
                    }
                    if(!$scope.password1) {
                        $scope.error.password1 = 'required';
                    } else if(!$scope.password2) {
                        $scope.error.password2 = 'required';
                    } else if($scope.password1 !== $scope.password2) {
                        $scope.error.password2 = 'passwords must match';
                    }
                    if(!$scope.error.username && !$scope.error.password1 && !$scope.error.password2) {
                        $rootScope.user = { username: $scope.username };
                        $window.localStorage['com.specter.user'] = JSON.stringify($rootScope.user);
                        $state.go('wiki.show');
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
        })
        .state('auth.recover', {
            templateUrl: 'specter/app/auth/auth.recover.html',
            controller: ['$window','$rootScope','$scope','$state', function($window,$rootScope,$scope,$state) {
                $scope.error = {};
                $scope.recover = function() {
                    $scope.error = {};
                    if(!$scope.username) {
                        $scope.error.username = 'required';
                    }
                    if(!$scope.error.username) {
                        // TODO: implement recovery
                        $scope.error.username = 'recovery is disabled';
                    }
                };
            }]
        });
}]);
