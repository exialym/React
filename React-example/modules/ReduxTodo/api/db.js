var mongoose=require('mongoose');
var Schema=mongoose.Schema;
//定义一个Schema
var TodoSchema=new Schema({
  text:{type:String},
  completed:{type:Boolean}
});
//定义一个model，这里model的名字变为小写并加上s就是在数据库里collection的名字
var TodoModel=mongoose.model("todo",TodoSchema);