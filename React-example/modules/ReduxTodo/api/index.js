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

export const fetchTodos = (filter) => {
  try {
    //express后台中需要建立'/articles'路由，来处理请求数据
    return fetch('/db/articles').then((res) => {
      var result = res.json();
      return result;
    }).then((res) => {
      switch (filter) {
        case 'SHOW_ALL':
          return res;
        case 'SHOW_ACTIVE':
          return res.filter(t=>!t.completed);
        case 'SHOW_COMPLETED':
          return res.filter(t=>t.completed);
        default:
          return new Error(`Unknown filter:${filter}.`);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
export const addTodo = (text) => {
  try {
    return fetch('/db/articles/add/' + text).then((res) => {
      return res.json();
    });
  } catch (err) {
    console.log(err);
  }
};
export const toggleTodo = (id) => {
  try {
    return fetch('/db/articles/toggle/' + id).then((res) => {
      console.log('fetch return?');
      console.log('fetch return',res.json());
      return res.json();
    });
  } catch (err) {
    console.log(err);
  }
};