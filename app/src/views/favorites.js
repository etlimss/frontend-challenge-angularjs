"use strict";

angular.module("myApp.favorites", []).controller("FavoritesCtrl", [
  "$scope",
  function ($scope) {
    $scope.favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");

    $scope.toggleFavorite = function (item) {
      const index = $scope.favorites.findIndex(
        (favorite) => favorite.id === item.id
      );
      if (index > -1) {
        $scope.favorites.splice(index, 1);
      }
      sessionStorage.setItem("favorites", JSON.stringify($scope.favorites));
    };

    $scope.isFavorite = function (item) {
      return $scope.favorites.some((favorite) => favorite.id === item.id);
    };
  },
]);
