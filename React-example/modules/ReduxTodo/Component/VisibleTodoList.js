import React ,{Component}from 'react'
import {getVisibleTodos, getIsFetching, getErrorMessage} from '../Reducers/todoAppReducer'
import {toggleTodo, fetchTodos, removeTodo} from '../actions'
import FetchError from './FetchError'
//Todo项子组件
const Todo = ({onClick,completed,text,buttonClick})=>(
  <li style={{textDecoration: completed ? 'line-through' : 'none'}}>
    <button onClick={buttonClick}>Remove</button>
    <span onClick={onClick}>{text}</span>

  </li>
);
//TodoList子组件
const TodoList = ({todos, onTodoClick,removeClick}) => (
  <ol>
    {todos.map(todo =>
      <Todo
        key={todo._id}
        {...todo}
        onClick={() => onTodoClick(todo._id)}
        buttonClick = {() => removeClick(todo._id)}
      />
    )}
  </ol>
);
//TodoList容器
/*********************************自己实现的Todolist容器*************************************/
// class VisibleTodoList extends Component {
//   componentDidMount () {
//     //读取环境变量
//     const {store} = this.context;
//     this.unsubscribe = store.subscribe(() => this.forceUpdate());
//   }
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//   render() {
//     const props = this.props;
//     const {store} = this.context;
//     const state = store.getState();
//     return (
//       <TodoList
//         todos={getVisibleTodos(state.todos,state.visibilityFilter)}
//         onTodoClick={id=> {
//           store.dispatch({
//             type:'TOGGLE_TODO',
//             id:id,
//           })
//         }}
//       />
//     );
//   }
// }
// VisibleTodoList.contextTypes = {
//   store: React.PropTypes.object
// };
/*********************************使用react-redux库的connect方法直接生成Todolist容器*************************************/
//mapStateToProps是connect函数的第一个参数，是一个函数
//它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系
//作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射
//mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
//mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。
const mapStateToProps = (state,ownProps) => ({
  todos:getVisibleTodos(state),
  isFetching:getIsFetching(state),
  errorMessage:getErrorMessage(state),
  filter:state.visibilityFilter,
});
//mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射
//也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store
//它可以是一个函数，也可以是一个对象
//如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数
//返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。
var mapDispatchToProps = (dispatch,ownProps) => ({
  removeClick(id) {
    dispatch(removeTodo(id));
  },
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
  fetchTodos(filter,todos) {
    dispatch(fetchTodos(filter,todos));
  },
});
//如果mapDispatchToProps是一个对象
//它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator
//返回的 Action 会由 Redux 自动发出
mapDispatchToProps = {
  removeClick: (id) => {
    return removeTodo(id);
  },
  onTodoClick: (id) => {
    return toggleTodo(id);
  },
  //这是一个异步的action哦
  fetchTodos,
};
// 原来直接在TodoList上使用connect生成包装组件
// VisibleTodoList = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(TodoList);
//但是我们想使用VisibleTodoList的生命周期函数，connect函数直接生成的元素没法修改，于是再添一层包装
class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData()
  }
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter)
      this.fetchData()
  }
  fetchData() {
    const {filter,fetchTodos} = this.props;
    fetchTodos(filter);
  }
  render() {
    const {isFetching,todos,errorMessage} = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    if (errorMessage)
      return (
        <FetchError message = {errorMessage} onRetry = {() => this.fetchData()}/>
      );
    return <TodoList {...this.props}/>
  }
}
import {connect} from 'react-redux'
//将上面两个函数发送给connect方法，connect方法会生成TodoList的包装组件
//就像上面被注释掉的部分
VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList);
/*********************************Todolist容器完*************************************/
export default VisibleTodoList;