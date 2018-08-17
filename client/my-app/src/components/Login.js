import React, { Component } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      error: null
    
    };
    
  }

  changeHandler=(e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitHandler=(e)=> {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/login", this.state)
      .then(res => {
        if (res.data.error) {
          return this.setState({ error: res.data.message });
        }
        // if (res.data.errors) {
        //   return this.setState({ valerrors: res.data.errors });
        // }
        return (window.location = "/");
      });
  }
  render() {
    return (
      <div>
            <h3>Login</h3>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.submitHandler}>
        <div className="form-group">
          <input
            onChange={this.changeHandler}
            type="email"
            name="email"
            // id="email"
            className="form-control"
          />
          </div>
          <div className="form-group">
          <input
            onChange={this.changeHandler}
            type="password"
            name="password"
            // id="password"
            className="form-control"
          />
          </div>
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
        <br />
      </div>
    );
  }
}

export default Login;

