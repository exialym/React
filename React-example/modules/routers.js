import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './App'
import About from './About'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'
import Todo from './Flex/main'
import Counter from './ReduxCounter/main'
import ReduxTodo from './ReduxTodo/main'
module.exports = (
	<Route path="/www" component={App}>
		<IndexRoute component={Home}/>
		<Route path="/www/repos" component={Repos}>
			<Route path="/www/repos/:userName/:repoName" component={Repo}/>
		</Route>
		<Route path="/www/about" component={About}/>
		<Route path="/www/redirect" onEnter={({path}, replace) => replace("/www/repos")}/>
		<Route path="/www/todo" component={Todo}/>
		<Route path="/www/counter" component={Counter}/>
    <Route path="/www/reduxTodo" component={ReduxTodo}/>
	</Route>
)
