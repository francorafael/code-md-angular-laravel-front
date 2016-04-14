angular.module('app.directives')
    .directive('projectFileDownload',
    ['appConfig', 'ProjectFile', '$timeout',
        function (appConfig, ProjectFile, $timeout) {
            return {
                restrict: "E",
                templateUrl: appConfig.baseUrl + '/build/views/templates/projectFileDownload.html',
                link: function (scope, element, attr) {
                    var anchor = element.children()[0];
                    scope.$on('save-file',
                        function (event, data) {
                            $(anchor).removeClass('disable');
                            $(anchor).text('Save File!');
                            $(anchor).attr({
                                href: 'data:application-octet-stream;base64,' + data.file,
                                download: data.name
                            });
                            $timeout(function () {
                                scope.downloadFile = function () {};
                                $(anchor)[0].click();
                            });

                        });
                },
                controller: ['$scope', '$element', '$attrs',
                    function ($scope, $element, $attrs) {
                        $scope.downloadFile = function () {
                            var anchor = $element.children()[0];
                            $(anchor).addClass('disable');
                            $(anchor).text('Loading...');

                            ProjectFile.download({id: $attrs.projectId, idFile: $attrs.idFile},
                                function (data) {
                                    $scope.$emit('save-file', data);
                                });
                        };
                    }]
            };
        }]);
