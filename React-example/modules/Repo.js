import React from 'react'
export default React.createClass({
	render() {
		return (
        <div>
          <h3>UserName:{this.props.params.userName}</h3>
          <h3>Repo:     {this.props.params.repoName}</h3>
        </div>
    )
	}
})
