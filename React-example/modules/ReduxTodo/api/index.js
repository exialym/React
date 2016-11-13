import {v4} from 'node-uuid';
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
  delay(5000).then(() => {
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