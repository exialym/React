//todosReducer
import todoReducer from './todoReducer';
const todosReducer = (state = [],action) => {
  switch (action.type) {
    case 'ADD_TODO':
      //console.log(state);
      return [
        ...state,
        todoReducer(null, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => todoReducer(todo,action));
    default:
      return state;
  }
};
export default todosReducer;
//这种函数通常被成为选择器，它们从state中筛选出我们要的
export const getVisibleTodos = (state,filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return state;
    case 'SHOW_ACTIVE':
      return state.filter(t=>!t.completed);
    case 'SHOW_COMPLETED':
      return state.filter(t=>t.completed);
    default:
      return todos;
  }
};