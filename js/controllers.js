'use strict';

/* Controllers */

//var adondeControllers = angular.module('adondeControllers', []);

adondeApp.controller('DefaultCtrl', ['$scope', '$route', '$routeParams', '$location',
	function($scope, $route, $routeParams, $location)
	{
		$scope.location = $location.$$path;
	}
]);

adondeApp.controller('HeaderCtrl', ['$scope', '$route', '$routeParams', '$location', '$sce', 'dataService',
	function($scope, $route, $routeParams, $location, $sce, dataService)
	{
		$scope.location = $location.$$path;
		var urlArr = $scope.location.split("/");
		if (urlArr.length > 1)
			$scope.mainCategory = urlArr[1];
		else
			$scope.mainCategory = "";
		$scope.pageName = urlArr[urlArr.length - 1];
	}
]);

adondeApp.controller('mainController', ['$scope',
	function($scope)
	{
		$scope.currentdate = new Date();
	}
]);


adondeApp.controller('TravelCtrl', ['$scope', 'dataService', 'dataServiceData',
	function($scope, dataService, dataServiceData)
	{
		var dataObj = dataService.getData();
		var images = dataObj.data.photoalbums.Travel;

		$scope.images = {
			images: images,
			index : images[0]
		}
	}
]);


adondeApp.controller('WorldPeopleCtrl', ['$scope', 'dataService', 'dataServiceData',
	function($scope, dataService, dataServiceData)
	{
		var dataObj = dataService.getData();
		var images = dataObj.data.photoalbums.OurWorld;

		$scope.images = {
			images: images,
			index : images[0]
		}
	}
]);


adondeApp.controller('AnonymityCtrl', ['$scope', 'dataService', 'dataServiceData',
	function($scope, dataService, dataServiceData)
	{
		var dataObj = dataService.getData();
		var images = dataObj.data.photoalbums.Anonymity;

		$scope.images = {
			images: images,
			index : images[0]
		}
	}
]);


adondeApp.controller('PeopleNatureCtrl', ['$scope', 'dataService', 'dataServiceData',
	function($scope, dataService, dataServiceData)
	{
		var dataObj = dataService.getData();
		var images = dataObj.data.photoalbums.PeopleNature;

		$scope.images = {
			images: images,
			index : images[0]
		}
	}
]);


adondeApp.controller('BWDarkroomCtrl', ['$scope', '$route', '$routeParams', '$location', 'dataService', 'dataServiceData',
	function($scope, $route, $routeParams, $location, dataService, dataServiceData)
	{
		$scope.location = $location.$$path;

		var dataObj = dataService.getData();
		var images = dataObj.data.photoalbums.BWDarkroom;

		$scope.images = {
			images:images,
			index : images[0]
		}
	}
]);


adondeApp.controller('ColorDarkroomCtrl', ['$scope', '$location', 'dataService', 'dataServiceData',
	function($scope, $location, dataService, dataServiceData)
	{
		$scope.location = $location.$$path;

		var dataObj = dataService.getData();
		var images = dataObj.data.photoalbums.ColorDarkroom;

		$scope.images = {
			images:images,
			index : images[0]
		}
	}
]);

adondeApp.controller('DigiDarkroomCtrl', ['$scope', 'dataService', 'dataServiceData',
	function($scope, dataService, dataServiceData)
	{
		var dataObj = dataService.getData();
		var images = dataObj.data.photoalbums.DigiDarkroom;

		$scope.images = {
			images:images,
			index : images[0]
		}
	}
]);

