(function () {
"use strict";

angular.module('public')
.controller('UserController', UserController);

UserController.$inject = ['UserService'];
function UserController(UserService) {
  var $ctrl = this;
  $ctrl.user = UserService.user;
}
})();
