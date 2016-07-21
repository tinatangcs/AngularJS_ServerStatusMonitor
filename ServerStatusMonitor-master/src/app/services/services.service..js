(function() {
    'use strict';

    angular.module('app.services')
        .factory('serverService', function(triMenu, $interval, triBreadcrumbsService) {
            var serverService = this;

            //we create a fake list here. Normally, it should be fetch from a running server
            this.serverList = [
                {
                    name: 'Ubuntu #1',
                    id: '#0001'
                }, {
                    name: 'Ubuntu #2',
                    id: '#0002'
                }, {
                    name: 'Ubuntu #3',
                    id: '#0003'
                }, {
                    name: 'Ubuntu #4',
                    id: '#0004'
                }, {
                    name: 'Ubuntu #5',
                    id: '#0005'
                }, {
                    name: 'Windows Server #1',
                    id: '#0006'
                }, {
                    name: 'Windows Server #2',
                    id: '#0007'
                }, {
                    name: 'Windows Server #3',
                    id: '#0008'
                }, {
                    name: 'Windows Server #4',
                    id: '#0009'
                }, {
                    name: 'Windows Server #5',
                    id: '#0010'
                }
            ];

            this.server = null;
            this.serverUpdated = null;

            this.switchServer = function(server) {

                // $log.log(server);

                for (var i = 0; i < triMenu.menu.length; i++) {
                    if (triMenu.menu[i].params && triMenu.menu[i].params.server == server) {
                        triMenu.menu[i].active = true;
                        triBreadcrumbsService.reset();
                        triBreadcrumbsService.addCrumb(triMenu.menu[i]);
                    } else {
                        triMenu.menu[i].active = false;
                    }
                }

                //fake data again: 
                this.serverCharts = getInitialData(server);

                this.serverUpdated = new Date();
            };

            // Update the dataset at 25FPS for a smoothly-animating chart
            $interval(function() {
                getLiveChartData(serverService.serverCharts.bandwidth);
                getLiveChartData(serverService.serverCharts.cpu);
            }, 1000);

            this.data = {};

            function getInitialData(server) {

                if (serverService.data[server])
                    return serverService.data[server];

                var serverCharts = {
                    bandwidth: {
                        dataLength: 50,
                        maximum: 40,
                        data: [[]],
                        labels: [],
                        options: {
                            animation: false,
                            showTooltips: false,
                            pointDot: false,
                            datasetStrokeWidth: 0.5,
                            maintainAspectRatio: false
                        },
                        colours: ['#4285F4']
                    },
                    cpu: {
                        dataLength: 50,
                        maximum: 100,
                        data: [[]],
                        labels: [],
                        options: {
                            animation: false,
                            showTooltips: false,
                            pointDot: false,
                            datasetStrokeWidth: 0.5,
                            maintainAspectRatio: false
                        },
                        colours: ['#DB4437']
                    },
                    ipAddress: '',
                    memoryStatus: {
                        size: 16,
                        used: 13.2,
                        usage: 0.67
                    },
                    cpuStatus: {
                        size: 4,
                        used: 0.31,
                        usage: 0.67,
                        temperature: 70
                    },
                    diskStatus: {
                        size: 8,
                        used: 0.31,
                        usage: 0.67
                    },

                    data24hrs: {
                        series: ['Bandwidth', 'CPU'],
                        labels: ['00:00', '01:00', '02:00', '03:00', 
                        '04:00', '05:00', '06:00', '07:00', '08:00', 
                        '09:00', '10:00', '11:00', '12:00', '13:00', 
                        '14:00', '15:00', '16:00', '17:00', '18:00', 
                        '19:00', '20:00', '21:00', '22:00', '23:00']
                    },
                    data7days: {
                        series: ['Bandwidth', 'CPU'],
                        labels: ['Monday', 'Tuesday', 'Wednesday', 
                        'Thursday', 'Friday', 'Saturday', 'Sunday']
                    },
                    data365days: {
                        series: ['Bandwidth', 'CPU'],
                        labels: ['January', 'February', 'March', 
                        'April', 'May', 'June', 'July', 'August', 
                        'September', 'October', 'November', 'December']
                    },

                    diskUsage: {
                        labels: ['Swap space', 'Kernel', 'OS', 'Free space'],
                        data: [15, 5, 35, 45]
                    }
                };

                randomData(serverCharts.data24hrs);
                randomData(serverCharts.data7days);
                randomData(serverCharts.data365days);

                serverCharts.cpuStatus.usage = Math.random();
                serverCharts.cpuStatus.used = serverCharts.cpuStatus.size * serverCharts.cpuStatus.usage;

                serverCharts.diskStatus.usage = Math.random();
                serverCharts.diskStatus.used = serverCharts.diskStatus.size * serverCharts.diskStatus.usage;

                serverCharts.memoryStatus.usage = Math.random();
                serverCharts.memoryStatus.used = serverCharts.memoryStatus.size * serverCharts.memoryStatus.usage;

                serverCharts.diskUsage.data = [
                    Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100
                ];

                serverService.data[server] = serverCharts;

                return serverCharts;
            }

            function getLiveChartData(chart) {
                if (chart.data[0].length) {
                    chart.labels = chart.labels.slice(1);
                    chart.data[0] = chart.data[0].slice(1);
                }

                while (chart.data[0].length < chart.dataLength) {
                    chart.labels.push('');
                    chart.data[0].push(getRandomValue(chart.data[0], chart.maximum));
                }
            }

            function randomData(chart) {
                chart.data = [];
                for (var series = 0; series < chart.series.length; series++) {
                    var row = [];
                    for (var label = 0; label < chart.labels.length; label++) {
                        row.push(Math.floor((Math.random() * 100) + 1));
                    }
                    chart.data.push(row);
                }
            }

            function getRandomValue(data, max) {
                var l = data.length, previous = l ? data[l - 1] : 50;
                var y = previous + Math.random() * 10 - 5;
                return y < 0 ? 0 : y > max ? max : y;
            }

            return serverService;
        });

})();

