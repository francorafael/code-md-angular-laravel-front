angular.module('app.controllers')
    .controller('ProjectTaskShowController', ['$scope', '$routeParams', 'ProjectTask',
        function ($scope, $routeParams, ProjectTask) {
            $scope.projectTask  = new ProjectTask.get({
                id: $routeParams.id,
                idTask: $routeParams.idTask
            });

        }
    ]);


