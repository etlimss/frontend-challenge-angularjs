"use strict";

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

angular.module("myApp.home", []).controller("HomeCtrl", [
  "$scope",
  "$http",
  "$timeout",
  function ($scope, $http, $timeout) {
    $scope.searchQuery = "";
    $scope.lastSearchQuery = "";
    $scope.searchResults = [];
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.allLoaded = false;
    $scope.apiCallsRemaining = 50;
    $scope.hasSearched = false;
    $scope.noResultsFound = false;
    $scope.favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");

    $scope.updateApiCallCount = function (headers) {
      const rateLimitRemaining = headers("x-ratelimit-remaining");
      if (rateLimitRemaining) {
        $scope.apiCallsRemaining = rateLimitRemaining;
      }
    };

    $scope.search = function () {
      $scope.currentPage = 1;
      $scope.searchResults = [];
      $scope.allLoaded = false;
      $scope.hasSearched = true;
      $scope.noResultsFound = false;
      $scope.lastSearchQuery = $scope.searchQuery;
      $scope.loadMore();
    };

    $scope.loadMore = function () {
      if ($scope.allLoaded || !$scope.searchQuery) return;

      const query = $scope.searchQuery || "nature";
      const url = `https://api.unsplash.com/search/photos?page=${$scope.currentPage}&query=${query}&per_page=${$scope.pageSize}&client_id=${UNSPLASH_API_KEY}`;

      $http.get(url).then(
        function (response) {
          $scope.updateApiCallCount(response.headers);
          if (response.data.results.length < $scope.pageSize) {
            $scope.allLoaded = true;
          }

          if (
            response.data.results.length === 0 &&
            $scope.searchResults.length === 0
          ) {
            $scope.noResultsFound = true;
          } else {
            $scope.noResultsFound = false;
          }

          let newResults = response.data.results;
          let delay = 0;

          newResults.forEach((result) => {
            $timeout(function () {
              $scope.searchResults.push(result);
            }, delay);
            delay += 250;
          });

          $scope.currentPage++;
        },
        function (error) {
          console.error("API Error:", error);
        }
      );
    };

    $scope.applyFilter = function (filter) {
      $scope.searchQuery = filter;
      $scope.search();
    };

    $scope.isFavorite = function (item) {
      return $scope.favorites.some((favorite) => favorite.id === item.id);
    };

    $scope.toggleFavorite = function (item) {
      const index = $scope.favorites.findIndex(
        (favorite) => favorite.id === item.id
      );
      if (index > -1) {
        $scope.favorites.splice(index, 1);
      } else {
        $scope.favorites.push(item);
      }
      sessionStorage.setItem("favorites", JSON.stringify($scope.favorites));
    };

    $scope.onSearchChange = function () {
      $scope.noResultsFound = false;
    };

    $scope.clearSearch = function () {
      $scope.searchQuery = "";
      $scope.searchResults = [];
      $scope.hasSearched = false;
      $scope.noResultsFound = false;
    };
  },
]);
