angular.module('adondeApp').directive('breadcrumbs', function ($compile) {
    return {
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            location: '@'
        },
        link: function(scope,element, attrs) {
            var urlArr = scope.location.split("/");
            var linkText = "", linkURL = "";
            for (var x = 0, arrLen = urlArr.length - 1; x < arrLen; x++)
            {
                if (urlArr[x] == "")
                    linkText += '<a href="#/home">Home</a>';
                else
                {
                    linkURL += "/" + urlArr[x];
                    linkText += '&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;<a href="#' + linkURL + '">' + urlArr[x] + '</a>';
                }
            }
            linkText = '<div class="regTextLeft">Navigation: ' + linkText + '</div>';
            element.append($compile(linkText)(scope));
        }
    };
});