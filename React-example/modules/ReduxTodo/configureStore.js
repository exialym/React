import todoAppReducer from './Reducers/todoAppReducer'
import {createStore} from 'redux'
import {loadState,saveState} from './localStorage'
const configureStore = () => {
  const persistedInitialState = loadState();
  //creatStore可以接受第2个参数，这是一个对象，用来指定state的初始状态，可以部分指定，也可以全部指定
  //未指定的state属性将继续使用reducer中传入的默认值
  const store=createStore(todoAppReducer,persistedInitialState);
  store.subscribe(()=>{
    saveState({
      todos: store.getState().todos
    });
  });
  return store;
};
export default configureStore;
