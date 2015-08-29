//Dependency injection
var photocloud = angular.module('photocloud', ['ionic', 'ngCordova', 'firebase']);

var firebase = new Firebase('https://myphotocloud.firebaseio.com/');

photocloud.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'AuthCtrl',
      cache: false
    })
    .state('photos', {
      url: '/photos',
      templateUrl: 'templates/photos.html',
      controller: 'PhotosCtrl'
    });

  $urlRouterProvider.otherwise('/login');
}])

.controller('AuthCtrl', ['$scope', '$state', '$firebaseAuth', function($scope, $state, $firebaseAuth){
  auth = $firebaseAuth(firebase);

  $scope.login = function(username, password){
    auth.$authWithPassword({
      email: username,
      password: password
    }).then(function(authData){
      console.log('You are logged in');
      $state.go('photos');
    }).catch(function(error){
      console.log('Error: '+ error)
    });
  }

  $scope.register = function(username, password){
    auth.$createUser({
      email: username,
      password: password
    }).then(function(authData){
      console.log('You are registered');
      $state.go('photos');
    }).catch(function(error){
      console.log('Error: '+ error)
    });
  }
}])

.controller('PhotosCtrl', ['$scope', '$state', '$firebaseAuth', function($scope, $state, $firebaseAuth){
  console.log('PhotosCtrl Loaded');
}])