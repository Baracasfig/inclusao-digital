'use strict';

angular.module('inclusaoDigitalApp')
  .controller('MensagensCtrl', function ($scope, localStorageService) {
    $scope.messageType = 'recebidas';
    $scope.sendEmail = false;
    $scope.messageDetail = false;
    $scope.message = {};
    $scope.userEmail = localStorageService.get('email');

    $scope.isSentMessage = function() {
        $scope.messageType = 'enviadas';
        $scope.messageDetail = false;
      };

    $scope.isReceivedMessage = function() {
        $scope.messageType = 'recebidas';
        $scope.messageDetail = false;
      };

    $scope.isComposedMessage = function() {
        $scope.messageType = 'compor';
        $scope.messageDetail = false;
      };

    $scope.showMessageDetail = function() {
        $scope.messageDetail = true;
      };


    // message example


    $scope.message.subject = 'Primeiro e-mail';
    $scope.message.author = 'Prof. Mariani';
    $scope.message.day = '10/10/2014';
    $scope.message.contentOfMessage = 'Olá, \n caros alunos do ID, \n as aulas começam amanhã!';
  });
