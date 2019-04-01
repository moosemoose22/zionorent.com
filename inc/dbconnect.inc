<?	$mysqli = new mysqli("65.99.201.69:3306", "zionore_dba1", "zIONSITE22", "zionore_adondefoto");

	if ($mysqli->connect_errno)
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;

	//session_start();
?>
