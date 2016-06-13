angular.module('app.controllers')
    .controller('ClientNewController', ['$scope', '$location', 'Client', function ($scope, $location, Client) {
        $scope.client = new Client();

        $scope.save = function() {
            if($scope.form.$valid) {
                $scope.client.$save().then(function () {
                    $location.path('/clients');
                }, function(error){
                    Console.log("Error" + error);
                });

                //FORMA 1 retornando o erro na função de sucesso
                //$scope.client.$save().then(function (data) {
                //    if(data.hasOwnProperty('error') && data.error)
                //    {
                //
                //    }
                //    $location.path('/clients');
                //});


            }
        }
    }
    ]);

