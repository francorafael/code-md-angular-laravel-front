angular.module('app.services')
    .service('Member', ['$resource', 'appConfig', function ($resource, appConfig) {
        return $resource(appConfig.baseUrl + '/user/allUsers', {}, {
            get: {
                method: 'GET'
            },
            query: {
                isArray: true
            }
        });
    }]);