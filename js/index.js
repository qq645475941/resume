/**
 * Created by qingyun on 16/10/21.
 */
var myApp = angular.module('heroes', ['ui.router']);
myApp.config(function ($stateProvider) {
    var personList = {
        name: 'personList',
        templateUrl: 'temp/personList.html',
        url: '/personList',
        resolve: {
            data: function ($http) {
                var pro = $http.get('data/perList.json');
                return pro.then(function (data) {
                    var info = data.data;
                    return info;
                });

            }
        },
        controller: function ($scope, data) {
            // console.log(data);
            $scope.perList = data.list;
            $scope.show=false;
            $scope.changeState=function () {
                if(!$scope.show){
                    $scope.show=true;
                }else{
                    $scope.show=false;
                }
            };
            $scope.name='张三丰';
            $scope.skill='太极拳';
            $scope.addData=function () {
                console.log($scope.name);
                var addNum={"name":$scope.name,"skill":$scope.name.skill}
                $scope.perList.push(addNum);
                $scope.show=false;
            }

        }

    };
    var Detail = {
        name: 'detail',
        url: "/detail/:id",
        parent: 'personList',
        views: {
            'detail@': {
                templateUrl: 'temp/detail.html',
                controller: function ($stateParams, $scope, data) {
                    var _id = $stateParams.id;
                    $scope.detail = data.detail[_id];
                }
            }
        }
    };
    var add = {
        name: 'addPerson',
        parent: 'personList',
        url:'/add',
        views: {
            'add@': {
                templateUrl: 'temp/add.html',
                controller:function ($rootScope,$scope) {
                    console.log($rootScope);
                    console.log($scope);
                }
            }
        }
    }


$stateProvider.state(personList)
    .state(Detail)
    .state(add)

})
