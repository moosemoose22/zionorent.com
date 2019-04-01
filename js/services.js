adondeApp.service('dataService', ['$http', '$log', function($http, $log) {
    var myData;
    var promise = $http.get("pages/blogdata.php").then(function(returnData)
    {
        // Take all blog posts and sort them by whether they have a parent
        // If not, they should appear on the front page
        // Otherwise, they should appear on a sub page
        var blogData = returnData.data.blogposts;
        returnData.data["sortedBlogs"] = {};
        var sortedBlogData = returnData.data.sortedBlogs;
        sortedBlogData["root"] = [];
        for (var index = 0, dataLen = blogData.length; index < dataLen; index++)
        {
            if (blogData[index].parent_id)
            {
                var key = blogData[index].url;
                if (!(key in sortedBlogData))
                    sortedBlogData[key] = [];
                sortedBlogData[key].push(blogData[index]);
            }
            else
                sortedBlogData.root.push(blogData[index]);
        }

        myData = returnData;
        console.log(myData);
    }).catch(function(error) {
        console.log(error);
    });
    return {
      promise:promise,
      getData: function () {
          return myData;//.getSomeData();
      }
    };
}]);
