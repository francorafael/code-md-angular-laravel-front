angular.module('app.controllers')
    .controller('ProjectFileNewController',
    ['$scope', '$location', '$routeParams', 'Url', 'Upload', 'appConfig',
        function ($scope, $location, $routeParams, Url, Upload, appConfig) {
            $scope.project_id = $routeParams.id;
            $scope.save = function () {
                if ($scope.form.$valid) {
                    var url = appConfig.baseUrl + Url.getUrlFromUrlSymbol(appConfig.urls.projectFile,
                            {id: $routeParams.id, idFile: ''});
                    Upload.upload({
                        url: url,
                        fields: {
                            name: $scope.projectFile.name,
                            description: $scope.projectFile.description,
                            project_id: $routeParams.id
                        },
                        file: $scope.projectFile.file
                    }).then(function () {
                        $location.path('project/' + $routeParams.id + '/files');
                    });
                }
            };

        }
    ]);


