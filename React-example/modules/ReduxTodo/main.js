import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
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
//todosReducer
const todosReducer = (state = [],action) => {
  switch (action.type) {
    case 'ADD_TODO':
      //console.log(state);
      return [
        ...state,
        todoReducer(null, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => todoReducer(todo,action));
    default:
      return state;
  }
};
//visibilityFilterReducer
const visibilityFilterReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};
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
const todoApp = myCombineReducers({
  todos: todosReducer,
  visibilityFilter:visibilityFilterReducer,
});
const store = createStore(todoApp);
var todoID = 0;
//Filter子组件
const Link = ({active,children,onClick}) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a href="#" onClick={e => {
      e.preventDefault();
      onClick();
    }}>
      {children}
    </a>
  )
};
//Filter容器，以便state参数不用从顶一直传到这里
const FilterLink = React.createClass({
  render() {
    const props = this.props;
    const state = store.getState();
    return (
      <Link
        active={
          props.filter===state.visibilityFilter
        }
        onClick={() => {
          store.dispatch({
            type:'SET_FILTER',
            filter:props.filter,
          })
        }}
      >
        {props.children}
      </Link>
    )
  },
});
//Fliters子组件
const Footer = () => (
  <p>
    Show:{'  '}
    <FilterLink filter="SHOW_ALL">All</FilterLink>{'  '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{'  '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);
//Todo项子组件
const Todo = ({onClick,completed,text})=>(
  <li onClick={onClick}
      style={{textDecoration: completed ? 'line-through' : 'none'}}>
    {text}
  </li>
);
//TodoList子组件
const TodoList = ({todos, onTodoClick}) => (
  <ol>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ol>
);
//add todo子组件
const AddTodo = ({onAddClick}) => {
  let input;
  return (
    <div>
      <input ref={node => {input = node}}/>
      <button onClick={()=>{
        onAddClick(input.value);
        input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  )
};
const getVisibleTodos = (todos,filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t=>!t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t=>t.completed);
    default:
      return todos;
  }
};
//TodoList组件
var TodoApp = React.createClass({
  render() {
    const {todos,visibilityFilter} = store.getState();
    return (
      <div className="reduxTodo">
        <AddTodo onAddClick={text => {
          if (text!=='') {
            store.dispatch({
              type:'ADD_TODO',
              text:text,
              id: ++todoID,
            });
          }
        }}/>
        <TodoList
          todos={getVisibleTodos(todos,visibilityFilter)}
          onTodoClick={id=> {
            store.dispatch({
              type:'TOGGLE_TODO',
              id:id,
            })
          }}
        />
        <Footer/>
      </div>
    )
  },
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate());
  },
});
var temp = React.createClass({
  render() {
    return <TodoApp/>;
  }
})
export default temp