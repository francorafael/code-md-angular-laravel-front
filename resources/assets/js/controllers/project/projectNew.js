angular.module('app.controllers')
    .controller('ProjectNewController', [
        '$scope', '$location', '$cookies', '$routeParams', 'Project', 'Client', 'appConfig',
        function ($scope, $location, $cookies, $routeParams, Project, Client, appConfig) {
            $scope.project = new Project();
            //retornando os status de app config
            $scope.status = appConfig.project.status;

            $scope.due_date =
            {
                status:
                {opened: false}
            };
            $scope.open = function ($event) {
                $scope.due_date.status.opened = true;
            };

            $scope.save = function() {
                if($scope.formProject.$valid) {
                    $scope.project.owner_id = $cookies.getObject('user').id;
                    $scope.project.$save().then(function () {
                        $location.path('/projects');
                    });
                }
            };

            //QUANDO FOR SELECIONAR NOVAMENTE PEGAR O NOME E JOGAR
            $scope.formatName = function (model) {
                if(model){
                    return model.name;
                }
                return "";
            };

            $scope.getClients = function (name) {
                //$promise - trava a execução do javascript ate os dados serem retornados
                return Client.query({
                    search:name,
                    searchFields:'name:like'
                }).$promise;
            };

            $scope.selectClient = function (item) {
                $scope.project.client_id = item.id;

            };
        }
    ]);

