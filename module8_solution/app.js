(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController )
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems', FoundItemsDirective);
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var narrowCtrl = this;
      narrowCtrl.nothingFound = false;
      narrowCtrl.searchForItems = function()
      {
        var prom = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);
        prom.then(function (response) {
          narrowCtrl.found = response;
          narrowCtrl.nothingFound = narrowCtrl.found.length===0;
        });

      };
      narrowCtrl.removeItem = function (itemIndex) {
        console.log("itemIndex is: ", itemIndex);
        console.log(narrowCtrl.found);
        var newList = [];
        for(var i = 0; i<narrowCtrl.found.length;i++)
        {
          if(i===itemIndex)
          {
            continue;
          }
          else
          {
            newList.push(narrowCtrl.found[i]);
          }
        }
        narrowCtrl.found = newList;
      };
    }
    MenuSearchService.$inject = ['$http','$q'];
    function MenuSearchService($http,$q) {
      var service = this;
      service.getMatchedMenuItems = function (searchTerm) {
        var deferred = $q.defer();
        return $http({
          method: "GET",
          url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
        }).then(function(response){
          var foundItems = [];
          for(var i = 0; i < response.data['menu_items'].length; i++)
          {
              var item = response.data['menu_items'][i];
              if( item.description.indexOf(searchTerm) > -1)
              {
                foundItems.push(item);
              }
          }
          deferred.resolve(foundItems);
          return deferred.promise;
        });
      };
    }

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'shoppingList.html',
        scope: {
          items: '=',
          onRemove: '&'
        }
      };
      return ddo;
    }
})();
