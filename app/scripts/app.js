'use strict';

angular.module('inclusaoDigitalApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'angularfire.firebase',
  'angularfire.login',
  'simpleLoginTools',
  'LocalStorageModule',
  'lk-google-picker'
])
  .config(function ($routeProvider, lkGoogleSettingsProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        authRequired: false, // if true, must log in before viewing this page
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/apresentacoes', {
        authRequired: false, // if true, must log in before viewing this page
        templateUrl: 'views/apresentacoes.html',
        controller: 'ApresentacoesCtrl'
      })
      .when('/apostilas', {
        authRequired: false, // if true, must log in before viewing this page
        templateUrl: 'views/apostilas.html',
        controller: 'ApostilasCtrl'
      })
      .when('/atas', {
        authRequired: false, // if true, must log in before viewing this page
        templateUrl: 'views/atas.html',
        controller: 'AtasCtrl'
      })
      .when('/mensagens', {
        authRequired: true, // if true, must log in before viewing this page
        templateUrl: 'views/mensagens.html',
        controller: 'MensagensCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    lkGoogleSettingsProvider.configure({
      apiKey   : 'AIzaSyBD_BmWHAHvpKzKG7gKDUYqrph-EigGNC0',
      clientId : '634238586524-tne1h4l2o0pffq2itgekd29m7up54f86.apps.googleusercontent.com',
      scopes   : ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'],
      locale   : 'pt-BR',
      views    : ['DocsUploadView().setMimeTypes("application/vnd.ms-powerpointtd,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")',
                  'DocsView().setMimeTypes("application/vnd.google-apps.presentation,application/vnd.ms-powerpointtd,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.google-apps.presentation,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")'
                 ]
    });
  });
