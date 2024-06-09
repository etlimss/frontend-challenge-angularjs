"use strict";

angular.module("myApp").directive("appNavbar", function () {
  return {
    restrict: "E",
    templateUrl: "src/components/navbar/navbar.html",
    controller: [
      "$scope",
      "$location",
      function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path();
        };
      },
    ],
  };
});
