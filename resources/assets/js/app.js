var app = angular.module('app', ['ngRoute', 'angular-oauth2', 'app.controllers', 'app.services',
    'app.filters', 'app.directives','ui.bootstrap.typeahead', 'ui.bootstrap.datepicker', 'ui.bootstrap.tpls',
    'ui.bootstrap.dropdown', 'ui.bootstrap.modal', 'ngFileUpload', 'http-auth-interceptor', 'angularUtils.directives.dirPagination',
    'mgcrea.ngStrap.navbar', 'mgcrea.ngStrap.dropdown', 'ui.bootstrap.tabs', 'pusher-angular', 'ui-notification']);

angular.module('app.controllers', ['ngMessages', 'angular-oauth2']);
angular.module('app.filters', []);
angular.module('app.services', ['ngResource']);
angular.module('app.directives', []);



app.provider('appConfig', ['$httpParamSerializerProvider', function($httpParamSerializerProvider){
    var config = {
        baseUrl: 'http://localhost:8000',
        pusherKey: '31ba261ea7bbfd9cde22',
        project:{
            status: [
                {value:1, label: 'Não iniciado'},
                {value:2, label: 'Iniciado'},
                {value:3, label: 'Concluído'}
            ]
        },
        projectTask:{
            status: [
                {value:1, label: 'Completa'},
                {value:2, label: 'Incompleta'}
            ]
        },
        urls: {
            projectFile: '/project/{{id}}/file/{{idFile}}'
        },
        utils: {
            transformRequest: function (data) {
                if (angular.isObject(data)) {
                    return $httpParamSerializerProvider.$get()(data);
                }
                return data;
            },
            transformResponse: function(data, headers) {

                var headerGetter = headers();
                if(headerGetter['content-type'] == 'application/json' ||
                    headerGetter['content-type'] == 'text/json'){
                    var dataJson = JSON.parse(data);
                    if(dataJson.hasOwnProperty('data') && Object.keys(dataJson).length == 1){
                        dataJson = dataJson.data;
                    }
                    return dataJson;
                }
                return data;
            }
        }
    };

    return {
        config: config,
        $get: function() {
            return config;
        }
    }
}]);

