/* global Firebase */

'use strict';

angular.module('inclusaoDigitalApp')
  .controller('ApresentacoesCtrl', function ($scope, $firebase) {

    var ref = new Firebase('https://inclusaodigital.firebaseio.com/apresentacoes');
    var sync = $firebase(ref);

    $scope.uploadedFiles = [];
    $scope.aulas = sync.$asArray();
    console.log($scope.aulas);

    $scope.addApresentacao = function(id, title, url) {
        $scope.aulas.$add({driveId: id, title: title, url: url});
      };

    $scope.$watchCollection('uploadedFiles', function(newArray, oldArray) {
      angular.forEach(newArray, function(obj) {
          $scope.aulas.$add(obj);
        });
      $scope.uploadedFiles = [];
      console.log($scope.uploadedFiles);
      console.log(oldArray);
    });

  });
