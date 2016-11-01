var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
//Dispatcher 的作用是将 Action 派发到 Store
// 你可以把它看作一个路由器，负责在 View 和 Store 之间，建立 Action 的正确传递路线。
// 注意，Dispatcher 只能有一个，而且是全局的。
// Facebook官方的 Dispatcher 实现输出一个类，你要写一个AppDispatcher.js，生成 Dispatcher 实例。
var ListStore = require('./ListStore');
//AppDispatcher.register()方法用来登记各种Action的回调函数。
AppDispatcher.register(function (action) {
  switch(action.actionType) {
    //Dispatcher收到ADD_NEW_ITEM动作，就会执行这个回调函数，对ListStore进行操作。
    case 'ADD_NEW_ITEM':
      ListStore.addNewItemHandler(action.data);
      break;
    default:
    // no op
  }
})
//记住，Dispatcher 只用来派发 Action，不应该有其他逻辑。
module.exports = AppDispatcher;