//rotas
app.config([
    '$routeProvider', '$httpProvider', 'OAuthProvider',
    'OAuthTokenProvider', 'appConfigProvider',
    function($routeProvider, $httpProvider, OAuthProvider, OAuthTokenProvider, appConfigProvider){

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.transformRequest = appConfigProvider.config.utils.transformRequest;
        $httpProvider.defaults.transformResponse = appConfigProvider.config.utils.transformResponse;
        $httpProvider.interceptors.splice(0, 1);
        $httpProvider.interceptors.splice(0, 1);
        $httpProvider.interceptors.push('oauthFixInterceptor');
    $routeProvider
        .when('/login', {
            templateUrl: 'build/views/login.html',
            controller:'LoginController'
        })

        .when('/logout', {
            resolve: {
                logout:['$location', 'OAuthToken', function($location, OAuthToken) {
                    //pegar os cookies do angular e vai destruir..
                     OAuthToken.removeToken()
                     return $location.path('/login');
                }]
            }
        })

        .when('/home', {
            templateUrl: 'build/views/home.html',
            controller:'HomeController'
        })

        .when('/clients/dashboard', {
            templateUrl: 'build/views/client/dashboard.html',
            controller:'ClientDashboardController',
            title: 'Clients'
        })

        .when('/clients', {
            templateUrl: 'build/views/client/list.html',
            controller:'ClientListController',
            title: 'Clients'
        })

        .when('/clients/new', {
            templateUrl: 'build/views/client/new.html',
            controller:'ClientNewController',
            title: 'Clients'
        })

        .when('/client/:id/edit', {
            templateUrl: 'build/views/client/edit.html',
            controller: 'ClientEditController',
            title: 'Clients'
        })

        .when('/client/:id/remove', {
            templateUrl: 'build/views/client/remove.html',
            controller: 'ClientRemoveController',
            title: 'Clients'
        })

        .when('/projects/dashboard', {
            templateUrl: 'build/views/project/dashboard.html',
            controller:'ProjectDashboardController',
            title: 'Projects'
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
        .when('/project/:id/note/new', {
            templateUrl: 'build/views/project-note/new.html',
            controller: 'ProjectNoteNewController'
        })
        .when('/project/:id/note/:idNote/edit', {
            templateUrl: 'build/views/project-note/edit.html',
            controller: 'ProjectNoteEditController'
        })
        .when('/project/:id/note/:idNote/remove', {
            templateUrl: 'build/views/project-note/remove.html',
            controller: 'ProjectNoteRemoveController'
        })
        .when('/project/:id/note/:idNote/show', {
            templateUrl: 'build/views/project-note/show.html',
            controller: 'ProjectNoteShowController'
        })

        .when('/project/:id/tasks', {
            templateUrl: 'build/views/project-task/list.html',
            controller: 'ProjectTaskListController'
        })
        .when('/project/:id/task/new', {
            templateUrl: 'build/views/project-task/new.html',
            controller: 'ProjectTaskNewController'
        })
        .when('/project/:id/task/:idTask/edit', {
            templateUrl: 'build/views/project-task/edit.html',
            controller: 'ProjectTaskEditController'
        })
        .when('/project/:id/task/:idTask/remove', {
            templateUrl: 'build/views/project-task/remove.html',
            controller: 'ProjectTaskRemoveController'
        })
        .when('/project/:id/task/:idTask/show', {
            templateUrl: 'build/views/project-task/show.html',
            controller: 'ProjectTaskShowController'
        })

        .when('/project/:id/files', {
            templateUrl: 'build/views/project-file/list.html',
            controller: 'ProjectFileListController'
        })

        .when('/project/:id/files/:idFile/show', {
            templateUrl: 'build/views/project-file/show.html',
            controller: 'ProjectFileShowController'
        })

        .when('/project/:id/files/new', {
            templateUrl: 'build/views/project-file/new.html',
            controller: 'ProjectFileNewController'
        })

        .when('/project/:id/files/:idFile/edit', {
            templateUrl: 'build/views/project-file/edit.html',
            controller: 'ProjectFileEditController'
        })

        .when('/project/:id/files/:idFile/remove', {
            templateUrl: 'build/views/project-file/remove.html',
            controller: 'ProjectFileRemoveController'
        })

        .when('/project/:id/members', {
            templateUrl: 'build/views/project-member/list.html',
            controller: 'ProjectMemberListController'
        })
        .when('/project/:id/member/:idMember/remove', {
            templateUrl: 'build/views/project-member/remove.html',
            controller: 'ProjectMemberRemoveController'
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
app.run(['$rootScope', '$location', '$http', '$modal', '$cookies', '$pusher', 'httpBuffer', 'OAuth', 'appConfig', 'Notification',
    function($rootScope, $location, $http, $modal, $cookies, $pusher,  httpBuffer, OAuth, appConfig, Notification) {

    $rootScope.$on('pusher-build', function(event, data){
        if(data.next.$$route.originalPath != '/login') {
            if(OAuth.isAuthenticated()) {
                if (!window.client) {
                    window.client = new Pusher(appConfig.pusherKey);
                    var pusher = $pusher(window.client);
                    var channel = pusher.subscribe('user.' + $cookies.getObject('user').id);
                    channel.bind('CodeProject\\Events\\TaskWasIncluded',
                        function (data) {
                            //console.log(data);
                            var nome = data.task.name;
                            Notification.success('Tarefa '+nome+' foi incluida!');
                        }
                    );
                }
            }
        }

    });

    $rootScope.$on('pusher-destroy', function(event, data){
        if(data.next.$$route.originalPath == '/login') {
            if (window.client) {
                window.client.disconnect();
                window.client = null;
            }
        }
    });


    //evento e proxima rota atual
    $rootScope.$on('$routeChangeStart', function(event,next,current){
        //olhar next se é diferente do login e se token existe na aplicação
        //url da rota que o usuario vai acessar
        if(next.$$route.originalPath != '/login') {
            //vai nos cookies do angular e verifica o token se não existir ele retorna falso
            if(!OAuth.isAuthenticated()) {
                $location.path('login');
            }
        }

        $rootScope.$emit('pusher-build', {next: next});
        $rootScope.$emit('pusher-destroy', {next: next});
    });

    $rootScope.$on('$routeChangeSuccess', function(event,current,previous){
        $rootScope.pageTitle = current.$$route.title;
    });

    $rootScope.$on('oauth:error', function (event, data) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === data.rejection.data.error) {
            return;
        }

        // Refresh token when a `invalid_token` error occurs.
        if ('access_denied' === data.rejection.data.error) {
            httpBuffer.append(data.rejection.config, data.deferred);
            if (!$rootScope.loginModalOpened) {
                var modalInstance = $modal.open({
                    templateUrl: 'build/views/templates/login-modal.html',
                    controller: 'LoginModalController'
                });
                $rootScope.loginModalOpened = true;
            }
            return;
        }

        // Redirect to `/login` with the `error_reason`.
        return $location.path('/login');
    });
}]);