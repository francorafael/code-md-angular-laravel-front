angular.module('app.controllers')
    .controller('ProjectTaskNewController', ['$scope', '$location', '$routeParams', 'ProjectTask', 'appConfig',
        function ($scope, $location, $routeParams, ProjectTask, appConfig) {
            $scope.projectTask = new ProjectTask({id: $routeParams.id, project_id: $routeParams.id});
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
                    $scope.projectTask.$save().then(
                        function () {
                            $location.path('project/' + $routeParams.id + '/tasks');
                        });
                }
            };

        }

    ]);


