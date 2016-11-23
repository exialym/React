import React from 'react'
import NavLink from './NavLink'
import Home from './Home'
export default React.createClass({
  render() {
    return (
      <div id="main">
        <header>Lion&Rabbit's Blog</header>
        <div className="content">
          <div className="nav">
            <ul role="nav">
              <li><NavLink to="/www/" onlyActiveOnIndex={true}>Home</NavLink></li>
              <li><NavLink to="/www/repos">Blogs</NavLink></li>
              <li><NavLink to="/www/about">About</NavLink></li>
              <li><NavLink to="/www/redirect">Redirect</NavLink></li>
              <li><NavLink to="/www/todo">FlexTodoList</NavLink></li>
              <li><NavLink to="/www/counter">ReduxCounter</NavLink></li>
              <li><NavLink to="/www/reduxTodo">ReduxTodo</NavLink></li>
            </ul>
          </div>
          <div className="middle">
            {this.props.children}
          </div>
        </div>
        <footer>@copyright 2016</footer>

      </div>
    )
  }
})
