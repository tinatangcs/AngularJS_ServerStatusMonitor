(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        // Setup the apps routes

        // 404 & 500 pages
        $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: '404.tmpl.html',
            controllerAs: 'vm',
            controller: function($state) {
                var vm = this;
                vm.goHome = function() {
                    $state.go('triangular.admin-default.dashboard-analytics');
                };
            }
        })

        .state('500', {
            url: '/500',
            templateUrl: '500.tmpl.html',
            controllerAs: 'vm',
            controller: function($state) {
                var vm = this;
                vm.goHome = function() {
                    $state.go('triangular.admin-default.dashboard-analytics');
                };
            }
        });


        // $urlRouterProvider.otherwise(function($state){
            // $state.go('triangular.admin-default.dashboard-server',{server:'ubuntu_1'})
        // });
        // set default routes when no path specified
        $urlRouterProvider.when('', '/');
        // $urlRouterProvider.when('/', '/dashboards/server');

        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/');
    }
})();