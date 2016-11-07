import React ,{Component}from 'react'
//在这里创建store，在后面每个组件中使用这个store现在看来是可行的，但是其实并不是这样的
// 如果这个页面是在服务器渲染的，我们希望每一个请求有一个store因为每一个请求的数据是不一样的
//const store = createStore(todoApp);
import TodoApp from './Component/TodoApp'
import configureStore from './configureStore'

const store = configureStore();

//因为不想把store从总组件一层一层传下去
//我们使用一个容器，并把store设置为环境变量
//这个容器在react-redux中有现成的实现
//import Provider from 'react-redux';
var Provider = React.createClass({
  //设置这个context使得所有子组件都能读到这个环境变量
  getChildContext() {
    return {
      store: this.props.store
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

const Root = () => (
  <Provider store = {store}/>
);
export default Root