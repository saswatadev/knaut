angular.module('app')

    .directive('dynamicUrl', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attr) {
                element.attr('src', attr.dynamicUrlSrc);
            }
        };
    })

    .filter('limitHtml', function() {
        return function(text, limit) {

            var changedString = String(text).replace(/<[^>]+>/gm, '');
            var length = changedString.length;

            return length > limit ? changedString.substr(0, limit - 1)+'....' : changedString;
        }
    })