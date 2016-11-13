//todosReducer
import {combineReducers} from 'redux'
import todoReducer from './todoReducer';
//这里的reducer曾经使用一个数组来保存所有的todo，这现在来看没问题
//但是当数据多起来的时候，很有可能会有多个数组存着同一个todo
//这时我们需要使用一个类似数据库的结构来保存所有的todo，而这些数组只存这些todo的id
//这样利于同步和管理
//byId中存着所有的todo
const byId = (state = {},action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = {...state};
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        [action.response.id]: action.response,
      };
    case 'TOGGLE_TODO':
      nextState[action.id] = todoReducer(nextState[action.id],action);
      return nextState;
    default:
      return state;
  }
};
const crestIdListWithFilter = (filter) => {
  const ids =  (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.filter === filter ?
          action.response.map(todo => todo.id) :
          state;
      case 'ADD_TODO_SUCCESS':
        return filter !== 'SHOW_COMPLETED' ?
          [...state, action.response.id] :
          state;
      default:
        return state;
    }
  };
  const isFetching = (state = false, action) => {
    if (action.filter !== filter)
      return state;
    switch (action.type) {
      case 'REQUEST_TODOS':
        return true;
      case 'FAIL_REQUEST_TODOS':
      case 'RECEIVE_TODOS':
        return false;
      default :
        return state;
    }
  };
  const errorMessage = (state = null, action) => {
    if (action.filter !== filter)
      return state;
    switch (action.type) {
      case 'REQUEST_TODOS':
      case 'RECEIVE_TODOS':
        return null;
      case 'FAIL_REQUEST_TODOS':
        return action.message;
      default :
        return state;
    }
  };
  return combineReducers({
    ids,
    errorMessage,
    isFetching,
  });
}


const listByFilter = combineReducers({
  //这里存着所有的todo的id
  SHOW_ALL:crestIdListWithFilter('SHOW_ALL'),
  //这里存着所有未完成的todo的id
  SHOW_ACTIVE:crestIdListWithFilter('SHOW_ACTIVE'),
  //这里存着所有已完成的todo的id
  SHOW_COMPLETED:crestIdListWithFilter('SHOW_COMPLETED'),
});
const todosReducer = combineReducers({
  byId,
  listByFilter,
});
export default todosReducer;


//这种函数通常被成为选择器，它们从state中筛选出我们要的
//这里的state对应的是todosReducer的state，有byid和allid属性
export const getVisibleTodos = (state,filter) => {
  const ids = state.listByFilter[filter].ids;
  return ids.map(id => state.byId[id]);
};
export const getIsFetching = (state,filter) => {
  return state.listByFilter[filter].isFetching;
};
export const getErrorMessage = (state,filter) => {
  return state.listByFilter[filter].errorMessage;
};