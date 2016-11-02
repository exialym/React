var React = require('react');
//你可以看到MyButton是一个纯组件（即不含有任何状态），从而方便了测试和复用。这就是"controll view"模式的最大优点。
var MyButton = function(props) {
  var items = props.items;
  var itemHtml = items.map(function (listItem, i) {
    return <li key={i} className={listItem.flag ? "done" : "undone"}>{listItem.content}<button onClick={props.done.bind(this,i)}>Done</button></li>;
  });

  return <div className="todoList">
    <ul>{itemHtml}</ul>
    <input type="text" id="content"/>
    <button onClick={props.onClick}>New Item</button>
  </div>;
};

module.exports = MyButton;