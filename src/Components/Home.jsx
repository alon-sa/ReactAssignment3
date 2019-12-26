import React, { Component } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import Start from './Start';
import Card from './Card';
import { Profile, Premium } from '../Profile';
import { useHistory } from "react-router-dom";



const mainAppUsers = [];

const likesList = [];

const MySwal = withReactContent(Swal)



export default class Home extends Component {
    constructor(props) {
        super(props)
        let local = false;
        this.apiUrl = 'http://localhost:57575/api/';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup8/mobile/server/api/';
        }
        this.state = {
            index: 0,
            showCard: false
        };

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
                            mainAppUsers.push(tempUser);
                        } else {
                            let tempUser = new Profile(element.Id, element.Name, element.Gender, element.Age, element.Height, element.Location, element.Image, element.Premium)
                            mainAppUsers.push(tempUser);
                        }
                    })
                    this.setState({
                        fullList: mainAppUsers,
                        MainList: mainAppUsers
                    })
                },
                (error) => {
                    console.log("error = ", error);
                });

        fetch(this.apiUrl + 'favorites', {
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
                    result.forEach((element) => likesList.push(element.Id))
                    
                    
                },
                (error) => {
                    console.log("error = ", error);
                });

    }


    generateList = (filterRules) => {
        if (filterRules.gender === "choose") {
            MySwal.fire("Please choose preferred gender", "", "warning")
        } else if (filterRules.minAge === "" || filterRules.maxAge === "") {
            MySwal.fire("Please fill age limit", "", "warning")
        } else {
            let newList = this.state.fullList.filter((user) => {
                if (user.age >= filterRules.minAge && user.age <= filterRules.maxAge && user.gender === filterRules.gender) {
                    return true;
                } else {
                    return false;
                }
            })

            if (newList.length === 0) {
                MySwal.fire("We have nothing in this age range. Please try another age range", "", "warning")
            } else {
                this.setState({
                    MainList: newList,
                    showCard: true
                })
            }


        }
    }

    arrowBtn = () => {

        if (!(this.state.MainList[this.state.index + 1])) {
            MySwal.fire("We dont have any more matches for you", "", "warning")

            this.setState((prevState) => ({
                index: 0,
                showCard: false
            }));


        } else {
            this.setState((prevState) => ({
                index: prevState.index + 1
            }));

        }
    }

    heartBtn = (id) => {

        
        if (likesList.includes(id)) {
            MySwal.fire("This user is already in your liked list", "", "warning")

        } else {
            MySwal.fire("This user was added to your likes list", "", "success");
            likesList.push(id);
            this.FetchPostAddToFavorites(id);                    
        }

        setTimeout(
            function() {
                this.arrowBtn();
            }
            .bind(this),
            2000
        );
    
    }

    FetchPostAddToFavorites = (id) => {

        //pay attention case sensitive!!!! should be exactly as the prop in C#!
        const data = {
            Id: id
        };

        fetch(this.apiUrl + "favorites", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
            })
        })
            .then(res => {
                return res.json()
            })
            .then(
                (result) => {
                    console.log("posted");
                },
                (error) => {
                    console.log("");
                });


    }


    render() {

        if (this.state.showCard) {
            return (
                <div className="row d-flex justify-content-center">
                    <Card key={this.state.index} user={this.state.MainList[this.state.index]} isPremium={this.state.MainList[this.state.index].premium} arrowBtn={this.arrowBtn} heartBtn={this.heartBtn} />
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="row d-flex justify-content-center">
                        <h1>Welcome to Tinder</h1>                                                
                    </div>
                    <div className="row d-flex justify-content-center">
                        <Start generateList={this.generateList} />
                    </div>
                </div>
            )
        }
    }
}
