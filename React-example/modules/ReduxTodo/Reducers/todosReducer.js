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