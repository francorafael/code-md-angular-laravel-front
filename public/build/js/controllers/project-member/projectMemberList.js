angular.module('app.controllers')
        .controller('ProjectMemberListController', ['$scope', '$routeParams', 'ProjectMember', 'User',
            function ($scope, $routeParams, ProjectMember, User) {
                $scope.projectMember = new ProjectMember();
                $scope.project_id = $routeParams.id;
                $scope.save = function () {
                    if ($scope.projectMemberForm.$valid) {
                        $scope.projectMember.$save({id: $routeParams.id})
                                .then(function () {
                                    $scope.projectMember = new ProjectMember();
                                    $scope.loadMember();
                                });
                    }
                };
                $scope.loadMember = function () {
                    $scope.projectMembers = ProjectMember.query({
                        id: $routeParams.id,
                        orderBy: 'id',
                        sortedBy: 'desc'
                    });
                };


                //QUANDO FOR SELECIONAR NOVAMENTE PEGAR O NOME E JOGAR
                $scope.formatName = function (model) {
                    if(model){
                        return model.name;
                    }
                    return "";
                };


                $scope.getUsers = function (name) {
                    //$promise - trava a execução do javascript ate os dados serem retornados
                    return User.query({
                        search:name,
                        searchFields:'name:like'
                    }).$promise;
                };




                $scope.selectUser = function (item) {
                    $scope.projectMember.member_id = item.id;
                };
                $scope.loadMember();
            }
        ]);
