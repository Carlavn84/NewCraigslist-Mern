import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Homepage extends Component {
    render() {
        return (
            <div>
                <h1 className="text-danger">Homepage</h1>  
                <Link to ='/newlisting' >Post a listing</Link>{" "} {" "} {" "} | {" "} {" "} {" "} 
                <Link to ='/join' >Login/Register</Link>
       
            </div>
        );
    }
}

export default Homepage;
