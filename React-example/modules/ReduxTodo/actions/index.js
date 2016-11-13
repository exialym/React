import {v4} from 'node-uuid'
import * as api from '../api'

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

const receiveTodos = (filter, response) => ({
  type:'RECEIVE_TODOS',
  filter,
  response
});

const requestTodos = (filter) => ({
  type:'REQUEST_TODOS',
  filter,
});
//一个异步的Action Creater，这个Action Creater返回一个Promise对象
//普通的dispatch函数并不能处理这个对象，需要对store的dispatch函数进行包装
export const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));
  return api.fetchTodos(filter).then(response =>
    dispatch(receiveTodos(filter,response))
  );
};


