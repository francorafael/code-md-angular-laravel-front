angular.module('app.controllers')
    .controller('ProjectTaskEditController', ['$scope', '$location', '$routeParams', 'ProjectTask', 'appConfig',
        function ($scope, $location, $routeParams, ProjectTask, appConfig) {

            $scope.projectTask = ProjectTask.get({id: $routeParams.id, idTask: $routeParams.idTask});
            $scope.project_id = $routeParams.id;
            $scope.status = appConfig.projectTask.status;
            $scope.due_date =
            {
                status: {opened: false},
                open: function ($event) {
                    $scope.due_date.status.opened = true;
                }
            };
            $scope.start_date =
            {
                status: {opened: false},
                open: function ($event) {
                    $scope.start_date.status.opened = true;
                }
            };
            $scope.save = function () {
                if ($scope.projectTaskForm.$valid) {
                    ProjectTask.update(
                        {id: $routeParams.id, idTask: $routeParams.idTask},
                        $scope.projectTask,
                        function () {
                            $location.path('project/' + $routeParams.id + '/tasks');
                        });
                }
            };

        }]);


