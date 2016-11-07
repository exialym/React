//我们的state应该是一个对象，我们App中不同部分的state应该是state的不同的属性
//不同的reducer负责生成这些子state
//还有一个总的reducer，来调用这些子reducer，生成整个应用的state
//redux提供一个方法合并不相关的reducer生成总reducer
import {combineReducers} from 'redux'
//我们也可以自己实现它
const myCombineReducers = (reducers) => {
  //这应该是一个返回总reducer函数的函数
  return (state = {}, action) => {
    //遍历reducers里所有的key，这个key应该是所有子state在总state里的属性名
    //这些key的值就是该生成这个子state的reducer函数
    //我们需要将这些key的值替换为这些子reduce执行的结果
    return Object.keys(reducers).reduce((nextState,key) => {
      //所以如果来了一个action，会在每个子reducer里找一遍
      nextState[key] = reducers[key](state[key],action);
      return nextState;
    }, {});
  };
};
import todosReducer from './todosReducer'
import visibilityFilterReducer from './visibilityFilterReducer'
const todoApp = myCombineReducers({
  todos: todosReducer,
  visibilityFilter:visibilityFilterReducer,
});
export default todoApp;