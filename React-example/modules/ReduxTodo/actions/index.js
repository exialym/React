import {v4} from 'node-uuid'

//使用Action Creater，一个应用的action是固定的，使用creater来产生各个实际的action会标准且方便
export const addTodo = (text) => ({
  type:'ADD_TODO',
  text,
  //使用这个方法产生唯一ID
  id: v4(),
});

export const setFilter = (filter) => ({
  type:'SET_FILTER',
  filter,
});

export const toggleTodo = (id) => ({
  type:'TOGGLE_TODO',
  id,
});

export const receiveTodos = (filter, response) => ({
  type:'RECEIVE_TODOS',
  filter,
  response
});