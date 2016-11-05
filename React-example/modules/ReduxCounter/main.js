import React from 'react'
//Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
//createStore接受一个reduce函数来生成这个store

//Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。
//这种时点的数据集合，就叫做 State。
import {createStore} from 'redux'
//redux的设计思想：Web 应用是一个状态机，视图与状态是一一对应的。
//所有的状态，保存在一个对象里面，就是state

//Redux 规定， 一个 State 对应一个 View。
// 只要 State 相同，View 就相同。
// 你知道 State，就知道 View 是什么样，反之亦然。

//State 的变化，会导致 View 的变化。
// 但是，用户接触不到 State，只能接触到 View。
// 所以，State 的变化必须是 View 导致的。
// Action 就是 View 发出的通知，表示 State 应该要发生变化了。
// Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置

//Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。
// 这种 State 的计算过程就叫做 Reducer。
// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
const counterReducer = (state = [0], action) => {
  //假设我们有一系列的Counter，下面的方法可以增加计数器，删除计数器，为指定的计数器加1
  //这些方法都有一个特点，不会修改原来的计数器列表，而是返回一个全新的
  //这符合redux的原则
  const addCounter = (list) => {
    return [...list,0];
  };
  const removeCounter = (list,index) => {
    return [
      ...list.slice(0,index),
      ...list.slice(index + 1)
    ];
  };
  const add = (list,index) => {
    return [
      ...list.slice(0,index),
      list[index] + 1,
      ...list.slice(index + 1)
    ]
  };
  const sub = (list,index) => {
    return [
      ...list.slice(0,index),
      list[index] - 1,
      ...list.slice(index + 1)
    ]
  };
  switch (action.type) {
    case 'ADD':
      return add(state,action.index);
    case 'SUB':
      return sub(state,action.index);
    case 'ADD_COUNTER':
      return addCounter(state);
    case 'REMOVE_COUNTER':
      return removeCounter(state,action.index);
    default:
      return state;
  }
}

//在创建store时，把使用的reducer也传进去，reducer不手动调用，而是有dispatch方法自动调用
var store = createStore(counterReducer);
//为了了解creatStore的原理，我们自己实现一个creatStore
const myCreatStore = (reducer) => {
  let state;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    //在收到新的action时，调用reducer，传入当前状态和action
    state = reducer(state, action);
    //执行所有listener
    listeners.forEach(listener => listener());
  }
  const subscribe = (listener) => {
    listeners.push(listener);
    //返回一个方法，如果你想注销掉这个监听，就调用这个返回的方法就好
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }
  //这里自己调用一下dispatch，以便state得到reducer设置的初始状态
  dispatch({});
  return {getState,dispatch,subscribe};
}
store = myCreatStore(counterReducer);
const Counter = React.createClass({
  render() {
    var counters = [];
    store.getState().forEach((a,index) => {
      counters.push(
        <div key={index}>
          <h1>{a}</h1>
          <button onClick={this.add.bind(this,index)} >+</button>
          <button onClick={this.sub.bind(this,index)} >-</button>
          <button onClick={this.remove.bind(this,index)} >remove</button>
        </div>
      )
    })
    return (
      <div className="counter">
        {counters}
        <button onClick={this.addCounter} >add</button>
      </div>)
  },
  componentDidMount: function () {
    //使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
    store.subscribe(this.forceUpdate.bind(this));
  },
  add(index) {
    //每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
    store.dispatch({
      type:'ADD',
      index:index,
    });
  },
  sub(index) {
    store.dispatch({
      type:'SUB',
      index:index,
    });
  },
  addCounter() {
    store.dispatch({
      type:'ADD_COUNTER',
    });
  },
  remove(index) {
    store.dispatch({
      type:'REMOVE_COUNTER',
      index:index,
    });
  }
});

export default Counter;