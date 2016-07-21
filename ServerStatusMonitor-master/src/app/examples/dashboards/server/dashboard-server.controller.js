(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardServerController', DashboardServerController);

    /* @ngInject */
    function DashboardServerController($scope, $stateParams, $timeout, $mdToast, $log, serverService, triMenu) {
        console.log(serverService);

        triMenu.removeMenu('triangular.admin-default.dashboard-server');

        for(var i=0;i<serverService.serverList.length;i++){
            triMenu.addMenu({
                name: serverService.serverList[i].name,
                state: 'triangular.admin-default.dashboard-server',
                type: 'button',
                icon: 'zmdi zmdi-flower-alt',
                params : {server:serverService.serverList[i].id}
            })
        }

        //choose the first one
        serverService.switchServer(serverService.serverList[0].id);


        //update action
        $scope.updateContent = function(){
            $scope.serverCharts = serverService.serverCharts;
        }
        /**
         * register $watch,
         * update when value changed
         */
        $scope.$watch(function(){
            return serverService.serverUpdated;
        },$scope.updateContent)



        var vm = this;




        $log.log($stateParams);

        vm.menuButtonAction = function(type){

        }

        // $timeout(function() {
        //     $mdToast.show(
        //         $mdToast.simple()
        //         .content('Server CPU at 100%!')
        //         .position('bottom right')
        //         .hideDelay(3000)
        //     );
        // }, 5000);
    }
})();
