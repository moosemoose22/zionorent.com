'use strict';

/* App Module */

var adondeApp = angular.module('adondeApp', [
    'ngSanitize',
	'ngRoute',
    'com.verico.ng-galleria'
]);

adondeApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

adondeApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/travel', {
			templateUrl: 'pages/travel.html',
			controller: 'TravelCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/series/anonymity', {
			templateUrl: 'pages/anonymity.html',
			controller: 'AnonymityCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/series/worldpeople', {
			templateUrl: 'pages/ourworld.html',
			controller: 'WorldPeopleCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/series/digidarkroom', {
			templateUrl: 'pages/digidarkroom.html',
			controller: 'DigiDarkroomCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/series/peoplenature', {
			templateUrl: 'pages/peoplenature.html',
			controller: 'PeopleNatureCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/digidarkroom', {
			templateUrl: 'pages/digidarkroom.html',
			controller: 'DigiDarkroomCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/darkroom/bwdarkroom', {
			templateUrl: 'pages/bwdarkroom.html',
			controller: 'BWDarkroomCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/darkroom/colordarkroom', {
			templateUrl: 'pages/colordarkroom.html',
			controller: 'ColorDarkroomCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/darkroom/colordarkroom/howitworks', {
			templateUrl: 'pages/colordarkroomStory.html',
			controller: 'mainController'
		}).
		when('/darkroom/colordarkroom/analogvsdigital', {
			templateUrl: 'pages/colordarkroomComparison.html',
			controller: 'mainController'
		}).
		when('/darkroom/colordarkroom/printing', {
			templateUrl: 'pages/colordarkroomPrinting.html',
			controller: 'mainController'
		}).
		when('/photobooks/:photobookID', {
			templateUrl: 'pages/photobook.html',
			controller: 'photobookdetailCntl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/photobooks', {
			templateUrl: 'pages/photobooks.html',
			controller: 'photobookCntl',
            resolve: {
                "dataServiceData": function(dataService){
                    console.log("moo")
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/darkroom', {
			templateUrl: 'pages/darkroom.html',
			controller: 'DefaultCtrl'
		}).
		when('/series', {
			templateUrl: 'pages/series.html',
			controller: 'DefaultCtrl'
		}).
		when('/blog', {
			templateUrl: 'pages/blog.php',
			controller: 'DefaultCtrl'
		}).
    when('/latest', {
			templateUrl: 'pages/latestnew.html',
			controller: 'BlogCntlNew',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/latest/category/:blogCategoryID', {
			templateUrl: 'pages/latestPhotoGallery.html',
			controller: 'blogCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
/*
            resolve: function($q, dataService) {
                //create the defer variable and pass it to our service
                var defer = $q.defer();
                console.log(defer);
                dataService.getData(defer);
                //this will only return when the promise
                //has been resolved. MyService is going to
                //do that for us
                return defer.promise;
            }
*/
		}).
		when('/latest/:blogPostID', {
			templateUrl: 'pages/blog.html',
			controller: 'blogPostCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/latest/:blogCategoryID/:blogPostID', {
			templateUrl: 'pages/blog.html',
			controller: 'blogPostCtrl',
            resolve: {
                "dataServiceData": function(dataService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise  with the $q service
                    return dataService.promise;
                }
            }
		}).
		when('/about', {
			templateUrl: 'pages/about.html',
			controller: 'AboutCtrl'
		}).
		when('/home', {
			templateUrl: 'pages/home.html',
			controller: 'DefaultCtrl'
		}).
		otherwise({
			templateUrl: 'pages/home.html',
			controller: 'DefaultCtrl'
//			redirectTo: '/'
		});
	}
]);

adondeApp.config(function (galleriaProvider) {
    galleriaProvider.setPath('lib/galleria/themes/classic/galleria.classic.js');

    galleriaProvider.setOptions({
                dummy: '/res/img/dummy.gif',
                _toggleInfo: true,
                showInfo: true,
                transition: 'slide',
                imageCrop: false,
                width: 800,
                height: 534,
                background: '#FFFFFF'
            });
});
