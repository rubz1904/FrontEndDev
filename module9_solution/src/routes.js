(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.html'
  })

  // Categories
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController as cCtrl',
    resolve:{
      categories: ['MenuDataService',function(MenuDataService){
        return MenuDataService.getAllCategories();
      }]
    }
  })
  // items
  .state('items', {
    url: '/items/{categoryId}',
    templateUrl: 'src/templates/items.template.html',
    controller: 'ItemsController as iCtrl',
    resolve:{
      items: ['$stateParams','MenuDataService',function($stateParams,MenuDataService){
        return MenuDataService.getItemsForCategory($stateParams.categoryId);
      }]
    }
  })
  ;
}

})();
