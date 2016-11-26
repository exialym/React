import express from 'express'
var router=express.Router();
import path from 'path'
import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routers'
import mongoose from 'mongoose'

var app = express()
//导入定义的模型
global.dbHandle=require('./modules/ReduxTodo/api/db');
//连接数据库，默认端口号是27017，todolist是自己的数据库名称
global.db=mongoose.connect('mongodb://localhost:27017/todolist');
var todo=mongoose.model('todo');

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public'), {index: false}))

// send all requests to index.html so browserHistory in React Router works
app.get('/www/*', function (req, res) {
    // match the routes to the url
    console.log("getting");
    match({ routes: routes, location: req.url }, (err, redirect, props) => {
        // in here we can make some decisions all at once
        if (err) {
            // there was an error somewhere during route matching
            res.status(500).send(err.message)
        } else if (redirect) {
            // we haven't talked about `onEnter` hooks on routes, but before a
            // route is entered, it can redirect. Here we handle on the server.
            res.redirect(redirect.pathname + redirect.search)
        } else if (props) {
            // if we got props then we matched a route and can render
            // `RouterContext` is what the `Router` renders. `Router` keeps these
            // `props` in its state as it listens to `browserHistory`. But on the
            // server our app is stateless, so we need to use `match` to
            // get these props before rendering.
            const appHtml = renderToString(<RouterContext {...props}/>)

            // dump the HTML into a template, lots of ways to do this, but none are
            // really influenced by React Router, so we're just using a little
            // function, `renderPage`
            //console.log(renderPage(appHtml));
            res.send(renderPage(appHtml))
        } else {
            // no errors, no redirect, we just didn't match anything
            res.status(404).send('Not Found')
        }
    })
});
app.get('/db/articles',function(req,res){
    todo.find({},function(err,results){
        if(err){
            console.log('error message',err);
            return;
        }
        res.json(results);
    })
});
app.get('/db/articles/add/:text',function(req,res){
    var text = req.params.text
    //可以使用model创建一个实体
    var todoItem=new todo({
        text:text,
        completed:false
    });
    //然后保存到数据库
    todoItem.save().then((result) => {
        res.json(result);
    });
});
app.get('/db/articles/toggle/:id',function(req,res){
  var id = req.params.id;
  todo.findById(id,function(err,results){
    if(err){
      console.log('error message',err);
      return;
    }
    results.completed = !results.completed;
    var todoItem=new todo(results);
    //然后保存到数据库
    todoItem.save().then((result) => {
      res.json(result);
    });
  })

});
function renderPage(appHtml) {
    return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080
console.log("working");
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT)
})