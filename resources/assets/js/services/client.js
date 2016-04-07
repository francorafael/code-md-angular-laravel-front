angular.module('app.services')
    .service('Client', ['$resource', 'appConfig', function ($resource, appConfig) {
        return $resource(appConfig.baseUrl + '/client/:id', {id: '@id'}, {
            query: {
                isArray: true,
                method: 'GET',
                transformResponse: function(data,header){
                    var dataJson = JSON.parse(data);
                    dataJson = dataJson.data;
                    return dataJson;
                }
            }
            //,
            //update: {method: 'PUT'},
            //'delete': {method: 'DELETE'}
        });
    }]);