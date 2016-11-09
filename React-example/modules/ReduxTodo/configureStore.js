import todoAppReducer from './Reducers/todoAppReducer'
import {createStore} from 'redux'
import {loadState,saveState} from './localStorage'
import {fetchTodos} from './api/index'
const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color:gray', store.getState());
    console.log('%c action', 'color:blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color:green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
};
const configureStore = () => {
  const persistedInitialState = loadState();
  //creatStore可以接受第2个参数，这是一个对象，用来指定state的初始状态，可以部分指定，也可以全部指定
  //未指定的state属性将继续使用reducer中传入的默认值
  const store=createStore(todoAppReducer,persistedInitialState);
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }
  //每当store有变化，就持久化到localStorage里
  store.subscribe(()=>{
    saveState({
      todos: store.getState().todos
    });
  });
  return store;
};
export default configureStore;
fetchTodos('SHOW_ALL').then(todos => console.log(todos));
