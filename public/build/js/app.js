var app = angular.module('app', ['ngRoute', 'angular-oauth2', 'app.controllers']);

angular.module('app.controllers', ['ngMessages', 'angular-oauth2']);
//rotas
app.config(['$routeProvider', 'OAuthProvider', function($routeProvider, OAuthProvider){
    $routeProvider
        .when('/login', {
            templateUrl: 'build/views/login.html',
            controller:'LoginController'
        })

        .when('/home', {
            templateUrl: 'build/views/home.html',
            controller:'HomeController'
        });

        //Autenticar
        OAuthProvider.configure({
            baseUrl: 'http://localhost:8000',
            clientId: 'appid1',
            clientSecret: 'secret', // optional
            grantPath: 'oauth/access_token',
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