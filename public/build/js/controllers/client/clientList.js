angular.module('app.controllers')
    .controller('ClientListController', ['$scope', 'Client', function ($scope, Client) {
        //$scope.clients = Client.query();

        //paginacao
        $scope.clients = [];
        $scope.totalClients = 0;
        $scope.clientsPerPage = 5; // this should match however many results your API puts on one page

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {
            Client.query({
                page: pageNumber,
                limit: $scope.clientsPerPage
            }, function(data){
                $scope.clients = data.data;
                $scope.totalClients = data.meta.pagination.total;
            });
        }

        getResultsPage(1);

    }]);

