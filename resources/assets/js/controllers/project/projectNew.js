angular.module('app.controllers')
    .controller('ProjectNewController', [
        '$scope', '$location', '$cookies', '$routeParams', 'Project', 'Client', 'appConfig',
        function ($scope, $location, $cookies, $routeParams, Project, Client, appConfig) {
        $scope.project = new Project();
        $scope.clients = Client.query();
        //retornando os status de app config
        $scope.status = appConfig.project.status;


        $scope.save = function() {
            if($scope.formProject.$valid) {
                $scope.project.owner_id = $cookies.getObject('user').id;
                $scope.project.$save().then(function () {
                    $location.path('/projects');
                });
            }
        }
    }
    ]);

