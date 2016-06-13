angular.module('app.controllers')
    .controller('ProjectNewController', [
        '$scope', '$location', '$cookies', '$routeParams', '$q', 'Project', 'Client', 'appConfig', '$filter',
        function ($scope, $location, $cookies, $routeParams, $q, Project, Client, appConfig, $filter) {
            $scope.project = new Project();
            $scope.clients = {};
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

            //$scope.getClients = function (name) {
            //    //$promise - trava a execução do javascript ate os dados serem retornados
            //    return Client.query({
            //        search:name,
            //        searchFields:'name:like'
            //    }).$promise;
            // };
            //$scope.getClients = function (name) {
            //    return ClientProject.query({
            //        id: $routeParams.id,
            //        search: name,
            //        searchFields: 'name:like'
            //    }).$promise;
            //}

            //$q - protela as promessas com seus resultados

            $scope.getClients = function (name) {
                var deffered = $q.defer();
                //$promise - trava a execução do javascript ate os dados serem retornados
                Client.query({
                    search:name,
                    searchFields:'name:like'
                }, function(data){
                    var result = $filter('limitTo')(data.data,5);
                    deffered.resolve(result);
                }, function(error){
                    deffered.reject(error);
                });
                return deffered.promise;
            };


            $scope.selectClient = function (item) {
                $scope.project.client_id = item.id;

            };
        }
    ]);

