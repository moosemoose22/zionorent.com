<?
	include("../inc/dbconnect.inc");
	$query_str = "CREATE TABLE blog_posts (
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		post text NOT NULL,
		author_id int,
		date_posted Date
	);";
	$mysqli->query($query_str);
	$query_str = "CREATE TABLE people (
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		first_name VARCHAR(255),
		last_name VARCHAR(255),
		url VARCHAR(255),
		email VARCHAR(255)
	);";
	$mysqli->query($query_str);
	$query_str = "CREATE TABLE tags (
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		tagname VARCHAR(255) NOT NULL
	);";
	$mysqli->query($query_str);
	$query_str = "CREATE TABLE blog_post_tags (
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		blog_post_id int,
		tag_id int
	);";
	$mysqli->query($query_str);
	include("../inc/dbclose.inc");
?>