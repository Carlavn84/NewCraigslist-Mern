import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

class Addpost extends Component {
constructor(props) {
    super(props);
    this.state = {
    listdetail: {
        title:"",
        description:"",
        location:"",
        price:"",
        contact:""
    },
    error:"",
    success:""
    }
}


getloggedInUser() {
    axios
      .get("http://localhost:8000/api/isloggedin")
      .then(
        function(result) {
          console.log(result);
          this.setState({
            user: result.data,
            error: ""
          });
        }.bind(this)
      )
      .catch(error => console.log(error));
  }

  handleChange=(e) =>{
   this.setState({
    [e.target.name]: e.target.value
   })
  }


    render() {
        return (
            <div className="loginform">
            <Link to ='/' >See All listings</Link>{" "} {" "} {" "} | {" "} {" "} {" "} 
                <Link to ='/join' >Login/Register</Link>
                <h3 className="text-info"> Create a new listing </h3>  
                <form>
                <div className="form-group">
                        <input 
                            type="text" 
                            name="title"
                            placeholder="Title of your listing"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                </div>        
                <div className="form-group">    
                        <input 
                            type="text" 
                            name="description"
                            placeholder="Description of your listing"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                        </div>
                        <div className="form-group">    
                        <input 
                            type="text" 
                            name="location" 
                            placeholder="Location"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                       </div>
                       <div className="form-group">    
                        <input 
                            type="text" 
                            name="price" 
                            placeholder="Price of listing"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                        </div>
                        <div className="form-group">    
                        <input 
                            type="text" 
                            name="contact"
                            placeholder="Contact Details"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                         </div>
                        <button className="btn btn-primary" type="submit">Post Listing</button>
                </form>
            </div>
        );
    }
}

export default Addpost;
