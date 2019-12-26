import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import { Profile, Premium } from '../Profile';

const allUsers = [];

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        let local = false;
        this.apiUrl = 'http://localhost:57575/api/';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup8/mobile/server/api/';
        }    
        fetch(this.apiUrl + 'users', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                return res.json()
            })
            .then(
                (result) => {
                    const users = result;
                    users.forEach((element) => {
                        if (element.Premium === true) {
                            let tempUser = new Premium(element.Id, element.Name, element.Gender, element.Age, element.Height, element.Location, element.Image, element.Premium, element.Hobbies)
                            allUsers.push(tempUser);
                        } else {
                            let tempUser = new Profile(element.Id, element.Name, element.Gender, element.Age, element.Height, element.Location, element.Image, element.Premium)
                            allUsers.push(tempUser);
                        }
                    })                      
                },
                (error) => {
                    console.log("err post=", error);
                });
            }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#"><img src="images/logo.png" alt="Logo" style={{ height: 30 }} /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={{
                                    pathname: "/mylikes",
                                    
                                    state: { allUsers: allUsers }
                                }}>My Likes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

            </div>
        )
    }
}
