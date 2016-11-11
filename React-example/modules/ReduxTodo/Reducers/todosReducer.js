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
    default:
      return state;
  }
};
//这里存着所有的todo的id
const allIds = (state = [], action) => {
  if (action.filter !== 'SHOW_ALL')
    return state;
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
//这里存着所有未完成的todo的id
const activeIds = (state = [], action) => {
  if (action.filter !== 'SHOW_ACTIVE')
    return state;
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
//这里存着所有已完成的todo的id
const completedIds = (state = [], action) => {
  if (action.filter !== 'SHOW_COMPLETED')
    return state;
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
const idsByFilter = combineReducers({
  SHOW_ALL:allIds,
  SHOW_ACTIVE:activeIds,
  SHOW_COMPLETED:completedIds,
});
const todosReducer = combineReducers({
  byId,
  idsByFilter,
});
export default todosReducer;

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]);

//这种函数通常被成为选择器，它们从state中筛选出我们要的
//这里的state对应的是todosReducer的state，有byid和allid属性
export const getVisibleTodos = (state,filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
};