angular.module('app.controllers')
    .controller('ProjectTaskListController', ['$scope', '$routeParams', 'ProjectTask', 'appConfig',
        function ($scope, $routeParams, ProjectTask, appConfig) {
            $scope.projectTask = new ProjectTask();
            $scope.project_id = $routeParams.id;
            $scope.save = function () {
                if ($scope.projectTaskForm.$valid) {
                    $scope.projectTask.status = appConfig.projectTask.status[0].value;
                    $scope.projectTask.$save({id: $routeParams.id})
                        .then(function () {
                            $scope.projectTask = new ProjectTask();
                            $scope.loadTask();
                        });
                }
            };
            $scope.loadTask = function () {
                $scope.projectTasks = ProjectTask.query({
                    id: $routeParams.id,
                    orderBy: 'id',
                    sortedBy: 'desc'
                });
            };
            $scope.loadTask();
        }
    ]);
