//imports
const express = require('express')
const mysql = require('mysql')
var ejs = require('ejs');
const path = require('path');
const app = express()


const bodyParser = require('body-parser');
//body-parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
//create connection

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'new_db'
  })

//connect check
connection.connect((err)=>{
    if(!err)
    console.log('DB connected')
    else
    console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
})

// connection.end();


// set views
app.set('views',path.join(__dirname + '\\views\\'))
app.set('view engine', 'ejs')


//static files
app.use(express.static(`public`))
app.use('/css', express.static(__dirname + `public/css`))
app.use('/js', express.static(__dirname + `public/js`))


app.get('/', function(req, res){
    res.render('index')
});
// 
//     res.render('/details.ejs', {obj: data})
// })
// app.get('/', (req, res) =>{
//     res.render('/table.ejs')
// })

//form data

app.post('/details', function(req, res){
    console.log(req.body)
    var sql = "insert into student_info (`name`, `email`, `mobile`, `subject`  ) VALUES ( '"+ req.body.name +"', '"+ req.body.email +"', "+ req.body.mobile +", '"+ req.body.subject +"')"
    connection.query(sql, function (err, res, fields) {
        // console.log('The solution is: ', rows[0].solution)
        if (err) throw err;
        // res.send(sql)
        // const newLocal = res.redirect('index');
        // res.send(sql);
    });
    
})

// user id
// function setUser(req, res, next){
//     const studentId = req.body.studentId
//     if(studentId){
//         req.user = users.find(user => user.id === studentId)
//     }
//     next()
// }

// geeting data from database
app.get('/details', function(req, res){

    connection.query("SELECT * FROM new_db.student_info", function(err, rows, fields){

        app.get('/:id', function(req, res) {
            res.send('id: ' + req.params.id);
        });

        if(!err){
            console.log(rows)
            res.render('index', {data: rows, id: req.params.id})


            // res.end(JSON.stringify(results))
            // res.render('\table',  {data : rows})
            // res.render('/index')
        }
            
        else
        console.log(err)
    })
})

//edit data bye id
app.get('/details/:id', function(req, res, next) {
    var id= +req.params.id;
    // var name = req.params.id;
    // var id= +req.params.id;
    // var id= +req.params.id;

    var sql="SELECT * FROM new_db.student_info WHERE ID=" +id;
    console.log(id, sql);


    connection.query(sql, [Id], function (error, rows, fields) {
      if (error) throw err;
      res.render('/details');
      res.redirect(303,'/details');
    });


});

// app.post('/details/edit/:id', function(req, res, next) {
//     var Id= req.params.id;
//     var updateData=req.body;

// });


app.post('/details/:id', function(req, res, next){
    // lookup the data
    console.log(id, req.body);
    var id = +req.params.id;
    var sql=   `UPDATE new_db.student_info SET name=${req.body.name}, email=${req.body.email}, mobile=${req.body.mobile}, subject=${req.body.subject} WHERE ID=${id}`;


    connection.query(sql, function (error, rows, fields) {
      if (error) throw error;
      res.render('/details');
      res.redirect(303,'/details');
      res.send(data);
    });


    // let data = data.find(c => id === parseInt(req.params.id)); 
    //validate
    //update data
    //return the updated data
    // app.get('/:id', function(req, res) {
    //     res.send('id: ' + req.params.id);
    // });

    // var postData = req.body
    // connection.query('UPDATE `new_db.student_info` SET `name`=?,`email`=?,`mobile`=?,`subject`=? where `id`=?', [req.body.name,req.body.email, req.body.mobile,req.body.subject, req.body.id], function (error, results, fields) {
    //     if (res.error){
    //         throw error;
    //         return;
    //     } 
        
    //     res.send(data);
    //   });
  });
   
  //rest api to delete record from mysql database
  app.delete('/details/:id', function (req, res, next) {
      var Id = +req.params.id;
     
    var sql = "DELETE FROM new_db.student_info WHERE ID=" + Id;
    console.log('---->', Id, sql);
     connection.query(sql, [Id], function (error, results, fields) {
        if (error) throw error;
        res.redirect(303,'/details');
      });
     
  });
  

module.exports = app;

// app.get('/details', function(req, res) {
//     connection.execute({
//       sqlText: sqlStatement,
  
//       complete: function(err, stmt, rows) {
//           if (err) {
//             var error = 'Failed to execute statement due to the following error: ' + err.message;
//             console.error(error);
//             return res.send(error);
//           } else {
//             console.log('Number of rows: ' + rows.length);
//             console.log('Rows:');
//             return res.json({data: rows, message: 'done'});
//           }
//       },
//     });
//   });



const port = 3000
//listen on port 3000

app.listen(port, () => console.info('Listening on port ${3000}'))




