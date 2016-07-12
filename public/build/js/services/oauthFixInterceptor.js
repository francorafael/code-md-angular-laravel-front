angular.module('app.services')
    .service('oauthFixInterceptor', ['$q', '$rootScope', 'OAuthToken',
        function ($q, $rootScope, OAuthToken) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    if (OAuthToken.getAuthorizationHeader()) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = OAuthToken.getAuthorizationHeader();
                    }
                    return config;
                },
                responseError: function (rejection) {
                    //peguei um objeto que vamos usar para ptrotelar a decisao sobre resposta e erro
                    //
                    var deferred = $q.defer();
                    if (400 === rejection.status && rejection.data &&
                        ("invalid_request" === rejection.data.error ||
                        "invalid_grant" === rejection.data.error)) {
                        OAuthToken.removeToken();
                        $rootScope.$emit("oauth:error", {rejection: rejection, deferred: deferred});
                    }
                    if (401 === rejection.status && rejection.data &&
                        "access_denied" === rejection.data.error ||
                        rejection.headers("www-authenticate") && 0 ===
                        rejection.headers("www-authenticate").indexOf("Bearer")) {
                        $rootScope.$emit("oauth:error", {rejection: rejection, deferred: deferred});
                        //retornando a promessa
                        return deferred.promise;
                    }
                    return $q.reject(rejection);

                }
            };
        }]);

