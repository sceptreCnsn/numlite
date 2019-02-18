angular.module('numLite', []).directive('numLite', function() {
    return {
      require: 'ngModel',
      scope: {
        symbol: '@',
        location: '@',
        locale: '@',
        places: '@',
        vmin: '@',
        vmax: '@',
        defval: '@',
        model: '=ngModel'
      },
      link: function(scope, elm, attrs, ctrl) {
        getDefVals();
  
        $(elm).prop('type', 'text');
  
        scope.$watch('model', function(v) {
          if (!elm.is(':focus')) {
            checkValue(0);
            calcElmVal();
          }
        });
  
        elm.on('focus', function() {
          $(elm).prop('type', 'number');
          scope.model = parseFloat(ctrl.$viewValue).toFixed(scope.places);
          ctrl.$render();
        });
  
        elm.on('keypress', function(event) {
          if (event.keyCode === 13) {
            elm.blur();
            return !1;
          }
          if (event.charCode === 101) {
            return !1;
          }
          if (scope.vmin >= 0 && event.charCode === 45) {
            return !1;
          }
          const val = elm.val();
          if (scope.places === '0') {
            if (event.charCode === 46) {
              return !1;
            }
            if (val.length >= scope.vmax.length) {
              return !1;
            }
          } else {
            if (val.includes('.') && event.charCode === 46) return !1;
          }
        });
  
        elm.on('focusout', function() {
          $(elm).prop('type', 'text');
          checkValue(1);
          calcElmVal();
        });
  
        function getDefVals() {
          scope.symbol = angular.isDefined(scope.symbol) ? scope.symbol : '$';
          scope.location = angular.isDefined(scope.location)
            ? scope.location
            : 'l';
          scope.locale = angular.isDefined(scope.locale) ? scope.locale : 'en';
          scope.places = angular.isDefined(scope.places) ? scope.places : '2';
          scope.vmin = angular.isDefined(scope.vmin) ? scope.vmin : '0';
          scope.vmax = angular.isDefined(scope.vmax) ? scope.vmax : '999999';
          scope.defval = angular.isDefined(scope.defval)
            ? scope.defval
            : scope.vmin;
          if (scope.defval < scope.vmin) {
            scope.defval = scope.vmin;
          }
          if (scope.defval > scope.vmax) {
            scope.defval = scope.vmax;
          }
        }
  
        function calcElmVal() {
          if (scope.location === 'r')
            elm.val(
              Number(
                parseFloat(parseFloat(ctrl.$viewValue).toFixed(scope.places))
              ).toLocaleString(scope.locale, {
                minimumFractionDigits: scope.places
              }) +
                ' ' +
                scope.symbol
            );
          else if (scope.location === 'l')
            elm.val(
              scope.symbol +
                ' ' +
                Number(
                  parseFloat(ctrl.$viewValue).toFixed(scope.places)
                ).toLocaleString(scope.locale, {
                  minimumFractionDigits: scope.places
                })
            );
        }
  
        function checkValue(sender) {
          let val = ctrl.$viewValue;
          if (sender == 1) {
            if (parseFloat(val) > scope.vmax) {
              val = scope.vmax;
              ctrl.$setViewValue(parseFloat(scope.vmax).toFixed(scope.places));
              ctrl.$render();
            } else if (parseFloat(val) < scope.vmin) {
              val = scope.vmin;
              ctrl.$setViewValue(parseFloat(scope.vmin).toFixed(scope.places));
              ctrl.$render();
            }
            if (
              val.toString().includes('.') &&
              val.split('.')[1].length >= parseInt(scope.places) + 1
            ) {
              ctrl.$setViewValue(parseFloat(val).toFixed(scope.places));
              ctrl.$render();
            }
            if (ctrl.$invalid || isNaN(val) || val.toString() == '') {
              ctrl.$setViewValue(parseFloat(scope.defval).toFixed(scope.places));
              ctrl.$render();
            }
          } else {
            ctrl.$setViewValue(val);
            ctrl.$render();
          }
          scope.model = parseFloat(ctrl.$viewValue);
        }
      }
    };
  });
  