import React ,{Component}from 'react'
import Footer from './Footer'
import VisibleTodoList from './VisibleTodoList'
import AddTodo from './AddTodo'
//TodoApp组件
var TodoApp = () => (
  <div className="reduxTodo">
    <AddTodo/>
    <VisibleTodoList/>
    <Footer/>
  </div>
);
export default TodoApp;