adondeApp.controller('blogCtrl', ['$scope', '$location', '$routeParams', '$sce', 'dataService', 'dataServiceData',
	function($scope, $location, $routeParams, $sce, dataService, dataServiceData)
	{
		$scope.showBlogPost = function(blogPostObj)
		{
			if (blogPostObj.has_children == 1)
				$location.path('latest/category/' + blogPostObj.url);
			else
				$location.path('latest/' + blogPostObj.url);
		}

		var dataObj = dataService.getData();

		$scope.isCategory = (typeof $routeParams.blogCategoryID !== 'undefined');

		// This controller shows both the main blog listing page and
		// blog posts which are photo albums
		if ($scope.isCategory)
		{
			var blogCategoryImages = dataObj.data.photoalbums[$routeParams.blogCategoryID];

			$scope.blogCategoryImages = {
				images: blogCategoryImages,
				index : blogCategoryImages[0]
			}

			$scope.pageSubtitle = "";
			for (var index = 0, dataLen = dataObj.data.blogposts.length; index < dataLen; index++)
			{
				if ($routeParams.blogCategoryID === dataObj.data.blogposts[index].url)
				{
					$scope.pageTitle = dataObj.data.blogposts[index].title;
					$scope.pageSubtitle = dataObj.data.blogposts[index].subTitle;
					$scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(dataObj.data.blogposts[index].post);
					break;
				}
			}
		}
		else // This is the main blog post listing page
		{
			$scope.tags = dataObj.data.tags;
			// Unfortunately galleria forces us to put in blank values for this.
			// Otherwise we get a JS error with angular and galleria
			$scope.blogCategoryImages = {
				images: [],
				index : ""
			}
			if ($scope.sortParam)
			{
				$scope.blogpostdata = dataObj.data.sortedBlogs.root;
			}
			else
				$scope.blogpostdata = dataObj.data.sortedBlogs.root;
			$scope.tags = dataObj.data.tags;
			$scope.pageTitle = "Latest!";
			$scope.pageSubtitle = "";
		}

		//$scope.blogpostdata = dataObj.data.blogposts;
	}
]);

adondeApp.controller('BlogCntlNew', ['$scope', '$location', '$routeParams', '$sce', 'dataService', 'dataServiceData',
	function($scope, $location, $routeParams, $sce, dataService, dataServiceData)
	{
		$scope.showBlogPost = function(blogPostObj)
		{
				if (blogPostObj.has_children == 1)
						$location.path('latest/category/' + blogPostObj.url);
				else
						$location.path('latest/' + blogPostObj.url);
		}
		$scope.chosenTag = "All";

		$scope.chooseTag = function()
		{
				drawBlogPosts(dataObj);
		}

		var dataObj = dataService.getData();
		$scope.tags = dataObj.data.tags;
		if (!($scope.tags.includes("All")))
			$scope.tags.push("All");

		$scope.isCategory = (typeof $routeParams.CategoryID !== 'undefined');

		function drawBlogPosts(dataObj)
		{
			// This controller shows both the main	listing page and
			//	posts which are photo albums
			if ($scope.isCategory)
			{
					var CategoryImages = dataObj.data.photoalbums[$routeParams.CategoryID];

					$scope.CategoryImages = {
							images: CategoryImages,
							index : CategoryImages[0]
					}

					$scope.pageSubtitle = "";
					for (var index = 0, dataLen = dataObj.data.posts.length; index < dataLen; index++)
					{
							if ($routeParams.CategoryID === dataObj.data.posts[index].url)
							{
									$scope.pageTitle = dataObj.data.posts[index].title;
									$scope.pageSubtitle = dataObj.data.posts[index].subTitle;
									$scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(dataObj.data.posts[index].post);
									break;
							}
					}
			}
			else // This is the main	post listing page
			{
					// Unfortunately galleria forces us to put in blank values for this.
					// Otherwise we get a JS error with angular and galleria
					$scope.CategoryImages = {
							images: [],
							index : ""
					}
					$scope.blogpostdata = [];
					for (var x = 0, blogPostLen = dataObj.data.sortedBlogs.root.length; x < blogPostLen; x++)
					{
						if (dataObj.data.sortedBlogs.root[x].visible !== "1")
						{
							console.log(x);
							console.log(dataObj.data.sortedBlogs.root[x].title);
						}
					}
					for (var x = 0, blogPostLen = dataObj.data.sortedBlogs.root.length; x < blogPostLen; )
					{
						//console.log(dataObj.data.sortedBlogs.root[x]);
							var blogPostArr = [];
							for (let y = 0; y < 3; y++)
							{
								if (x < blogPostLen)
								{
									let postTags = dataObj.data.sortedBlogs.root[x].tags.split(",");
									let showPostWithTag =  ($scope.chosenTag === "All" || postTags.includes($scope.chosenTag, 0));
									if (showPostWithTag && dataObj.data.sortedBlogs.root[x].visible === "1")
											blogPostArr.push(dataObj.data.sortedBlogs.root[x]);
									else
										y--;
									++x;
								}
							}
							$scope.blogpostdata.push(blogPostArr);
					}
					//$scope.blogpostdata = dataObj.data.sorteds.root;
					$scope.tags = dataObj.data.tags;
					$scope.pageTitle = "Latest!";
					$scope.pageSubtitle = "";
					$scope.trustAsHtml = $sce.trustAsHtml;
			}
		}
		drawBlogPosts(dataObj);

/*
				var dataObj = dataService.getData();
				$scope.showPhotoBook = function(photoBookObj)
				{
						$location.path('photobooks/' + photoBookObj.url);
				}

				$scope.photobookdata = dataObj.data.photobooks;
				$scope.photobookDisplaydata = [];

				for (var x = 0, bookLen = dataObj.data.photobooks.length; x < bookLen; x++)
				{
						var bookArr = [];
						bookArr.push(dataObj.data.photobooks[x]);
						++x;
						if (x < bookLen)
								bookArr.push(dataObj.data.photobooks[x]);
						$scope.photobookDisplaydata.push(bookArr);
				}
				console.log($scope.photobookDisplaydata);

				$scope.trustAsHtml = $sce.trustAsHtml;
*/
	}
]);

