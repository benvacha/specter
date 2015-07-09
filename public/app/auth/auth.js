/* Specter : A Solo Wiki Platform */

//
angular.module('app.auth', [
    'ui.router'
])

//
.run(['$http', '$window', '$rootScope', '$state', function($http, $window, $rootScope, $state) {
    //
    if($window.localStorage['com.specter.token']) {
        $rootScope.token = $window.localStorage['com.specter.token'];
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.token;
    }
    //
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //
        if(toState.data && toState.data.requireUser && !$rootScope.token) {
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
            controller: ['$http', '$window','$rootScope','$scope','$state', function($http,$window,$rootScope,$scope,$state) {
                $scope.error = {};
                $scope.signin = function() {
                    $scope.error = {};
                    if(!$scope.email) {
                        $scope.error.email = 'required';
                    }
                    if(!$scope.password) {
                        $scope.error.password = 'required';
                    }
                    if(!$scope.error.email && !$scope.error.password) {
                        $http.post('/specter/api/users/authenticate', {
                            email: $scope.email,
                            password: $scope.password
                        }).success(function(data, status, headers, config) {
                            $rootScope.token = data.data.token;
                            $window.localStorage['com.specter.token'] = data.data.token;
                            $state.go('wiki.show');
                        }).error(function(data, status, headers, config) {
                            if(data.error && data.error.type === 'email')
                                $scope.error.email = data.error.message;
                            if(data.error && data.error.type === 'password')
                                $scope.error.password = data.error.message
                        });
                    }
                };
            }]
        })
        .state('auth.signup', {
            templateUrl: 'specter/app/auth/auth.signup.html',
            controller: ['$http','$window','$rootScope','$scope','$state', function($http,$window,$rootScope,$scope,$state) {
                $scope.error = {};
                $scope.signup = function() {
                    $scope.error = {};
                    if(!$scope.email) {
                        $scope.error.email = 'required';
                    }
                    if(!$scope.password1) {
                        $scope.error.password1 = 'required';
                    } else if(!$scope.password2) {
                        $scope.error.password2 = 'required';
                    } else if($scope.password1 !== $scope.password2) {
                        $scope.error.password2 = 'passwords must match';
                    }
                    if(!$scope.error.email && !$scope.error.password1 && !$scope.error.password2) {
                        $http.post('/specter/api/users', {
                            email: $scope.email,
                            password: $scope.password1
                        }).success(function(data, status, headers, config) {
                            $http.post('/specter/api/users/authenticate', {
                                email: $scope.email,
                                password: $scope.password1
                            }).success(function(data, status, headers, config) {
                                $rootScope.token = data.data.token;
                                $window.localStorage['com.specter.token'] = data.data.token;
                                $state.go('wiki.show');
                            }).error(function(data, status, headers, config) {
                                $state.go('auth.signin');
                            });
                        }).error(function(data, status, headers, config) {
                            if(data.errors && data.errors.email) {
                                $scope.error.email = data.errors.email.message;
                            }
                            if(data.errors && data.errors.password) {
                                $scope.error.password1 = data.errors.password.message;
                            }
                        });
                    }
                };
            }]
        })
        .state('auth.signout', {
            templateUrl: 'specter/app/auth/auth.signout.html',
            controller: ['$window','$rootScope','$state', function($window,$rootScope,$state) {
                $rootScope.token = null;
                $window.localStorage.removeItem('com.specter.token');
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
