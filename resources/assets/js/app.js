var app = angular.module('app', ['ngRoute', 'angular-oauth2', 'app.controllers', 'app.services']);

angular.module('app.controllers', ['ngMessages', 'angular-oauth2']);
angular.module('app.services', ['ngResource']);

app.provider('appConfig', function(){
    var config = {
        baseUrl: 'http://localhost:8000'
    };

    return {
        config: config,
        $get: function() {
            return config;
        }
    }
});

//rotas
app.config([
    '$routeProvider', 'OAuthProvider', 'OAuthTokenProvider', 'appConfigProvider',
    function($routeProvider, OAuthProvider, OAuthTokenProvider, appConfigProvider){
    $routeProvider
        .when('/login', {
            templateUrl: 'build/views/login.html',
            controller:'LoginController'
        })

        .when('/home', {
            templateUrl: 'build/views/home.html',
            controller:'HomeController'
        })

        .when('/clients', {
            templateUrl: 'build/views/client/list.html',
            controller:'ClientListController'
        });

        //Autenticar
        OAuthProvider.configure({
            baseUrl: appConfigProvider.config.baseUrl,
            clientId: 'appid1',
            clientSecret: 'secret', // optional
            grantPath: 'oauth/access_token',
        });

        //Deixar só com HTTP
        OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: false
            }
        });
}]);

//depois que o angular é carregado isso é executado
//esta adicionando um evento OAuth error para se for invalido não retornanr se for um token
// invalido retoranar uma atualizacao o token
app.run(['$rootScope', '$window', 'OAuth', function($rootScope, $window, OAuth) {
    $rootScope.$on('oauth:error', function(event, rejection) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === rejection.data.error) {
            return;
        }

        // Refresh token when a `invalid_token` error occurs.
        if ('invalid_token' === rejection.data.error) {
            return OAuth.getRefreshToken();
        }

        // Redirect to `/login` with the `error_reason`.
        return $window.location.href = '/login?error_reason=' + rejection.data.error;
    });
}]);