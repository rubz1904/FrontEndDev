(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .filter('totalCost', TotalCalculator)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var tbCtrl = this;
      tbCtrl.items = ShoppingListCheckOffService.getToBuyItems();
      tbCtrl.buyItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
      };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var abCtrl = this;
      abCtrl.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
      var service = this;
    
      // List of shopping items
      var to_buy_items = [
        { name: "Toothpaste",
          quantity: 3,
          pricePerItem: 3.50},
        { name: "Cookies",
          quantity: 10,
          pricePerItem: 2.10},
        { name: "Loaf of Bread",
          quantity: 1,
          pricePerItem: 15.0},
        { name: "Soda",
          quantity: 2,
          pricePerItem: 5.0},
        { name: "Canned Beans",
          quantity: 10,
          pricePerItem: 2.0}
        ];
      var bought_items = [];
    
      service.buyItem = function (itemIndex) {
        bought_items.push(to_buy_items.splice(itemIndex, 1)[0]);
      };
    
      service.getToBuyItems = function () {
        return to_buy_items;
      };

      service.getBoughtItems = function () {
        return bought_items;
      };
    }

    function TotalCalculator() {
      return function (numberOfItems, totalCost) {
        numberOfItems = numberOfItems || 0;
        return "$$$" + (numberOfItems * totalCost).toFixed(2);
      }
    }
})();
