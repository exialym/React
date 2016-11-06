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
//在这里创建store，在后面每个组件中使用这个store现在看来是可行的，但是其实并不是这样的
// 如果这个页面是在服务器渲染的，我们希望每一个请求有一个store因为每一个请求的数据是不一样的
//const store = createStore(todoApp);
var todoID = 0;
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
  componentDidMount: function () {
    const {store} = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
  render() {
    const props = this.props;
    const {store} = props;
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
const Footer = ({store}) => (
  <p>
    Show:{'  '}
    <FilterLink filter="SHOW_ALL" store={store}>All</FilterLink>{'  '}
    <FilterLink filter="SHOW_ACTIVE" store={store}>Active</FilterLink>{'  '}
    <FilterLink filter="SHOW_COMPLETED" store={store}>Completed</FilterLink>
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
const VisibleTodoList = React.createClass({

  componentDidMount: function () {
    const {store} = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
  render() {
    const props = this.props;
    const {store} = props;
    const state = store.getState();
    return (
      <TodoList
        todos={getVisibleTodos(state.todos,state.visibilityFilter)}
        onTodoClick={id=> {
          store.dispatch({
            type:'TOGGLE_TODO',
            id:id,
          })
        }}
      />
    );
  }
});
//add todo子组件
const AddTodo = ({store}) => {
  let input;
  return (
    <div>
      <input ref={node => {input = node}}/>
      <button onClick={()=>{
        if (input.value!=='') {
          store.dispatch({
            type:'ADD_TODO',
            text:input.value,
            id: ++todoID,
          });
        }
        input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  )
};
//TodoList组件
var TodoApp = React.createClass({
  render() {
    const store=createStore(todoApp);
    return (
      <div className="reduxTodo">
        <AddTodo store={store}/>
        <VisibleTodoList store={store}/>
        <Footer store={store}/>
      </div>
    )
  }
});

export default TodoApp