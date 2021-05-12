describe('menucategories', function () {

  var $controller;
  var signupcontroller;
  var $httpBackend;
  var originalTimeout;

  beforeEach(function () {
    module('public');
    inject(function ($injector, $http, $controller) {
      $httpBackend = $injector.get('$httpBackend');
      signupcontroller = $controller('SignUpController', {
        $http: $http,
        someService: function(){}
      });
      signupcontroller.user = {};
      
    });
  });

  it('should set invalidshortname to false', function() {
    signupcontroller.user.shortname = "A1";
    $httpBackend.whenGET("https://obscure-reaches-76374.herokuapp.com/menu_items/" + signupcontroller.user.shortname + ".json").respond(['a']);
    signupcontroller.validateshortname();
    $httpBackend.flush();
    expect(signupcontroller.invalidshortname).toEqual(false);
  });

  it('should set invalidshortname to true', function() {
    signupcontroller.user.shortname = "Test";
    $httpBackend.whenGET("https://obscure-reaches-76374.herokuapp.com/menu_items/" + signupcontroller.user.shortname + ".json").respond(500, {});
    signupcontroller.validateshortname();
    $httpBackend.flush();
    expect(signupcontroller.invalidshortname).toEqual(true);
  });

});
