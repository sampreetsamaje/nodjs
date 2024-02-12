// npm init -y
// npm install mysql - creates package.json
// npm install express body-parser mysql  - installs express
//node demo3.js


var http=require('http');
var express=require('express');
var app=express();
var mysql=require('mysql');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:true});

var con =mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: ""
});
con.connect(function(err){
    if (err)  throw err;
    console.log("Database connected");
con.query("CREATE DATABASE IF NOT EXISTS feedback",function(err,result){
    if (err) throw err;
    console.log("Database is created");
con.query("USE feedback",function(err,result){
   if(err) throw err;
   console.log("Using database feedback");
var sql1 ="CREATE TABLE IF NOT EXISTS users( user_id int(5) primary key,username varchar(30),email varchar(30))";
con.query(sql1,function(err,results){
    if (err) throw err;
    console.log("Table users created");
var sql = "CREATE TABLE IF NOT EXISTS posts (post_id int(5) primary key,title varchar(20),content varchar(20), user_id int(5), foreign key (user_id) references users(user_id),created_at varchar(20),ratings int(5))";
con.query(sql,function(err,results){
    if (err) throw err;
    console.log("Table posts created");
var sql = "CREATE TABLE IF NOT EXISTS comments (comment_id int(5) primary key,post_id int(5),foreign key (post_id) references posts(post_id), user_id int(5), foreign key (user_id) references users(user_id),comment_text varchar(20),ratings int(5))";
    con.query(sql,function(err,results){
        if (err) throw err;
        console.log("Table comments created");
});
});
});
});
});
});


