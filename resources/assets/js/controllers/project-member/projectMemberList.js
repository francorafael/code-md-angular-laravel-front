angular.module('app.controllers')
        .controller('ProjectMemberListController', ['$scope', '$routeParams', 'ProjectMember', 'Member',
            function ($scope, $routeParams, ProjectMember, Member) {
                $scope.projectMembers = [];
                $scope.selectMembers = [];
                $scope.project_id = $routeParams.id;
                $scope.projectMember = new ProjectMember();
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
                    ProjectMember.query({
                        id: $routeParams.id,
                        orderBy: 'id',
                        sortedBy: 'desc'
                    }, function(data){
                        $scope.projectMembers = data;
                    });
                };


                //QUANDO FOR SELECIONAR NOVAMENTE PEGAR O NOME E JOGAR
                $scope.formatName = function (model) {
                    if(model){
                        return model.name;
                    }
                    return "";
                };


                $scope.getMembers = function (name) {
                    //$promise - trava a execução do javascript ate os dados serem retornados
                    return Member.query({
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
