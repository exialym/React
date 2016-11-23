import {v4} from 'node-uuid';
import fetch from 'isomorphic-fetch';
//这里模拟一个假的数据库，从这个数据库读数据时会是异步的。
const fakeDatabase = {
  todos: [{
    id:v4(),
    text:'hey',
    completed:false,
  },{
    id:v4(),
    text:'hello',
    completed:true,
  },{
    id:v4(),
    text:'ha',
    completed:false,
  }]
};
const delay = (ms) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  // new Promise.then(() => {
  //
  // });
  delay(500).then(() => {
    if (Math.random() > 0.8) {
      throw new Error('connect failed');
    }
    try {
      //express后台中需要建立'/articles'路由，来处理请求数据
      fetch('/db/articles').then((res) => {
        console.log('aaaaaa',res.json());
      });
    } catch (err) {
      console.log(err);
    }
    switch (filter) {
      case 'SHOW_ALL':
        return fakeDatabase.todos;
      case 'SHOW_ACTIVE':
        return fakeDatabase.todos.filter(t=>!t.completed);
      case 'SHOW_COMPLETED':
        return fakeDatabase.todos.filter(t=>t.completed);
      default:
        return new Error(`Unknown filter:${filter}.`);
    }
  });
export const addTodo = (text) =>
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed:false,
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });
export const toggleTodo = (id) =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id ===id);
    todo.completed = !todo.completed;
    return todo;
  });