(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$http','UserService'];
function SignUpController($http,UserService) {
  var reg = this;
  reg.submit = function () {
    var shortname = reg.user.shortname;
    var urlLink = "https://obscure-reaches-76374.herokuapp.com/menu_items/" + shortname + ".json";
    return $http({
      method: "GET",
      url: (urlLink)
    }).then(function(response){
      reg.invalidshortname = false;
      reg.registrationcomplete = true;
      UserService.user = reg.user;
    })
    .catch(function (error) {
      reg.invalidshortname = true;
      console.log(error);
    });
  };

  reg.validateshortname = function(){
    var shortname = reg.user.shortname;
    var urlLink = "https://obscure-reaches-76374.herokuapp.com/menu_items/" + shortname + ".json";
    return $http({
      method: "GET",
      url: (urlLink)
    }).then(function(response){
      reg.invalidshortname = false;
    })
    .catch(function (error) {
      reg.invalidshortname = true;
      console.log(error);
    });
  };
}


})();
