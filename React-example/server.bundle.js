/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(4);

	var _reactRouter = __webpack_require__(5);

	var _routers = __webpack_require__(6);

	var _routers2 = _interopRequireDefault(_routers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// and these to match the url to routes and then render
	var app = (0, _express2.default)();

	// serve our static stuff like index.css

	// we'll use this to render our app to an html string
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public'), { index: false }));

	// send all requests to index.html so browserHistory in React Router works
	app.get('*', function (req, res) {
	    // match the routes to the url
	    console.log("getting");
	    (0, _reactRouter.match)({ routes: _routers2.default, location: req.url }, function (err, redirect, props) {
	        // in here we can make some decisions all at once
	        if (err) {
	            // there was an error somewhere during route matching
	            res.status(500).send(err.message);
	        } else if (redirect) {
	            // we haven't talked about `onEnter` hooks on routes, but before a
	            // route is entered, it can redirect. Here we handle on the server.
	            res.redirect(redirect.pathname + redirect.search);
	        } else if (props) {
	            // if we got props then we matched a route and can render
	            // `RouterContext` is what the `Router` renders. `Router` keeps these
	            // `props` in its state as it listens to `browserHistory`. But on the
	            // server our app is stateless, so we need to use `match` to
	            // get these props before rendering.
	            var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));

	            // dump the HTML into a template, lots of ways to do this, but none are
	            // really influenced by React Router, so we're just using a little
	            // function, `renderPage`
	            //console.log(renderPage(appHtml));
	            res.send(renderPage(appHtml));
	        } else {
	            // no errors, no redirect, we just didn't match anything
	            res.status(404).send('Not Found');
	        }
	    });
	});
	function renderPage(appHtml) {
	    return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>My First React Router App</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n   ';
	}

	var PORT = process.env.PORT || 8080;
	console.log("working");
	app.listen(PORT, function () {
	    console.log('Production Express server running at localhost:' + PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _App = __webpack_require__(7);

	var _App2 = _interopRequireDefault(_App);

	var _About = __webpack_require__(10);

	var _About2 = _interopRequireDefault(_About);

	var _Repos = __webpack_require__(11);

	var _Repos2 = _interopRequireDefault(_Repos);

	var _Repo = __webpack_require__(12);

	var _Repo2 = _interopRequireDefault(_Repo);

	var _Home = __webpack_require__(9);

	var _Home2 = _interopRequireDefault(_Home);

	var _main = __webpack_require__(13);

	var _main2 = _interopRequireDefault(_main);

	var _main3 = __webpack_require__(22);

	var _main4 = _interopRequireDefault(_main3);

	var _main5 = __webpack_require__(24);

	var _main6 = _interopRequireDefault(_main5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
		_reactRouter.Route,
		{ path: '/', component: _App2.default },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/repos', component: _Repos2.default },
			_react2.default.createElement(_reactRouter.Route, { path: '/repos/:userName/:repoName', component: _Repo2.default })
		),
		_react2.default.createElement(_reactRouter.Route, { path: '/about', component: _About2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/redirect', onEnter: function onEnter(_ref, replace) {
				var path = _ref.path;
				return replace("/repos");
			} }),
		_react2.default.createElement(_reactRouter.Route, { path: '/todo', component: _main2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/counter', component: _main4.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/reduxTodo', component: _main6.default })
	);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(8);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	var _Home = __webpack_require__(9);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { id: 'main' },
	      _react2.default.createElement(
	        'header',
	        null,
	        'Lion&Rabbit\'s Blog'
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'content' },
	        _react2.default.createElement(
	          'div',
	          { className: 'nav' },
	          _react2.default.createElement(
	            'ul',
	            { role: 'nav' },
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _NavLink2.default,
	                { to: '/', onlyActiveOnIndex: true },
	                'Home'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _NavLink2.default,
	                { to: '/repos' },
	                'Blogs'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _NavLink2.default,
	                { to: '/about' },
	                'About'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _NavLink2.default,
	                { to: '/redirect' },
	                'Redirect'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _NavLink2.default,
	                { to: '/todo' },
	                'FlexTodoList'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _NavLink2.default,
	                { to: '/counter' },
	                'ReduxCounter'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _NavLink2.default,
	                { to: '/reduxTodo' },
	                'ReduxTodo'
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'middle' },
	          this.props.children
	        )
	      ),
	      _react2.default.createElement(
	        'footer',
	        null,
	        '@copyright 2016'
	      )
	    );
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
		displayName: 'NavLink',
		render: function render() {
			return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
		}
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
		displayName: 'Home',
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				'Home'
			);
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
		displayName: 'About',
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				'About'
			);
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(8);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Repos',
	  handleSubmit: function handleSubmit(event) {
	    event.preventDefault();
	    var userName = event.target.elements[0].value;
	    var repo = event.target.elements[1].value;
	    var path = '/repos/' + userName + '/' + repo;
	    console.log(path);
	    _reactRouter.browserHistory.push(path);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Repos'
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/repos/reactjs/react-router' },
	            'React Router'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/repos/facebook/react' },
	            'React'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'form',
	            { onSubmit: this.handleSubmit },
	            _react2.default.createElement('input', { type: 'text', placeholder: 'userName' }),
	            ' / ',
	            ' ',
	            _react2.default.createElement('input', { type: 'text', placeholder: 'repo' }),
	            ' ',
	            _react2.default.createElement(
	              'button',
	              { type: 'submit' },
	              'Go'
	            )
	          )
	        )
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Repo',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h3',
	        null,
	        'UserName:',
	        this.props.params.userName
	      ),
	      _react2.default.createElement(
	        'h3',
	        null,
	        'Repo:     ',
	        this.props.params.repoName
	      )
	    );
	  }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MyButtonController = __webpack_require__(14);
	exports.default = _react2.default.createClass({
	  displayName: 'main',
	  render: function render() {
	    return _react2.default.createElement(MyButtonController, null);
	  }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var ButtonActions = __webpack_require__(15);
	var MyButton = __webpack_require__(21);
	var ListStore = __webpack_require__(18);
	//"controller view"组件只用来保存状态，然后将其转发给子组件。
	var MyButtonController = React.createClass({
	  displayName: 'MyButtonController',

	  getInitialState: function getInitialState() {
	    return {
	      items: ListStore.getAll()
	    };
	  },
	  //监听store发出的事件以跟踪store的变动
	  componentDidMount: function componentDidMount() {
	    ListStore.addChangeListener(this._onChange);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    ListStore.removeChangeListener(this._onChange);
	  },

	  _onChange: function _onChange() {
	    this.setState({
	      items: ListStore.getAll()
	    });
	  },
	  createNewItem: function createNewItem(event) {
	    ButtonActions.addNewItem({
	      content: document.getElementById("content").value,
	      flag: false
	    });
	  },
	  itemDone: function itemDone(index) {
	    ButtonActions.doneItem(index);
	  },

	  render: function render() {
	    return React.createElement(MyButton, {
	      items: this.state.items,
	      onClick: this.createNewItem,
	      done: this.itemDone
	    });
	  }
	});

	module.exports = MyButtonController;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(16);
	//每个Action都是一个对象，包含一个actionType属性（说明动作的类型）和一些其他属性（用来传递数据）
	var ButtonActions = {
	  addNewItem: function addNewItem(data) {
	    //ButtonActions.addNewItem方法使用AppDispatcher，把动作ADD_NEW_ITEM派发到Store
	    AppDispatcher.dispatch({
	      actionType: 'ADD_NEW_ITEM',
	      data: data
	    });
	  },
	  doneItem: function doneItem(index) {
	    AppDispatcher.dispatch({
	      actionType: 'DONE_ITEM',
	      index: index
	    });
	  }
	};
	module.exports = ButtonActions;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Dispatcher = __webpack_require__(17).Dispatcher;
	var AppDispatcher = new Dispatcher();
	//Dispatcher 的作用是将 Action 派发到 Store
	// 你可以把它看作一个路由器，负责在 View 和 Store 之间，建立 Action 的正确传递路线。
	// 注意，Dispatcher 只能有一个，而且是全局的。
	// Facebook官方的 Dispatcher 实现输出一个类，你要写一个AppDispatcher.js，生成 Dispatcher 实例。
	var ListStore = __webpack_require__(18);
	//AppDispatcher.register()方法用来登记各种Action的回调函数。
	AppDispatcher.register(function (action) {
	  switch (action.actionType) {
	    //Dispatcher收到ADD_NEW_ITEM动作，就会执行这个回调函数，对ListStore进行操作。
	    case 'ADD_NEW_ITEM':
	      ListStore.addNewItemHandler(action.data);
	      break;
	    case 'DONE_ITEM':
	      ListStore.doneItemHandler(action.index);
	      break;
	    default:
	    // no op
	  }
	});
	//记住，Dispatcher 只用来派发 Action，不应该有其他逻辑。
	module.exports = AppDispatcher;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("flux");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EventEmitter = __webpack_require__(19).EventEmitter;
	var assign = __webpack_require__(20);

	//由于 Store 需要在变动后向 View 发送"change"事件，因此它必须实现事件接口
	//ListStore继承了EventEmitter.prototype
	// 因此就能使用ListStore.on()和ListStore.emit()，来监听和触发事件了

	var ListStore = assign({}, EventEmitter.prototype, {
	  //ListStore.items用来保存条目
	  items: [],
	  // ListStore.getAll()用来读取所有条目
	  getAll: function getAll() {
	    return this.items;
	  },

	  //Store 更新后（this.addNewItemHandler()）发出事件（this.emitChange()），表明状态已经改变。
	  // View 监听到这个事件，就可以查询新的状态，更新页面了。
	  addNewItemHandler: function addNewItemHandler(text) {
	    this.items.push(text);
	    this.emit('change');
	  },
	  doneItemHandler: function doneItemHandler(index) {
	    this.items[index].flag = true;
	    this.emit('change');
	  },
	  // ListStore.emitChange()用来发出一个"change"事件
	  emitChange: function emitChange() {
	    this.emit('change');
	  },

	  addChangeListener: function addChangeListener(callback) {
	    this.on('change', callback);
	  },

	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener('change', callback);
	  }
	});
	module.exports = ListStore;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("object-assign");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	//你可以看到MyButton是一个纯组件（即不含有任何状态），从而方便了测试和复用。这就是"controll view"模式的最大优点。
	var MyButton = function MyButton(props) {
	  var items = props.items;
	  var itemHtml = items.map(function (listItem, i) {
	    return React.createElement(
	      "li",
	      { key: i, className: listItem.flag ? "done" : "undone" },
	      React.createElement(
	        "button",
	        { onClick: function onClick() {
	            return props.done(i);
	          } },
	        "Done"
	      ),
	      listItem.content
	    );
	  });

	  return React.createElement(
	    "div",
	    { className: "todoList" },
	    React.createElement(
	      "ul",
	      null,
	      itemHtml
	    ),
	    React.createElement("input", { type: "text", id: "content" }),
	    React.createElement(
	      "button",
	      { onClick: props.onClick },
	      "New Item"
	    )
	  );
	};

	module.exports = MyButton;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	//Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
	//createStore接受一个reduce函数来生成这个store

	//Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。
	//这种时点的数据集合，就叫做 State。


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
	var counterReducer = function counterReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0];
	  var action = arguments[1];

	  //假设我们有一系列的Counter，下面的方法可以增加计数器，删除计数器，为指定的计数器加1
	  //这些方法都有一个特点，不会修改原来的计数器列表，而是返回一个全新的
	  //这符合redux的原则
	  var addCounter = function addCounter(list) {
	    return [].concat(_toConsumableArray(list), [0]);
	  };
	  var removeCounter = function removeCounter(list, index) {
	    return [].concat(_toConsumableArray(list.slice(0, index)), _toConsumableArray(list.slice(index + 1)));
	  };
	  var add = function add(list, index) {
	    return [].concat(_toConsumableArray(list.slice(0, index)), [list[index] + 1], _toConsumableArray(list.slice(index + 1)));
	  };
	  var sub = function sub(list, index) {
	    return [].concat(_toConsumableArray(list.slice(0, index)), [list[index] - 1], _toConsumableArray(list.slice(index + 1)));
	  };
	  switch (action.type) {
	    case 'ADD':
	      return add(state, action.index);
	    case 'SUB':
	      return sub(state, action.index);
	    case 'ADD_COUNTER':
	      return addCounter(state);
	    case 'REMOVE_COUNTER':
	      return removeCounter(state, action.index);
	    default:
	      return state;
	  }
	};

	//在创建store时，把使用的reducer也传进去，reducer不手动调用，而是有dispatch方法自动调用
	var store = (0, _redux.createStore)(counterReducer);
	//为了了解creatStore的原理，我们自己实现一个creatStore
	var myCreatStore = function myCreatStore(reducer) {
	  var state = void 0;
	  var listeners = [];
	  var getState = function getState() {
	    return state;
	  };
	  var dispatch = function dispatch(action) {
	    //在收到新的action时，调用reducer，传入当前状态和action
	    state = reducer(state, action);
	    //执行所有listener
	    listeners.forEach(function (listener) {
	      return listener();
	    });
	  };
	  var subscribe = function subscribe(listener) {
	    listeners.push(listener);
	    //返回一个方法，如果你想注销掉这个监听，就调用这个返回的方法就好
	    return function () {
	      listeners = listeners.filter(function (l) {
	        return l !== listener;
	      });
	    };
	  };
	  //这里自己调用一下dispatch，以便state得到reducer设置的初始状态
	  dispatch({});
	  return { getState: getState, dispatch: dispatch, subscribe: subscribe };
	};
	store = myCreatStore(counterReducer);
	var Counter = _react2.default.createClass({
	  displayName: 'Counter',
	  render: function render() {
	    var _this = this;

	    var counters = [];
	    store.getState().forEach(function (a, index) {
	      counters.push(_react2.default.createElement(
	        'div',
	        { key: index },
	        _react2.default.createElement(
	          'h1',
	          null,
	          a
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: _this.add.bind(_this, index) },
	          '+'
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: _this.sub.bind(_this, index) },
	          '-'
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: _this.remove.bind(_this, index) },
	          'remove'
	        )
	      ));
	    });
	    return _react2.default.createElement(
	      'div',
	      { className: 'counter' },
	      counters,
	      _react2.default.createElement(
	        'button',
	        { onClick: this.addCounter },
	        'add'
	      )
	    );
	  },

	  componentDidMount: function componentDidMount() {
	    //使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
	    store.subscribe(this.forceUpdate.bind(this));
	  },
	  add: function add(index) {
	    //每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
	    store.dispatch({
	      type: 'ADD',
	      index: index
	    });
	  },
	  sub: function sub(index) {
	    store.dispatch({
	      type: 'SUB',
	      index: index
	    });
	  },
	  addCounter: function addCounter() {
	    store.dispatch({
	      type: 'ADD_COUNTER'
	    });
	  },
	  remove: function remove(index) {
	    store.dispatch({
	      type: 'REMOVE_COUNTER',
	      index: index
	    });
	  }
	});

	exports.default = Counter;

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _TodoApp = __webpack_require__(25);

	var _TodoApp2 = _interopRequireDefault(_TodoApp);

	var _configureStore = __webpack_require__(35);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//在这里创建store，在后面每个组件中使用这个store现在看来是可行的，但是其实并不是这样的
	// 如果这个页面是在服务器渲染的，我们希望每一个请求有一个store因为每一个请求的数据是不一样的
	//const store = createStore(todoApp);
	var store = (0, _configureStore2.default)();

	//因为不想把store从总组件一层一层传下去
	//我们使用一个容器，并把store设置为环境变量
	//这个容器在react-redux中有现成的实现
	//import Provider from 'react-redux';
	var Provider = _react2.default.createClass({
	  displayName: 'Provider',

	  //设置这个context使得所有子组件都能读到这个环境变量
	  getChildContext: function getChildContext() {
	    return {
	      store: this.props.store
	    };
	  },
	  render: function render() {
	    return _react2.default.createElement(_TodoApp2.default, null);
	  }
	});
	//要记得设置每个环境变量的种类
	Provider.childContextTypes = {
	  store: _react2.default.PropTypes.object
	};

	var Root = function Root() {
	  return _react2.default.createElement(Provider, { store: store });
	};
	exports.default = Root;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _Footer = __webpack_require__(26);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _VisibleTodoList = __webpack_require__(27);

	var _VisibleTodoList2 = _interopRequireDefault(_VisibleTodoList);

	var _AddTodo = __webpack_require__(33);

	var _AddTodo2 = _interopRequireDefault(_AddTodo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//TodoApp组件
	var TodoApp = function TodoApp() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'reduxTodo' },
	    _react2.default.createElement(_AddTodo2.default, null),
	    _react2.default.createElement(_VisibleTodoList2.default, null),
	    _react2.default.createElement(_Footer2.default, null)
	  );
	};
	exports.default = TodoApp;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//Filter子组件
	var Link = function Link(_ref) {
	  var active = _ref.active,
	      children = _ref.children,
	      _onClick = _ref.onClick;

	  if (active) {
	    return _react2.default.createElement(
	      'span',
	      null,
	      children
	    );
	  }
	  return _react2.default.createElement(
	    'a',
	    { href: '#', onClick: function onClick(e) {
	        e.preventDefault();
	        _onClick();
	      } },
	    children
	  );
	};
	//Filter容器，以便state参数不用从顶一直传到这里

	var FilterLink = function (_Component) {
	  _inherits(FilterLink, _Component);

	  function FilterLink() {
	    _classCallCheck(this, FilterLink);

	    return _possibleConstructorReturn(this, (FilterLink.__proto__ || Object.getPrototypeOf(FilterLink)).apply(this, arguments));
	  }

	  _createClass(FilterLink, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var store = this.context.store;

	      this.unsubscribe = store.subscribe(function () {
	        return _this2.forceUpdate();
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unsubscribe();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var store = this.context.store;

	      var state = store.getState();
	      return _react2.default.createElement(
	        Link,
	        {
	          active: props.filter === state.visibilityFilter,
	          onClick: function onClick() {
	            store.dispatch({
	              type: 'SET_FILTER',
	              filter: props.filter
	            });
	          }
	        },
	        props.children
	      );
	    }
	  }]);

	  return FilterLink;
	}(_react.Component);

	FilterLink.contextTypes = {
	  store: _react2.default.PropTypes.object
	};
	//Fliters子组件
	var Footer = function Footer() {
	  return _react2.default.createElement(
	    'p',
	    null,
	    'Show:',
	    '  ',
	    _react2.default.createElement(
	      FilterLink,
	      { filter: 'SHOW_ALL' },
	      'All'
	    ),
	    '  ',
	    _react2.default.createElement(
	      FilterLink,
	      { filter: 'SHOW_ACTIVE' },
	      'Active'
	    ),
	    '  ',
	    _react2.default.createElement(
	      FilterLink,
	      { filter: 'SHOW_COMPLETED' },
	      'Completed'
	    )
	  );
	};
	exports.default = Footer;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _todoAppReducer = __webpack_require__(28);

	var _reactRedux = __webpack_require__(32);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//Todo项子组件
	var Todo = function Todo(_ref) {
	  var onClick = _ref.onClick,
	      completed = _ref.completed,
	      text = _ref.text;
	  return _react2.default.createElement(
	    'li',
	    { onClick: onClick,
	      style: { textDecoration: completed ? 'line-through' : 'none' } },
	    text
	  );
	};
	//TodoList子组件
	var TodoList = function TodoList(_ref2) {
	  var todos = _ref2.todos,
	      onTodoClick = _ref2.onTodoClick;
	  return _react2.default.createElement(
	    'ol',
	    null,
	    todos.map(function (todo) {
	      return _react2.default.createElement(Todo, _extends({
	        key: todo.id
	      }, todo, {
	        onClick: function onClick() {
	          return onTodoClick(todo.id);
	        }
	      }));
	    })
	  );
	};
	//TodoList容器
	/*********************************自己实现的Todolist容器*************************************/
	// class VisibleTodoList extends Component {
	//   componentDidMount () {
	//     //读取环境变量
	//     const {store} = this.context;
	//     this.unsubscribe = store.subscribe(() => this.forceUpdate());
	//   }
	//   componentWillUnmount() {
	//     this.unsubscribe();
	//   }
	//   render() {
	//     const props = this.props;
	//     const {store} = this.context;
	//     const state = store.getState();
	//     return (
	//       <TodoList
	//         todos={getVisibleTodos(state.todos,state.visibilityFilter)}
	//         onTodoClick={id=> {
	//           store.dispatch({
	//             type:'TOGGLE_TODO',
	//             id:id,
	//           })
	//         }}
	//       />
	//     );
	//   }
	// }
	// VisibleTodoList.contextTypes = {
	//   store: React.PropTypes.object
	// };
	/*********************************使用react-redux库的connect方法直接生成Todolist容器*************************************/
	//mapStateToProps是connect函数的第一个参数，是一个函数
	//它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系
	//作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射
	//mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
	//mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。
	var mapStateToProps = function mapStateToProps(state, ownProps) {
	  return {
	    todos: (0, _todoAppReducer.getVisibleTodos)(state)
	  };
	};
	//mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射
	//也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store
	//它可以是一个函数，也可以是一个对象
	//如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数
	//返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。
	var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	  return {
	    onTodoClick: function onTodoClick(id) {
	      dispatch({
	        type: 'TOGGLE_TODO',
	        id: id
	      });
	    }
	  };
	};
	//如果mapDispatchToProps是一个对象
	//它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator
	//返回的 Action 会由 Redux 自动发出
	mapDispatchToProps = {
	  onTodoClick: function onTodoClick(id) {
	    return {
	      type: 'TOGGLE_TODO',
	      id: id
	    };
	  }
	};

	//将上面两个函数发送给connect方法，connect方法会生成TodoList的包装组件
	//就像上面被注释掉的部分
	var VisibleTodoList = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TodoList);
	/*********************************Todolist容器完*************************************/
	exports.default = VisibleTodoList;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getVisibleTodos = undefined;

	var _redux = __webpack_require__(23);

	var _todosReducer = __webpack_require__(29);

	var fromTodos = _interopRequireWildcard(_todosReducer);

	var _visibilityFilterReducer = __webpack_require__(31);

	var _visibilityFilterReducer2 = _interopRequireDefault(_visibilityFilterReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	//我们也可以自己实现它
	var myCombineReducers = function myCombineReducers(reducers) {
	  //这应该是一个返回总reducer函数的函数
	  return function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    //遍历reducers里所有的key，这个key应该是所有子state在总state里的属性名
	    //这些key的值就是该生成这个子state的reducer函数
	    //我们需要将这些key的值替换为这些子reduce执行的结果
	    return Object.keys(reducers).reduce(function (nextState, key) {
	      //所以如果来了一个action，会在每个子reducer里找一遍
	      nextState[key] = reducers[key](state[key], action);
	      return nextState;
	    }, {});
	  };
	}; //我们的state应该是一个对象，我们App中不同部分的state应该是state的不同的属性
	//不同的reducer负责生成这些子state
	//还有一个总的reducer，来调用这些子reducer，生成整个应用的state
	//redux提供一个方法合并不相关的reducer生成总reducer

	var todoAppReducer = myCombineReducers({
	  todos: fromTodos.default,
	  visibilityFilter: _visibilityFilterReducer2.default
	});
	exports.default = todoAppReducer;
	var getVisibleTodos = exports.getVisibleTodos = function getVisibleTodos(state) {
	  return fromTodos.getVisibleTodos(state.todos, state.visibilityFilter);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getVisibleTodos = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //todosReducer


	var _redux = __webpack_require__(23);

	var _todoReducer = __webpack_require__(30);

	var _todoReducer2 = _interopRequireDefault(_todoReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	//这里的reducer曾经使用一个数组来保存所有的todo，这现在来看没问题
	//但是当数据多起来的时候，很有可能会有多个数组存着同一个todo
	//这时我们需要使用一个类似数据库的结构来保存所有的todo，而这些数组只存这些todo的id
	//这样利于同步和管理
	//byId中存着所有的todo
	var byId = function byId() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];

	  switch (action.type) {
	    case 'ADD_TODO':
	    case 'TOGGLE_TODO':
	      return _extends({}, state, _defineProperty({}, action.id, (0, _todoReducer2.default)(state[action.id], action)));
	    default:
	      return state;
	  }
	};
	//这里存着所有的todo的id，当添加时id同时添加到这个数组中
	var allIds = function allIds() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'ADD_TODO':
	      return [].concat(_toConsumableArray(state), [action.id]);
	    default:
	      return state;
	  }
	};
	var todosReducer = (0, _redux.combineReducers)({
	  byId: byId,
	  allIds: allIds
	});
	exports.default = todosReducer;


	var getAllTodos = function getAllTodos(state) {
	  return state.allIds.map(function (id) {
	    return state.byId[id];
	  });
	};

	//这种函数通常被成为选择器，它们从state中筛选出我们要的
	//这里的state对应的是todosReducer的state，有byid和allid属性
	var getVisibleTodos = exports.getVisibleTodos = function getVisibleTodos(state, filter) {
	  var allTodos = getAllTodos(state);
	  switch (filter) {
	    case 'SHOW_ALL':
	      return allTodos;
	    case 'SHOW_ACTIVE':
	      return allTodos.filter(function (t) {
	        return !t.completed;
	      });
	    case 'SHOW_COMPLETED':
	      return allTodos.filter(function (t) {
	        return t.completed;
	      });
	    default:
	      return new Error('Unknown filter:' + filter + '.');
	  }
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//todoReducer
	var todoReducer = function todoReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];

	  switch (action.type) {
	    case 'ADD_TODO':
	      return {
	        id: action.id,
	        text: action.text,
	        completed: false
	      };
	    case 'TOGGLE_TODO':
	      if (state.id !== action.id) {
	        return state;
	      } else {
	        //对象的immutation，使用assign或...来返回新的对象
	        return Object.assign({}, state, {
	          completed: !state.completed
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
	exports.default = todoReducer;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//visibilityFilterReducer
	var visibilityFilterReducer = function visibilityFilterReducer() {
	  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SHOW_ALL';
	  var action = arguments[1];

	  switch (action.type) {
	    case 'SET_FILTER':
	      return action.filter;
	    default:
	      return filter;
	  }
	};
	exports.default = visibilityFilterReducer;

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _nodeUuid = __webpack_require__(34);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//使用Action Creater，一个应用的action是固定的，使用creater来产生各个实际的action会标准且方便
	var addTodo = function addTodo(text) {
	  return {
	    type: 'ADD_TODO',
	    text: text,
	    //使用这个方法产生唯一ID
	    id: (0, _nodeUuid.v4)()
	  };
	};
	//add todo子组件，这里的第二个参数就是环境变量
	var AddTodo = function AddTodo(props, _ref) {
	  var store = _ref.store;

	  var input = void 0;
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement('input', { ref: function ref(node) {
	        input = node;
	      } }),
	    _react2.default.createElement(
	      'button',
	      { onClick: function onClick() {
	          if (input.value !== '') {
	            store.dispatch(addTodo(input.value));
	          }
	          input.value = '';
	        } },
	      'Add Todo'
	    )
	  );
	};
	//每个使用环境变量的组件也要指明环境变量的种类
	AddTodo.contextTypes = {
	  store: _react2.default.PropTypes.object
	};
	exports.default = AddTodo;

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("node-uuid");

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _todoAppReducer = __webpack_require__(28);

	var _todoAppReducer2 = _interopRequireDefault(_todoAppReducer);

	var _redux = __webpack_require__(23);

	var _localStorage = __webpack_require__(36);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var addLoggingToDispatch = function addLoggingToDispatch(store) {
	  var rawDispatch = store.dispatch;
	  return function (action) {
	    console.group(action.type);
	    console.log('%c prev state', 'color:gray', store.getState());
	    console.log('%c action', 'color:blue', action);
	    var returnValue = rawDispatch(action);
	    console.log('%c next state', 'color:green', store.getState());
	    console.groupEnd(action.type);
	    return returnValue;
	  };
	};
	var configureStore = function configureStore() {
	  var persistedInitialState = (0, _localStorage.loadState)();
	  //creatStore可以接受第2个参数，这是一个对象，用来指定state的初始状态，可以部分指定，也可以全部指定
	  //未指定的state属性将继续使用reducer中传入的默认值
	  var store = (0, _redux.createStore)(_todoAppReducer2.default, persistedInitialState);
	  if (process.env.NODE_ENV !== 'production') {
	    store.dispatch = addLoggingToDispatch(store);
	  }
	  //每当store有变化，就持久化到localStorage里
	  store.subscribe(function () {
	    (0, _localStorage.saveState)({
	      todos: store.getState().todos
	    });
	  });
	  return store;
	};
	exports.default = configureStore;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var loadState = exports.loadState = function loadState() {
	  try {
	    //localStorage.removeItem('state');
	    var serializedState = localStorage.getItem('state');
	    if (serializedState === null) return undefined;
	    return JSON.parse(serializedState);
	  } catch (err) {
	    return undefined;
	  }
	};

	var saveState = exports.saveState = function saveState(state) {
	  try {
	    //Redux要求state是可以序列化的对象
	    var serializedState = JSON.stringify(state);
	    localStorage.setItem('state', serializedState);
	  } catch (err) {}
	};

/***/ }
/******/ ]);