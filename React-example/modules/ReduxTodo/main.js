

const todosReducer = (state = [],action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id:action.id,
          text:action.text,
          completed:false,
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id){
          return todo;
        } else {
          //对象的immutation，使用assign或...来返回新的对象
          return Object.assign({},todo,{
            completed: !todo.completed,
          });
          return {
            ...todo,
            completed:!todo.completed,
          }
        }
      })
    default:
      return state;
  }
};