import { Route, Switch, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import Routes from "./routes";
class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/todos">Todos</NavLink>
          </li>
          <li>
            <NavLink to="/posts">Posts</NavLink>
          </li>
        </ul>
        <Switch>
          { Routes.map( (route, index) => <Route key={ index } { ...route } /> ) }
          })}
        </Switch>
      </div>
    )
  }
}

export default App;

