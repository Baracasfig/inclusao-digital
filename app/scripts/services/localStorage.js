'use strict';

angular.module('inclusaoDigitalApp')
  .config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('inclusaoDigitalApp')
    .setNotify(true, true);
});