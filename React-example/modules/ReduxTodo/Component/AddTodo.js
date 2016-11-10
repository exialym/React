import React from 'react'
import {addTodo} from '../actions'

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