# Numlite

A lightweight AngularJs input directive for currency and number formatting. It also works well with external triggers (buttons etc.).

## Basic Usage

Just inject the Numlite into your app and enjoy.
It works well with external triggers (like buttons etc.).

Check the following example for basic usage:

```html
<div ng-app="myApp" ng-controller="myCtrl">
  <span> <button ng-click="model=model-1">-</button> </span>
  <input
    type="number"
    class="form-control"
    num-lite
    ng-model="model"
    vmin="{{minval}}"
    vmax="{{maxval}}"
    places="2"
  />
  <span> <button ng-click="model=model+1">+</button> </span>
</div>
<script>
  var app = angular.module('myApp', ['numLite']);
  app.controller('myCtrl', function($scope) {
    $scope.model = 5;
    $scope.minval = 2.23;
    $scope.maxval = 100;
  });
</script>
```

## Parameters

ngModel (required).

symbol: Units .Default Value is "$".

location: Location of the symbol parameter. "l" for left, "r" for right, default value is "l".

locale: Currency locale settings. "en" is default.

places: Decimal places. Default Value is 2.

vmin: Minimum value. Default value is zero ("0").

vmax: Maximum value. Default value is "999999".

defval: Devault value of control. If any error occurs. The value reverts back to default. Initial value is vmin.

## Dependencies

Numlite requires jQuery and AngularJs.
