var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

//由于 Store 需要在变动后向 View 发送"change"事件，因此它必须实现事件接口
//ListStore继承了EventEmitter.prototype
// 因此就能使用ListStore.on()和ListStore.emit()，来监听和触发事件了

var ListStore = assign({}, EventEmitter.prototype, {
  //ListStore.items用来保存条目
  items: [],
  // ListStore.getAll()用来读取所有条目
  getAll: function () {
    return this.items;
  },

  //Store 更新后（this.addNewItemHandler()）发出事件（this.emitChange()），表明状态已经改变。
  // View 监听到这个事件，就可以查询新的状态，更新页面了。
  addNewItemHandler: function (text) {
    this.items.push(text);
    this.emit('change');
  },

  // ListStore.emitChange()用来发出一个"change"事件
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});
module.exports = ListStore;