var AppDispatcher = require('./AppDispatcher');
//每个Action都是一个对象，包含一个actionType属性（说明动作的类型）和一些其他属性（用来传递数据）
var ButtonActions = {
  addNewItem: function (data) {
    //ButtonActions.addNewItem方法使用AppDispatcher，把动作ADD_NEW_ITEM派发到Store
    AppDispatcher.dispatch({
      actionType: 'ADD_NEW_ITEM',
      data: data,
    });
  },
};
module.exports = ButtonActions;