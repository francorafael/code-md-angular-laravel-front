/**
 * Created by rafael.franco on 17/03/2016.
 */
angular.module('app.controllers').controller('LoginController', ['$scope', '$location', 'OAuth', function($scope, $location, OAuth){
    $scope.user = {
        username: '',
        password: ''
    };

    $scope.error = {
        message: '',
        error: false
    };

    //Autenticando
    $scope.login = function() {
        if($scope.form.$valid) {
            OAuth.getAccessToken($scope.user).then(function(){
                $location.path('home');
            }, function (data) {
                $scope.error.error = true;
                $scope.error.message = data.data.error_description;
            });
        }
    };
}]);