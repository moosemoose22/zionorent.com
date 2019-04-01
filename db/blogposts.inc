<?
class BlogPost
{
	public $id;
	public $title;
	public $subTitle;
	public $titlePhoto;
	public $post;
	public $author;
	public $tags;
	public $datePosted;

	function __construct($inId, $inTitle, $inSubTitle, $inTitlePhoto, $inPost, $inAuthorId, $inDatePosted)
	{
		global $mysqli;
		$this->id = $inId;
		$this->title = $inTitle;
		$this->subTitle = $inSubTitle;
		$this->titlePhoto = $inTitlePhoto;
		$this->post = $inPost;
		$splitDate = explode("-", $inDatePosted);
		$this->datePosted = $splitDate[1] . "/" . $splitDate[2] . "/" . $splitDate[0];
		$query = $mysqli->query("SELECT first_name, last_name FROM people WHERE id = " . $inAuthorId);

		$row = $query->fetch_assoc();
		$this->author = $row["first_name"] . " " . $row["last_name"];
	
		$query = $mysqli->query("SELECT tags.* FROM blog_post_tags LEFT JOIN (tags) ON (blog_post_tags.tag_id = tags.id) WHERE blog_post_tags.blog_post_id = " . $inId);
		$postTags = "No Tags";
		$tagArray = array();
		$tagIDArray = array();
		if ($row)
		{
			while($row = $query->fetch_assoc())
			{
				array_push($tagArray, $row["name"]);
				array_push($tagIDArray, $row["id"]);
			}
		}
		if (sizeof($tagArray) > 0)
		{
			foreach ($tagArray as $tag)
			{
				if ($postTags == "No Tags")
				{
					$postTags = $tag;
				}
				else
				{
					$postTags = $postTags . ", " . $tag;
				}
			}
		}
		$this->tags = $postTags;
	}
}

function GetBlogPosts($inId=null, $inTagId =null)
{
	global $mysqli;
	if (!empty($inId))
	{
		$query = $mysqli->query("SELECT * FROM blog_posts WHERE id = " . $inId . " AND visible = 1 ORDER BY id DESC"); 
	}
	//else if (!empty($inTagId))
	//{
	//	$query = $mysqli->query("SELECT blog_posts.* FROM blog_post_tags LEFT JOIN (blog_posts) ON (blog_post_tags.postID = blog_posts.id) WHERE blog_post_tags.tagID =" . $tagID . " ORDER BY blog_posts.id DESC");
	//}
	else
	{
		$query = $mysqli->query("SELECT * FROM blog_posts WHERE visible = 1 ORDER BY id DESC");
	}

	$postArray = array();
	while ($row = $query->fetch_assoc())
	{
		$myPost = new BlogPost($row['id'], $row['title'], $row['subTitle'], $row['titlePhoto'], $row['post'], $row['author_id'], $row['date_posted']);
		array_push($postArray, $myPost);
	}
	return $postArray;
}

function InsertBlogPost($title=null, $post=null, $authorID=null)
{
	global $mysqli;
	if (!empty($title) && !empty($post) && !empty($authorID))
	{
		$mysqli->query("INSERT INTO blog_posts (title, post, author_id) VALUES ('$title', '$post', $authorID);");
	}
}
?>