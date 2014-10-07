'use strict';

angular.module('inclusaoDigitalApp')
  .controller('MensagensCtrl', function ($scope) {
    $scope.messageType = "recebidas";
    $scope.sendEmail = false;

    $scope.isSentMessage = function() {
    	$scope.messageType = "enviadas"; 
    };

    $scope.isReceivedMessage = function() {
    	$scope.messageType = "recebidas"; 
    };

    $scope.isComposedMessage = function() {
    	$scope.messageType = "compor"; 
    };

  });
