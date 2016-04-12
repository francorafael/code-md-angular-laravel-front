var app = angular.module('app', ['ngRoute', 'angular-oauth2', 'app.controllers', 'app.services', 'app.filters', 'app.directives']);

angular.module('app.controllers', ['ngMessages', 'angular-oauth2']);
angular.module('app.filters', []);
angular.module('app.services', ['ngResource']);
angular.module('app.directives', []);

app.provider('appConfig', function(){
    var config = {
        baseUrl: 'http://localhost:8000',
        project:{
            status: [
                {value:'1', label: 'Não iniciado'},
                {value:'2', label: 'Iniciado'},
                {value:'3', label: 'Concluído'}
            ]
        }
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
    '$routeProvider', '$httpProvider', 'OAuthProvider',
    'OAuthTokenProvider', 'appConfigProvider',
    function($routeProvider, $httpProvider, OAuthProvider, OAuthTokenProvider, appConfigProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.transformResponse = function(data,headers){
            //verificar tipo de conteudo recebido
            var headerGetter = headers();
            if(headerGetter['content-type'] == 'application/json' ||
                headerGetter['content-type'] == 'text/json'){
                var dataJson = JSON.parse(data);
                if(dataJson.hasOwnProperty('data')){
                    dataJson = dataJson.data;
                }
                return dataJson;
            }
            return data;
        };
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
        })

        .when('/clients/new', {
            templateUrl: 'build/views/client/new.html',
            controller:'ClientNewController'
        })

        .when('/client/:id/edit', {
            templateUrl: 'build/views/client/edit.html',
            controller: 'ClientEditController'
        })

        .when('/client/:id/remove', {
            templateUrl: 'build/views/client/remove.html',
            controller: 'ClientRemoveController'
        })

        .when('/projects', {
            templateUrl: 'build/views/project/list.html',
            controller: 'ProjectListController'
        })

        .when('/projects/new', {
            templateUrl: 'build/views/project/new.html',
            controller: 'ProjectNewController'
        })

        .when('/projects/:id/edit', {
            templateUrl: 'build/views/project/edit.html',
            controller: 'ProjectEditController'
        })

        .when('/project/:id/remove', {
            templateUrl: 'build/views/project/remove.html',
            controller: 'ProjectRemoveController'
        })

        .when('/project/:id/notes', {
            templateUrl: 'build/views/project-note/list.html',
            controller: 'ProjectNoteListController'
        })

        .when('/project/:id/notes/:idNote/show', {
            templateUrl: 'build/views/project-note/show.html',
            controller: 'ProjectNoteShowController'
        })

        .when('/project/:id/notes/new', {
            templateUrl: 'build/views/project-note/new.html',
            controller: 'ProjectNoteNewController'
        })

        .when('/project/:id/notes/:idNote/edit', {
            templateUrl: 'build/views/project-note/edit.html',
            controller: 'ProjectNoteEditController'
        })

        .when('/project/:id/notes/:idNote/remove', {
            templateUrl: 'build/views/project-note/remove.html',
            controller: 'ProjectNoteRemoveController'
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