import React, { Component } from 'react';
import axios from 'axios';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            password_confirm: "",
            userdata: null,
            success: false
          }
    }
    


changeHandler =(e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
}

submitHandler =(e)=> {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", this.state)
      .then(result => {
        if (result.data.errors) {
          return this.setState(result.data);
        }
        return this.setState({
          userdata: result.data,
          errors: null,
          success: true
        });
      });
  }



    render() {
        return (
            <div>
            <h3>Register</h3>
            {this.state.success && <h3 className="text-success">You are successfully registered!</h3>}
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <input 
                            onChange ={this.changeHandler}
                            type="text" 
                            name="firstname" 
                            id=""
                            placeholder="Firstname"
                            className="form-control"
                            />  {" "}
                       
                        {this.state.errors && 
                            this.state.errors.firstname && (
                            <p className="text-danger">{this.state.errors.firstname.msg}</p>
                    )}
                    </div>
                    <div className="form-group">
                        <input 
                            onChange ={this.changeHandler}
                            type="text" 
                            name="lastname" 
                            id=""
                            placeholder="Lastname"
                            className="form-control"
                            /> {" "}
                     {this.state.errors && 
                        this.state.errors.lastname && (
                        <p className="text-danger">{this.state.errors.lastname.msg}</p>
                    )}       
                    </div>
                    <div className="form-group">
                        <input 
                            onChange ={this.changeHandler}
                            type="email" 
                            name="email" 
                            id=""
                            placeholder="Email"
                            className="form-control"
                        />
                        {this.state.errors && 
                            this.state.errors.email && (
                               <p className="text-danger">{this.state.errors.email.msg}</p>
                        )}       
                    </div>
                    <div className="form-group">
                        <input
                            onChange ={this.changeHandler} 
                            type="password" 
                            name="password" 
                            id=""
                            placeholder="Password"
                            className="form-control"
                            /> 
                        {this.state.errors && 
                            this.state.errors.password && (
                               <p className="text-danger">{this.state.errors.password.msg}</p>
                        )}         
                    </div>
                    <div className="form-group">
                        <input
                             onChange ={this.changeHandler}  
                            type="password" 
                            name="password_confirm" 
                            id=""
                            placeholder="Confirm Password"
                            className="form-control"
                            /> 
                        {this.state.errors && 
                            this.state.errors.password_confirm && (
                               <p className="text-danger">{this.state.errors.password_confirm.msg}</p>
                        )}            
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        
        </div>
        );
    }
}

export default Register;
