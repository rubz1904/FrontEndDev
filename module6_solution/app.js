(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
      $scope.userMessage = "";
    
      $scope.countItems = function () {
        var itemListStr = $scope.textArea;
        var userMsg = "Please enter data first";
        var newStyleTxt = {"color" : "red"};
        var newStyleTxtBox = {"border-color": "red"};
        if(itemListStr != undefined && itemListStr.length > 0)
        {
          var itemList = removeBlanks(itemListStr.split(","));
          var newStyleTxt = {"color" : "green"};
          var newStyleTxtBox = {"border-color": "green"};
          if(itemList.length > 0 && itemList.length < 4 )
          {
            userMsg = "Enjoy!";
          }
          else if(itemList.length > 3)
          {
            userMsg = "Too much!";
          }
          else{
            var newStyleTxt = {"color" : "red"};
            var newStyleTxtBox = {"border-color": "red"};
          }
        }
        $scope.userMessage = userMsg;
        $scope.txtStyleMsg = newStyleTxt;
        $scope.txtStyleArea = newStyleTxtBox;


      };
    }
    
})();

function removeBlanks(originalList)
{
  var newList = [];
  for(var i = 0; i<originalList.length; i++ )
  {
    if(originalList[i].trim().length > 0)
    {
      newList.push(originalList[i].trim());
    }
  }
  return newList;
}