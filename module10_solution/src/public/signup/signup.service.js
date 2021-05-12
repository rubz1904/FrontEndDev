(function () {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);


SignUpService.$inject = ['$http','$q'];
    function SignUpService($http,$q) {
      var service = this;
    
      service.getAllShortNames = function () {
        var deferred = $q.defer();
        return $http({
          method: "GET",
          url: ("https://obscure-reaches-76374.herokuapp.com/menu_items.json")
        }).then(function(response){
          var shortnames = [];
          for(var index = 0; index < response.data.menu_items.length; index++)
          {
            var item = response.data.menu_items[index];
            shortnames.push(item["short_name"]);
          }
          deferred.resolve(shortnames);
          return deferred.promise;
        });
      };
    
    
      service.getItemsForCategory = function (categoryShortName) {
        var deferred = $q.defer();
        return $http({
          method: "GET",
          url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category="+categoryShortName)
        }).then(function(response){
          deferred.resolve(response.data["menu_items"]);
          return deferred.promise;
        });
      };
    }



})();
