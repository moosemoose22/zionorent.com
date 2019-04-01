<?
	include("../inc/dbconnect.inc");
/*
	CREATE TEMPORARY TABLE blogPostTags
	SELECT blog_post_url, GROUP_CONCAT( tagname ) as tags
	FROM  `blog_post_tags`
	GROUP BY blog_post_url;

*/

$query = "DROP TEMPORARY TABLE IF EXISTS blogPostTags";

	$tempTagsDeleteQuery = $mysqli->query($query);

$query = <<<EOD
	CREATE TEMPORARY TABLE blogPostTags
	SELECT blog_post_url, GROUP_CONCAT( tagname ) as tags
	FROM  `blog_post_tags`
	GROUP BY blog_post_url;
EOD;

	$tempTagsQuery = $mysqli->query($query);

$query = <<<EOD
	SELECT blog_posts.* , people.first_name, people.last_name, blogPostTags.tags
	FROM  `blog_posts`
	INNER JOIN people ON blog_posts.author_id = people.id
	LEFT OUTER JOIN blogPostTags ON blog_posts.url = blogPostTags.blog_post_url
	ORDER BY date_posted DESC
EOD;

	$blogquery = $mysqli->query($query);

	$blogpostArray = array();
	while ($row = $blogquery->fetch_assoc())
	{
		$blogPostData = array();
		$blogPostData['id'] = $row['id'];
		$blogPostData['url'] = $row['url'];
		$blogPostData['title'] = $row['title'];
		$blogPostData['subTitle'] = $row['subTitle'];
		$blogPostData['titlePhoto'] = str_replace("%srcURL%", "images/blog/" . $row['url'], $row['titlePhoto']);
		$blogPostData['titlePhotoMedium'] = str_replace("%srcURL%", "images/blog/" . $row['url'], $row['titlePhotoMedium']);
		//$blogPostData['titlePhoto'] = str_replace("%srcURL%", "images/" . $row['url'], $row['titlePhoto']);
		$blogPostData['post'] = str_replace("%srcURL%", "images/blog/" . $row['url'], $row['post']);
		$blogPostData['date_posted'] = $row['date_posted'];
		$blogPostData['first_name'] = $row['first_name'];
		$blogPostData['last_name'] = $row['last_name'];
		$blogPostData['parent_id'] = $row['blog_post_parent_id'];
		$blogPostData['has_children'] = $row['has_children'];
		$blogPostData['visible'] = $row['visible'];
		$blogPostData['tags'] = $row['tags'];
		array_push($blogpostArray, $blogPostData);
	}
	$websiteData = array("blogposts" => $blogpostArray);

$query = <<<EOD
	SELECT *
	FROM  `photobooks`
	ORDER BY order_by_value ASC
EOD;

	$photobookquery = $mysqli->query($query);

	$photobookArray = array();
	while ($row = $photobookquery->fetch_assoc())
	{
		$photobookData = array();
		$photobookData['id'] = $row['id'];
		$photobookData['url'] = $row['url'];
		$photobookData['title'] = $row['title'];
		$photobookData['titlePhoto'] = $row['titlePhoto'];
		$photobookData['description'] = $row['description'];
		$photobookData['book_url'] = $row['book_url'];
		array_push($photobookArray, $photobookData);
	}
	$websiteData["photobooks"] = $photobookArray;

$query = <<<EOD
	SELECT photoAlbumPhotos.*, photoAlbumCategories.id as url
	FROM  `photoAlbumPhotos`
	INNER JOIN photoAlbumCategories
	ON photoAlbumPhotos.category_id = photoAlbumCategories.id
	ORDER BY photoAlbumPhotos.category_id, photoAlbumPhotos.sort_order ASC
EOD;

	$photosquery = $mysqli->query($query);

	$photosObject = array();
	while ($row = $photosquery->fetch_assoc())
	{
		if (!(array_key_exists($row['category_id'], $photosObject)))
			$photosObject[$row['category_id']] = array();
		$photosCategoryArray = $photosObject[$row['category_id']];
		$photoData = array();
		//$photoData['image'] = $row['file_url_large'];
		$photoData['image'] = str_replace("%srcURL%", "images/blog/" . $row['url'], $row['file_url_large']);
		//$photoData['thumb'] = $row['file_url_small'];
		$photoData['thumb'] = str_replace("%srcURL%", "images/blog/" . $row['url'], $row['file_url_small']);
		$photoData['title'] = $row['title'];
		$photoData['description'] = $row['description'];
		array_push($photosObject[$row['category_id']], $photoData);
	}

	$websiteData["photoalbums"] = $photosObject;

$query = <<<EOD
	SELECT tagname
	FROM tags
	WHERE tagname
	IN (
		SELECT tagname
		FROM blog_post_tags
	)
EOD;

	$tagsquery = $mysqli->query($query);

	$tagsArray = array();
	while ($row = $tagsquery->fetch_assoc())
	{
		array_push($tagsArray, $row['tagname']);
	}

	$websiteData["tags"] = $tagsArray;


	include("../inc/dbclose.inc");
	echo json_encode($websiteData);
?>
