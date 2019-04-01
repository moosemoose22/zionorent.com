<?
	if ($_SERVER['HTTP_HOST'] == 'localhost')
		$URLPrefix = "/realsite";
	else
		$URLPrefix = "";		
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" /> 
<title>Zion Orent Photography Now</title>
<link type="text/css" rel="stylesheet" href="../inc/styles.css" />
<script src="http://code.jquery.com/jquery-2.1.4.js"></script>
<script src="<?=$URLPrefix?>/lib/galleria/galleria-1.4.2.min.js"></script>
<script>
	function onload()
	{
		var links = [
			['travel', 'Travel'],
			['digidarkroom', 'Digital Darkroom'],
			['vj', 'Visual Journalism'],
			['darkroom', 'Darkrooms'],
			['photobook', 'Photo Books'],
			['latest', 'Latest'],
			['about', 'About']
		];
		var linksHTML = "<div><a href='<?=$URLPrefix?>/'>Home</a></div>";
		for (var x = 0; x < links.length; x++)
			linksHTML += "<div><a href='<?=$URLPrefix?>/pages/" + links[x][0] + ".php'>" + links[x][1] + "</a></div>";
		$("#links").html(linksHTML);
	}
</script>
<style>
    .galleria{ width: 800px; height: 534px; background: #FFF }
</style>
</head>
<body onload="onload()">
<div id="mainFrame">
<div id="links"></div>
<div style="width: 100%">