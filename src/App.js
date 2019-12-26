import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import Home from './Components/Home';
import MyLikes from './Components/MyLikes';
import About from './Components/About';
import Navbar from './Components/Navbar';


function App() {
  return (
    <div className="container-fluid">
      <Navbar />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/mylikes" component={MyLikes} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