adondeApp.controller('blogPostCtrl', ['$scope', '$routeParams', '$sce', 'dataService', 'dataServiceData',
	function($scope, $routeParams, $sce, dataService, dataServiceData)
	{
		var dataObj = dataService.getData();
		$scope.blogpostdata = dataObj.data.blogposts;
		var blogPostID = $routeParams.blogPostID;
		for (var index = 0, dataLen = $scope.blogpostdata.length; index < dataLen; index++)
		{
			// Get the appropriate data for this blog post
			if (blogPostID == $scope.blogpostdata[index].id || blogPostID == $scope.blogpostdata[index].url)
			{
				$scope.blogPostObj = $scope.blogpostdata[index];
				$scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml($scope.blogpostdata[index].post);
				break;
			}
		}
	}
]);

adondeApp.controller('photobookCntl', ['$scope', '$location', '$sce', 'dataService', 'dataServiceData',
	function($scope, $location, $sce, dataService, dataServiceData)
	{
		var dataObj = dataService.getData();
		$scope.showPhotoBook = function(photoBookObj)
		{
			$location.path('photobooks/' + photoBookObj.url);
		}

		$scope.photobookdata = dataObj.data.photobooks;
		$scope.photobookDisplaydata = [];

		for (var x = 0, bookLen = dataObj.data.photobooks.length; x < bookLen; x++)
		{
			var bookArr = [];
			bookArr.push(dataObj.data.photobooks[x]);
			++x;
			if (x < bookLen)
				bookArr.push(dataObj.data.photobooks[x]);
			$scope.photobookDisplaydata.push(bookArr);
		}

		$scope.trustAsHtml = $sce.trustAsHtml;
		/*
		for (var index = 0, dataLen = $scope.photobookdata.length; index < dataLen; index++)
		{
			$scope.photobookdata[index].title = $sce.trustAsHtml($scope.photobookdata[index].title);
		}
		*/
	}
]);

adondeApp.controller('photobookdetailCntl', ['$scope', '$routeParams', '$sce', 'dataService', 'dataServiceData',
	function($scope, $routeParams, $sce, dataService, dataServiceData)
	{
		var dataObj = dataService.getData();
		$scope.photobookdata = dataObj.data.photobooks;
		var photoBookID = $routeParams.photobookID;
		for (var index = 0, dataLen = $scope.photobookdata.length; index < dataLen; index++)
		{
			if (photoBookID == $scope.photobookdata[index].id || photoBookID == $scope.photobookdata[index].url)
			{
				$scope.photoBookObj = $scope.photobookdata[index];
				$scope.thisTitleCanBeusedInsideNgBindHtml = $sce.trustAsHtml($scope.photobookdata[index].title);
				$scope.thisDescCanBeusedInsideNgBindHtml = $sce.trustAsHtml($scope.photobookdata[index].description);
				$scope.bookURL = $scope.photobookdata[index].book_url;
				break;
			}
		}
	}
]);

adondeApp.controller('AboutCtrl', ['$scope',
	function($scope)
	{
		;
	}
]);
