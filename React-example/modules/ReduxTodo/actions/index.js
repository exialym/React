import * as api from '../api'
import {getIsFetching} from '../Reducers/todoAppReducer'
import { normalize } from 'normalizr'
import * as schema from './schema'

//使用Action Creater，一个应用的action是固定的，使用creater来产生各个实际的action会标准且方便
export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response => {
    //console.log('normalized response',normalize(response,schema.todo));
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response,
    });
  });

export const setFilter = (filter) => ({
  type:'SET_FILTER',
  filter,
});

export const toggleTodo = (id) => (dispatch) =>
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response,
    });
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

const failRequestTodos = (filter,message) => ({
  type:'FAIL_REQUEST_TODOS',
  message,
  filter,
});
//一个异步的Action Creater，这个Action Creater返回一个Promise对象
//普通的dispatch函数并不能处理这个对象，需要对store的dispatch函数进行包装
export const fetchTodos = (filter) => (dispatch,getState) => {
  if (getIsFetching(getState(),filter)) {
    return Promise.resolve();
  }
  dispatch(requestTodos(filter));
  return api.fetchTodos(filter).then(
    response => {
      //console.log('normalized response',normalize(response,schema.arrayOfTodos));
      dispatch(receiveTodos(filter,response));
    },
    error => {
      dispatch(failRequestTodos(filter, error.message || 'Something bad happened'))
    }
  );
};


