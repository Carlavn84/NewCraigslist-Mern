import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Joinpage from './components/Joinpage';
import Home from './components/Homepage';
import Addpost from './components/Addpost';



class App extends Component {
  render() {
    return (
      <div className="App">
       
     
       <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/join" component={Joinpage} />
            <Route path="/newlisting" component={Addpost} />
          </Switch>
        </Router>  
      </div>
    );
  }
}

export default App;
