'use strict';

angular.module('inclusaoDigitalApp')
  .controller('MensagensCtrl', function ($scope, localStorageService) {
    $scope.messageType = 'recebidas';
    $scope.sendEmail = false;
    $scope.messageDetail = false;
    $scope.message = {};
    $scope.ref = new Firebase('https://inclusao-digital.firebaseio.com');
    $scope.messagesRef = $scope.ref.child('messages');
    $scope.usersRef = $scope.ref.child('users');
    $scope.date = Date();
    

    // identify the author
    $scope.message.author = localStorageService.get('user.email');

    // $scope.sync = $firebase($scope.ref);
    // $scope.limited = $firebase($scope.ref.limitToLast(10));
    // $scope.list = $scope.limited.$asArray();

    // $scope.queryRef = $scope.ref.limitToLast(2);

    $scope.sent = {};
    $scope.received = {};

    $scope.refreshMessages = function () {
      $scope.messagesRef.on('value', function(snapshot) {
        $scope.messages = snapshot.val();
        var j = 0;
        var k = 0;
        for (var key in $scope.messages) {
          var obj = $scope.messages[key];
          if (obj.author === $scope.message.author) {
            $scope.sent[j] = obj;
            j = j+1;
          }
          if (obj.receiver === $scope.message.author) {
            $scope.received[k] = obj;
            k = k+1;
          }
        }
      });
    };

    $scope.getUsers = function() {
      $scope.usersRef.on('value', function(snapshot) {
        $scope.users = snapshot.val();
      });
    };
    


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

    $scope.showMessageDetail = function(row) {
        $scope.messageDetail = true;
        $scope.detail = row;
      };

    $scope.sendMessage = function() {
      $scope.messagesRef.push({
        author: $scope.message.author,
        receiver: $scope.message.receiver,
        subject: $scope.message.subject,
        contentOfMessage: $scope.message.contentOfMessage,
        data: Date()
      });
      // clean
      $scope.message.receiver = null;
      $scope.message.subject = null;
      $scope.message.contentOfMessage = null;
      $scope.refreshMessages();
    };
      
    $scope.refreshMessages();
    $scope.getUsers();

  });
