angular.module('app.controllers')
        .controller('RefreshModalController',
                ['$scope', '$rootScope', '$modalInstance', '$interval','authService', 'OAuth', 'OAuthToken', '$location', 'User',
                    function ($scope, $rootScope, $modalInstance, $interval, authService, OAuth, OAuthToken, $location, User) {

                        $scope.$on('event:auth-loginConfirmed', function () {
                                    $rootScope.loginModalOpened = false;
                                    $modalInstance.close();
                                });

                        $scope.$on('$routeChangeStart', function () {
                                    $rootScope.loginModalOpened = false;
                                    $modalInstance.dismiss('cancel');
                                });

                        $scope.$on('event:auth-loginCancelled', function () {
                            OAuthToken.removeToken();
                        });

                        $scope.cancel = function () {
                            authService.loginCancelled();
                            $location.path('/login');
                        };

                        OAuth.getRefreshToken().then(function () {
                            $interval(function() {
                                authService.loginConfirmed();
                            }, 20000);

                        }, function (data) {
                            $scope.cancel();
                        });
                    }]);