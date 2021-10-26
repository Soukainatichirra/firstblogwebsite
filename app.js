
const posts = [];
const titles = [];
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash  = require("lodash");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});


const homeStartingContent=  "Hey, this is Soukaina.. You can call me Souky !! And this a website I made for ... myself of course !! But , hey wait !! for you as well.so yeah, make sure you enjoy it and specially make this dairy your dairy.xoxo";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const aboutContent="Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fus";
const app = express();
const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema );
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.render("home",{homeStartingContent:homeStartingContent,posts:posts});
});
app.get("/about",function(req,res){
  res.render("about",{aboutContent: aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{contactContent: contactContent});
});
app.get("/home",function(req,res){
  res.render("home",{homeStartingContent: homeStartingContent, posts:posts,kebabTitle: lodash.kebabCase(post.title)});

});

app.get("/compose",function(req,res){

  res.render("compose");
  res.render("compose",{posts:posts});
});
app.get("/posts/:topic",function(req,res){

  posts.forEach(function(post){
    if(req.params.topic == lodash.kebabCase(post.title)){
      res.render("post", {title: post.title, content: post.content,kebabTitle: lodash.kebabCase(post.title)});
    }
  })});


app.post("/",function(req,res){
  const post = new Post({
    title : req.body.postTitle ,
    content : req.body.postBody
  });
  post.save()

  posts.push(post);

  titles.push(lodash.kebabCase(post.title));


res.render("home",{homeStartingContent:homeStartingContent, posts:posts,kebabTitle: lodash.kebabCase(post.title)});

});







app.listen(3000|| process.env.POST, function() {
  console.log("Server started on port 3000");
});
