var express = require('express');
var validation=require('validator');
var app = express();
app.use(express.static('public'));

app.get('/index1.html', function(req, res) {

    res.sendFile(__dirname+"/"+'index1.html');
})
app.get('/myaction',function(req,res){
	var fs=require('fs');
	var html="Name:"+req.query.nm+"   Email id:"+req.query.mail+"\n" ;
	response={name:req.query.nm,email:req.query.mail};
	console.log(response);
	var str=req.query.mail;
	if(!validation.isEmail(str))
	{
		response="Email id is not valid.";
	}

	else if (req.query.nm.trim()=="")
	{
		response="Name is blank";
	}
	else
	{
		
		fs.appendFile('file2.txt',html,function(err,data)
		{
			if(err)
			{
				console.log('error');
			}	
			console.log(data);
		});
		response="Form submitted";
	}

	res.end(response);
});
app.listen(3000);
