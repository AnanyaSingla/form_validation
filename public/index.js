<html>
	<head>
		<script>
			function validate()
			{
				var name=document.f1.nm;
				var mail=document.f1.mail;
				if(name=="")
				{
					alert("Name should be specified.");
				}
			}
		</script>
	</head>
	<body>
		<form id='f1' action="http://127.0.0.1:3000/myaction" method="get">
				Name: <input type='text' name='nm1' /><br>
				Email id: <input type='text' name='mail1'><br><br>
				<input type='submit' name='submit' value='submit' />			
			
		</form>
	</body>
</html>
