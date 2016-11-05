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
	<Route path="/" component={App}>
		<IndexRoute component={Home}/>
		<Route path="/repos" component={Repos}>
			<Route path="/repos/:userName/:repoName" component={Repo}/>
		</Route>
		<Route path="/about" component={About}/>
		<Route path="/redirect" onEnter={({path}, replace) => replace("/repos")}/>
		<Route path="/todo" component={Todo}/>
		<Route path="/counter" component={Counter}/>
    <Route path="/reduxTodo" component={ReduxTodo}/>
	</Route>
)
