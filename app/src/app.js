"use strict";

angular.module("myApp", ["ngRoute", "myApp.home", "myApp.favorites"]).config([
  "$locationProvider",
  "$routeProvider",
  function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix("!");
    $routeProvider
      .when("/home", {
        templateUrl: "src/views/home.html",
        controller: "HomeCtrl",
      })
      .when("/favorites", {
        templateUrl: "src/views/favorites.html",
        controller: "FavoritesCtrl",
      })
      .otherwise({ redirectTo: "/home" });
  },
]);
