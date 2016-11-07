//todoReducer
const todoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id:action.id,
        text:action.text,
        completed:false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id){
        return state;
      } else {
        //对象的immutation，使用assign或...来返回新的对象
        return Object.assign({},state,{
          completed: !state.completed,
        });
        // return {
        //   ...state,
        //   completed:!state.completed,
        // }
      }
    default:
      return state;
  }
};
export default todoReducer;