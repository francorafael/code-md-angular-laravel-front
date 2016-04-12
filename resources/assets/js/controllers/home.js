/**
 * Created by rafael.franco on 17/03/2016.
 */
angular.module('app.controllers')
    .controller('HomeController', ['$scope', '$cookies', function($scope, $cookies){
    console.log($cookies.getObject('user').email);
}]);