app.get('/',function(req,res){
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body{
                font-size: 20px;
                font-family: 'Times New Roman', Times, serif;
                margin: 10px;
            }
            h1{
                font-family: cursive;
                color:brown;
                background-color: rgb(221, 219, 219);
            }
            .forms{
                display: flex;
                /* border: 2px solid black; */
                width: 1200px;
                margin-left: 50px;
                /* align-items: center; */
            }
            .c1{
                /* border: 2px solid black; */
                width: 400px;
            }
        </style>
    </head>
    <body>
        <h1 style="text-align: center;">Feedback Application</h1>
        <div class="forms">
          <div class="c1">  
            <form action="/users/insert" method="post">
                <h2>Users</h2>
              <div>
                <label for="userid">User id:</label>
                <input type="number" name="userid" value="" id="userid">
              </div>
              <br>
              <div>
                <label for="username">Username:</label>
                <input type="text" name="username" value="" id="username">
              </div>
              <br>
               <div>
                <label for="email">Email:</label>
                <input type="email" name="email" value="" id="email">
               </div>
               <br>
                <input type="submit" value="Add User" style="font-size: 20px; ">
             
            </form>
          </div>
           <br></br>
         <div class="c1">  
           <form action="/posts/insert" method="post">
            <h2>Posts</h2>
              <div>
                <label for="ID">Post id:</label>
                <input type="number" name="ID" value="" id="ID">
              </div>
              <br>
              <div>
                <label for="title">Title:</label>
                <input type="text" name="title" value="" id="title">
              </div>
              <br>
               <div>
                <label for="content">Content of the post:</label>
                <input type="text" name="content" value="" id="content">
               </div>
               <br>
            <div>
                <label for="userid">User Id:</label>
                <input type="text" name="userid" value="" id="userid">
            </div>
            <br>
            <div>
                <label for="createdat">Created at:</label>
                <input type="date" name="createdat" value="" id="createdat">
            </div>
            <br>
            <div>
                <label for="rate">Ratings:</label>
                <input type="number" name="rate" value="" id="rate">
            </div>
            <br>
                <input type="submit" value="POST" style="font-size: 20px; ">
            
          </form>
         </div>
           
         <br>
           <form action="/comments/insert" method="post">
            <h2>Comments</h2>
              <div>
                <label for="commentid">Comment id:</label>
                <input type="number" name="commentid" value="" id="commentid">
              </div>
              <br>
              <div>
                <label for="ID">Post id:</label>
                <input type="number" name="ID" value="" id="ID">
              </div>
              <br>
            <div>
                <label for="userid">User Id:</label>
                <input type="text" name="userid" value="" id="userid">
            </div>
            <br>
            <div>
                <label for="commenttext">Comment text:</label>
                <input type="text" name="commenttext" value="" id="commenttext">
            </div>
            <br>
            <div>
                <label for="rate">Rates:</label>
                <input type="number" name="rate" value="" id="rate">
            </div>
            <br>
                <input type="submit" value="COMMENT" style="font-size: 20px; ">
            </div>
          </form>
           <br></br>
        </div>  
        <hr>
           <div>
            <form action="/posts/view" method="get">
             <h3>Click here to view latest 3 blog-posts  
             <input type="submit" value="View Posts" style="font-size: 20px; "></h3>
            </form>
         </div> 
    
             <div >
               <form action="/comments/retrieve" method="post">
                
               <div>
               <h3>Enter the post id
                
                <input type="number" name="postid" value="" id="postid" placeholder="Post id">
                </h3>
              </div>
              
                <input type="submit" value="Positive comments" style="font-size: 20px; ">
               </form>
            </div>
            <br>
            
            <div>
               <form action="/comments/delete" method="post">
                
               <div>
               <h3>Enter the comment id to delete the comment
                
                <input type="number" name="commentid" value="" id="commentid" placeholder="Comment id">
                </h3>
               </div>
              
                <input type="submit" value="DELETE Comment" style="font-size: 20px; ">
               </form>
            </div>
            <div>
            <form action="/posts/delete" method="post">
             
            <div>
            <h3>Enter the post id to delete the post
             
             <input type="number" name="postid" value="" id="posttid" placeholder="Post id">
             </h3>
            </div>
           
             <input type="submit" value="DELETE Post" style="font-size: 20px; ">
            </form>
         </div>
        
    </body>
    </html>
    `)   
});

app.post('/users/insert',urlencodedParser,function(req,res){
    console.log(req.body);
    const {userid,username,email} =req.body;
    var sql1=`INSERT INTO users VALUES('${userid}','${username}','${email}')`;
    con.query(sql1, function (err, result) {
        if (err) throw err;
        res.write("User inserted");
        res.end();
    });
});

app.post('/posts/insert',urlencodedParser,function(req,res){
    console.log(req.body);
    const {ID,title,content,userid,createdat,rate} =req.body;
    var sql1=`INSERT INTO posts VALUES('${ID}','${title}','${content}','${userid}','${createdat}','${rate}')`;
    con.query(sql1, function (err, result) {
        if (err) throw err;
        res.write("Post inserted");
        res.end();
    });
});

app.post('/comments/insert',urlencodedParser,function(req,res){
    console.log(req.body);
    const {commentid,ID,userid,commenttext,rate} =req.body;
    var sql1=`INSERT INTO comments VALUES('${commentid}','${ID}','${userid}','${commenttext}','${rate}')`;
    con.query(sql1, function (err, result) {
        if (err) throw err;
        res.write("Comment inserted");
        res.end();
    });
});

app.get('/posts/view',function(req,res){
    var sql2=`SELECT users.username,posts.user_id,posts.post_id,posts.title,posts.created_at,posts.ratings FROM posts,users where posts.user_id=users.user_id order by created_at DESC LIMIT 3`;
    con.query(sql2,(err,result) => {
        if(err) throw err;
        res.json(result);
    });
});

app.post('/comments/retrieve',urlencodedParser,function(req,res){
    console.log(req.body);
    const {postid} =req.body;
    var sql3="SELECT users.username,comments.user_id,comments.post_id,comments.comment_id,comments.comment_text FROM users,comments,posts where comments.user_id=users.user_id and comments.post_id=posts.post_id and comments.post_id='${postid}' and comments.ratings>3";
    con.query(sql3,(err,result) => {
        if(err) throw err;
        res.json(result);
    });
});

app.post('/comments/delete',urlencodedParser,function(req,res){
    console.log(req.body);
    const {commentid} =req.body;
    var sql4=`DELETE FROM comments where comment_id='${commentid}'`;
    con.query(sql4,(err,result) => {
        if(err) throw err;
        res.write('Comment Deleted');
        res.end();
    });
});

app.post('/posts/delete',urlencodedParser,function(req,res){
    console.log(req.body);
    const {postid} =req.body;
    var sql4=`DELETE FROM posts where post_id='${postid}'`;
    con.query(sql4,(err,result) => {
        if(err) throw err;
        res.write('Post Deleted');
        res.end();
    });
});

app.listen(4001,function(){
    console.log("Server is running on port 4001");
});
