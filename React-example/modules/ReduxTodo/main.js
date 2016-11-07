import React ,{Component}from 'react'
import {createStore} from 'redux'

//在这里创建store，在后面每个组件中使用这个store现在看来是可行的，但是其实并不是这样的
// 如果这个页面是在服务器渲染的，我们希望每一个请求有一个store因为每一个请求的数据是不一样的
//const store = createStore(todoApp);



import todoAppReducer from './Reducers/todoAppReducer'
import TodoApp from './Component/TodoApp'
//因为不想把store从总组件一层一层传下去
//我们使用一个容器，并把store设置为环境变量
var Provider = React.createClass({
  //设置这个context使得所有子组件都能读到这个环境变量
  getChildContext() {
    const persistedInitialState = {
      todos:[{
        id: '0',
        text: 'Welcom Back',
        completed: false,
      }]
    };
    return {
      //creatStore可以接受第2个参数，这是一个对象，用来指定state的初始状态，可以部分指定，也可以全部指定
      //未指定的state属性将继续使用reducer中传入的默认值
      store: createStore(todoAppReducer,persistedInitialState)
    }
  },
  render() {
    return <TodoApp/>;
  }
});
//要记得设置每个环境变量的种类
Provider.childContextTypes = {
  store: React.PropTypes.object
};
//这个容器在react-redux中有现成的实现
//import Provider from 'react-redux';
export default Provider