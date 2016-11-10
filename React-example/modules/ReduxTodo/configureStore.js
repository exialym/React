import todoAppReducer from './Reducers/todoAppReducer'
import {createStore} from 'redux'
import {loadState,saveState} from './localStorage'
const logging = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('%c prev state', 'color:gray', store.getState());
  console.log('%c action', 'color:blue', action);
  const returnValue = next(action);
  console.log('%c next state', 'color:green', store.getState());
  console.groupEnd(action.type);
  return returnValue;
};
// 使dispatch可以处理promise类型的action
// 这类action在完成后可以在then方法中取到带着异步取来的数据的普通action
// 将这个普通的action传给原生的dispatch
const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function')
    return action.then(next);
  return next(action);
};
const warpDispatchWithMiddlewares = (store, middlewares) => {
  //由于我们中间件数组中中间件的顺序是是Action流过中间件的顺序
  //那么处理这些中间件的顺序就是反过来的
  //在logging后再把这个修改过的dispatch传给promise，使其可以处理Promise类型的Action
  //这样的顺序可以保证在promise中的promise完成后再调用logging中的代码
  //如果反过来，在Promise完成前就会输出log，而这时打出来的action是一个Promise对象，我们并不想要
  middlewares.slice().reverse().forEach(middleware =>
    store.dispatch = middleware(store)(store.dispatch)
  );
}
const configureStore = () => {
  const persistedInitialState = loadState();
  //creatStore可以接受第2个参数，这是一个对象，用来指定state的初始状态，可以部分指定，也可以全部指定
  //未指定的state属性将继续使用reducer中传入的默认值
  const store=createStore(todoAppReducer,persistedInitialState);
  //我们将两个对dispatch做处理的中间件放在一个中间件数组里
  //中间件放置的顺序将是action流过这些中间件的顺序
  //这样的情况下处理中间件数组的函数warpDispatchWithMiddlewares就要多做一些处理
  const middlewares = [promise];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logging);
  }
  warpDispatchWithMiddlewares(store, middlewares);
  //每当store有变化，就持久化到localStorage里
  store.subscribe(()=>{
    saveState({
      todos: store.getState().todos
    });
  });
  return store;
};
export default configureStore;
