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
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todoReducer(state[action.id], action),
      };
    default:
      return state;
  }
};
//这里存着所有的todo的id，当添加时id同时添加到这个数组中
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};
const todosReducer = combineReducers({
  byId,
  allIds,
});
export default todosReducer;

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]);

//这种函数通常被成为选择器，它们从state中筛选出我们要的
//这里的state对应的是todosReducer的state，有byid和allid属性
export const getVisibleTodos = (state,filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'SHOW_ALL':
      return allTodos;
    case 'SHOW_ACTIVE':
      return allTodos.filter(t=>!t.completed);
    case 'SHOW_COMPLETED':
      return allTodos.filter(t=>t.completed);
    default:
      return new Error(`Unknown filter:${filter}.`);
  }
};