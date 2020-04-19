import React, { Component } from 'react'

class Home extends Component {

  componentDidMount() {
    window.PubSubHeader.subscribe(this, "header-login-click", function() {
      alert("I hear the login click");
    })
  }

  render() {
    return (
      <div>Content of main page</div>
    )
  }
}

export default Home;