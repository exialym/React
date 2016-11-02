var React = require('react');
var ButtonActions = require('./ButtonActions');
var MyButton = require('./MyButton');
var ListStore = require('./ListStore');
//"controller view"组件只用来保存状态，然后将其转发给子组件。
var MyButtonController = React.createClass({
  getInitialState: function () {
    return {
      items: ListStore.getAll()
    };
  },
  //监听store发出的事件以跟踪store的变动
  componentDidMount: function() {
    ListStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({
      items: ListStore.getAll()
    });
  },
  createNewItem: function (event) {
    ButtonActions.addNewItem({
      content:document.getElementById("content").value,
      flag:false,
    });
  },
  itemDone: function (index) {
    ButtonActions.doneItem(index);
  },

  render: function() {
    return <MyButton
      items={this.state.items}
      onClick={this.createNewItem}
      done = {this.itemDone}
    />;
  }
});

module.exports = MyButtonController;