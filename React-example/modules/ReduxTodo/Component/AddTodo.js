import React ,{Component}from 'react'
import {v4} from 'node-uuid'
//使用Action Creater，一个应用的action是固定的，使用creater来产生各个实际的action会标准且方便
const addTodo = (text) => ({
  type:'ADD_TODO',
  text:text,
  //使用这个方法产生唯一ID
  id: v4(),
});
//add todo子组件，这里的第二个参数就是环境变量
const AddTodo = (props,{store}) => {
  let input;
  return (
    <div>
      <input ref={node => {input = node}}/>
      <button onClick={()=>{
        if (input.value!=='') {
          store.dispatch(addTodo(input.value));
        }
        input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  )
};
//每个使用环境变量的组件也要指明环境变量的种类
AddTodo.contextTypes = {
  store: React.PropTypes.object
};
export default AddTodo;