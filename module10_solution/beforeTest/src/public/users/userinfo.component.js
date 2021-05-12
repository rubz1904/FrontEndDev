(function () {
  'use strict';
  
  angular.module('public')
  .component('userinfo', {
    templateUrl: 'src/public/users/userinfo.component.template.html',
    bindings: {
      user: '<'
    }
  });
  
  })();