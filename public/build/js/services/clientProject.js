angular.module('app.services')
    .service('ClientProject', ['$resource', 'appConfig', function ($resource, appConfig) {
        return $resource(appConfig.baseUrl + '/clientsProject', {}, {
            get: {
                method: 'GET'
            },
            query: {
                isArray: true
            }
        });
    }]);