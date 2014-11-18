'use strict';

angular.module('inclusaoDigitalApp')
  .controller('MensagensCtrl', function ($scope, localStorageService, $firebase) {
    $scope.messageType = 'recebidas';
    $scope.sendEmail = false;
    $scope.messageDetail = false;
    $scope.message = {};
    $scope.ref = new Firebase('https://blistering-torch-9877.firebaseio.com');
    $scope.sync = $firebase($scope.ref);
    $scope.messagesRef = $scope.ref.child('messages');

    $scope.list = $scope.sync.$asArray();
    $scope.list.$loaded().then(function() {
         console.log("list has " + list.length + " items");
      });
    $scope.limited = $firebase($scope.messagesRef.limitToLast(10))

    $scope.limited.on("value", function(snapshot) {
      $scope.messages = snapshot.val();
    });

    // identify the author
    $scope.message.author = localStorageService.get('email');

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

    $scope.sendMessage = function() {
      $scope.messagesRef.push({
        author: $scope.message.author,
        receiver: $scope.message.receiver,
        subject: $scope.message.subject,
        contentOfMessage: $scope.message.contentOfMessage
      });
      // clean
      $scope.message.receiver = null;
      $scope.message.subject = null;
      $scope.message.contentOfMessage = null;
    };
      



    // message example


    // $scope.message.subject = 'Primeiro e-mail';
    // $scope.message.author = 'Prof. Mariani';
    // $scope.message.day = '10/10/2014';
    // $scope.message.contentOfMessage = 'Olá, \n caros alunos do ID, \n as aulas começam amanhã!';
  });
