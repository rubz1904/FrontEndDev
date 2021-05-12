(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);


//UserService.$inject = ['$http', 'ApiPath'];
function UserService() {
  var service = this;
  service.user = null;
  service.name = "Ruben";


}



})();
