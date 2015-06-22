var express=require('express');
var app=express();
var fs=require('fs');
app.use(express.static('public'));
app.get('/',function(req,res){
	var html="<form action='http://127.0.0.1:3000/myaction' method='post'>"+
"<input type='submit' value='Generate Quesion Paper'>"+
"</form>";
	res.send(html);
})

app.post('/myaction',function(req,res){
	var i;
	var arr1=[]; var arr2=[];
	var dur1=[];    var dur2=[];
	var mysql=require('mysql');
	var connection = mysql.createConnection({
  			host     : 'localhost',
			user     : 'root',
		  password :'123',
		  database : 'Question'
	});
	connection.connect();
	var sum=0;
	//Randomly select 7 objective questions from the srno and durations accessed from database
	connection.query('select srno,duration from ques_bank',function(err,row,fields) {
		if (!err)
		{ 
			for(var i=0;i<7;i++)
			{
				var n=Math.round(Math.random()*(69)+1);
				if(arr1.indexOf(n)==(-1)){
					arr1.push(n);
					console.log(row[n-1].duration);
					sum=parseInt(sum,10)+parseInt(row[n-1].duration,10);
					console.log('sum:'+sum);
					dur1.push(row[n-1].duration);
				}
				else
					i=i-1;
			}

		}
	  	else						
	    	console.log('Error while performing Query.'+err);
		}
	);
	//Randomly select 3 subjective questions from the srno and durations accessed from database
	connection.query('select srno,duration from ques_bank2',function(err,row,fields) {
		if (!err)
		{ 
			for(var i=0;i<3;i++)
			{
				var n=Math.round(Math.random()*(19)+1);
				if(arr2.indexOf(n)==(-1)){
					arr2.push(n);

					sum=parseInt(sum)+parseInt(row[n-1].duration);
					console.log('sum:'+sum);
					dur2.push(row[n-1].duration);
				}
				else
					i=i-1;
			}
			console.log(sum);
			//Adjust time duration
			while(sum>70||sum<50)
			{
				if(sum>70)
				{
					var max_dur=Math.max.apply(Math,dur2);
					console.log('max duration'+max_dur);
					var max_in;
					for (max_in=0;max_in<3;max_in++)
					{
						if (dur2[max_in]==max_dur)
							break;
					}
					console.log('indexOf max_dur'+max_in);
					for (var r=0;r<20;r++)
					{
						if(arr2.indexOf(r)==(-1)&&row[r].duration==5)
						{
							console.log('before'+arr2[max_in]);
							arr2[max_in]=(r+1);
							dur2[max_in]=5;
							console.log('after'+arr2[max_in]);
							break;
						}
					}
					sum=parseInt(sum,10)-max_dur+5;
				}
				else
				{
					var min_dur=Math.min.apply(Math,dur2);
					console.log('min duration'+min_dur);
					var min_in;
					for (min_in=0;min_in<3;min_in++)
					{
						if (dur2[min_in]==min_dur)
							break;
					}
					console.log('indexOf min_dur'+min_in);
					for (var r=0;r<20;r++)
					{
						if(arr2.indexOf(r)==(-1)&&row[r].duration==15)
						{
							console.log('before'+arr2[min_in]);
							arr2[min_in]=(r+1);
							dur2[min_in]=15;
							console.log('after'+arr2[min_in]);
							break;
						}
					}
					sum=parseInt(sum,10)-min_dur+15;
				}
				console.log(sum);
			}
			//save questions in a text file
			var PDF = require('pdfkit');
			var fs=require('fs');
			var ques='Total duration:'+sum+'mins'+'\n';
			doc = new PDF();                        //creating a new PDF object
			doc.pipe(fs.createWriteStream('Question_Paper1'));  //creating a write stream 

			fs.appendFile('quespaper.txt',ques,function(err,data)
			{
				if(!err)
					console.log('data saved');
				else
					console.log(err);
						
			});
			for(var i=0;i<7;i++)
			{	
				connection.query('select ques,op1,op2,op3,op4,duration from ques_bank where srno='+parseInt(arr1[i],10),function(err,rows,field)
				{
					if(!err)
					{
						var ques=rows[0].ques+'\na) '+rows[0].op1+' b) '+rows[0].op2+' c) '+rows[0].op3+' d) '+rows[0].op4+'    '+rows[0].duration+'min'+'\n\n';
						fs.appendFile('quespaper.txt',ques,function(err,data)
						{
							if(!err)
								console.log('data saved');
							else
								console.log(err);
							
						});
					}
					else
						console.log('db error:'+err);
				}
				);
			}
			var i;
			for(i=0;i<3;i++)
			{	var count=0;
				connection.query('select ques,duration from ques_bank2 where srno='+parseInt(arr2[i],10),function(err,rows,field)
				{
					if(!err)
					{
						var ques=rows[0].ques+'     '+rows[0].duration+'min'+'\n\n';
						fs.appendFile('quespaper.txt',ques,function(err,data)
						{
							if(!err)
							{
								count++;
								console.log('data saved');
								//Save text file data in pdf file
								if(count==3)
								{	
									fs.readFile('quespaper.txt',function(err,data)
									{
										if(!err)
										{	console.log(data.toString());
											doc.text(data.toString());
											doc.end();	
											var pth=__dirname+"/"+'Question_Paper1';
			//								var html="<a href="+pth+">Download Question Paper</a>";
											//res.download(pth);
											fs.readFile(pth,function(error,data){
   											 if(error){
       												res.json({'status':'error',msg:err});
    										}else{
       											res.writeHead(200, {"Content-Type": "application/pdf"});
       												res.write(data);
       															res.end();       
    											}
											});
										}	
									});

								}
							}
							else
								console.log(err);
							
						});
						
						
					}
					else
						console.log('db error:'+err);
				}
				);
			}
			
		}
	  	else						
	    	console.log('Error while performing Query.'+err);
	}
	);
	
});
app.listen(3000);
