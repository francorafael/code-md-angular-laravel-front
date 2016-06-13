/**
 * Created by rafael.franco on 17/03/2016.
 */
angular.module('app.controllers')
    .controller('HomeController', ['$scope', '$cookies','$timeout', '$pusher', 'appConfig', function($scope, $cookies, $timeout, $pusher, appConfig){

        $scope.tasks = [];

        window.client = new Pusher(appConfig.pusherKey);
        var pusher = $pusher(window.client);
        var channel = pusher.subscribe('user.' + $cookies.getObject('user').id);
        channel.bind('CodeProject\\Events\\TaskWasIncluded',
            function (data) {
                if($scope.tasks.length == 6) {
                    /* REMOVER O ULTIMO */
                    $scope.tasks.splice($scope.tasks.length - 1, 1);
                }
                /* ATRASO 300 MILESIMOS */
                $timeout(function() {
                    /* POSIÇÃO ZERO */
                    $scope.tasks.unshift(data.task);
                },1000);

            }
        );
}]);