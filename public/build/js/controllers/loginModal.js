angular.module('app.controllers')
        .controller('LoginModalController',
                ['$scope', '$rootScope', '$modalInstance', 'authService', 'OAuth', 'OAuthToken', '$location', '$cookies', 'User',
                    function ($scope, $rootScope, $modalInstance, authService, OAuth, OAuthToken, $location, $cookies, User) {
                        $scope.user = {
                            username: '',
                            password: ''
                        };
                        $scope.error = {
                            message: '',
                            error: false
                        };
                        $scope.$on('event:auth-loginConfirmed',
                                function () {
                                    $rootScope.loginModalOpened = false;
                                    $modalInstance.close();
                                });
                        $scope.$on('$routeChangeStart',
                                function () {
                                    $rootScope.loginModalOpened = false;
                                    $modalInstance.dismiss('cancel');
                                });
                        $scope.$on('event:auth-loginCancelled', function () {
                            OAuthToken.removeToken();
                        });
                        $scope.cancel = function () {
                            authService.loginCancelled();
                            $modalInstance.close();
                            $location.path('/login');
                        };
                        $scope.login = function () {
                            if ($scope.form.$valid) {
                                OAuth.getAccessToken($scope.user)
                                        .then(function () {
                                            User.authenticated({}, {},
                                                    function (data) {
                                                        $cookies.putObject('user', data);
                                                        authService.loginConfirmed();
                                                    });

                                        }, function (data) {
                                            $scope.error.error = true;
                                            $scope.error.message = data.data.error_description;
                                        });
                            }
                        };

                    }
                ]);