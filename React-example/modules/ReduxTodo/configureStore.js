import todoAppReducer from './Reducers/todoAppReducer'
import {createStore} from 'redux'
import {loadState,saveState} from './localStorage'
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
// 使dispatch可以处理promise类型的action
// 这类action在完成后可以在then方法中取到带着异步取来的数据的普通action
// 将这个普通的action传给原生的dispatch
const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function')
      return action.then(rawDispatch);
    return rawDispatch(action);
  }
}
const configureStore = () => {
  const persistedInitialState = loadState();
  //creatStore可以接受第2个参数，这是一个对象，用来指定state的初始状态，可以部分指定，也可以全部指定
  //未指定的state属性将继续使用reducer中传入的默认值
  const store=createStore(todoAppReducer,persistedInitialState);
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }
  //在addLoggingToDispatch后再把这个修改过的dispatch包装一下，使其可以处理Promise类型的Action
  //这样的处理顺序是很重要的
  //这样的顺序可以保证在addPromiseSupportToDispatch中的promise完成后再调用addLoggingToDispatch
  //如果反过来，在Promise完成前就会输出log，而这时打出来的action是一个Promise对象，我们并不想要
  store.dispatch = addPromiseSupportToDispatch(store);
  //每当store有变化，就持久化到localStorage里
  store.subscribe(()=>{
    saveState({
      todos: store.getState().todos
    });
  });
  return store;
};
export default configureStore;
