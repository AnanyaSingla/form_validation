var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password :'123',
  database : 'Question'
});

connection.connect();
var x='a';
connection.query('insert into info1 values('+x+',"b")', function(err,fields) {
  if (!err)
    console.log('The solution is: ');
  else
    console.log('Error while performing Query.');
});

connection.end();
