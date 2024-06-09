angular.module("myApp").component("cardComponent", {
  bindings: {
    title: "@",
    imageUrl: "@",
    onClick: "&",
  },
  template: `
      <div class="card" ng-click="$ctrl.onClick()">
        <img
          class="card-background"
          ng-src="{{$ctrl.imageUrl}}"
          alt="{{$ctrl.title}}"
        />
        <div class="card-content">
          <div class="card-content--container">
            <h3 class="card-title">{{$ctrl.title}}</h3>
          </div>
          <div class="card-btn--container">
            <button class="card-button">
                Explore
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    `,
  controller: function () {},
});
