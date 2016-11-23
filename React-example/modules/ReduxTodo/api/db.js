var mongoose=require('mongoose');
var Schema=mongoose.Schema;
//定义一个Schema
var TodoSchema=new Schema({
  id:{type:String},
  text:{type:String},
  completed:{type:Boolean}
});
//定义一个model
var TodoModel=mongoose.model("Todo",TodoSchema);