import React, { Component } from 'react'
import Card from './Card'

var likesList = [];

export default class MyLikes extends Component {
    constructor(props) {
        super(props)

        let local = false;
        this.apiUrl = 'http://localhost:57575/api/';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup8/mobile/server/api/';
        }

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
                    likesList = [];
                    result.forEach((element) => likesList.push(this.props.location.state.allUsers[element.Id]))
                    this.setState({
                        refresh: true
                    })
                },
                (error) => {
                    console.log("error = ", error);
                });
    }


    render() {
        return (

            <div>
                <div className="d-flex justify-content-center">
                    <h1>My Likes</h1>
                    
                </div>
                <div className="d-flex justify-content-center">
                <h2>{likesList.length === 0 ? "You don't have any likes yet" : ""}</h2>
                </div>
                <div className="row d-flex justify-content-center">
                    {
                        likesList.map((user) =>
                            <Card key={user.id} user={user} isPremium={user.premium} liked={true} />
                        )
                    }
                </div>
            </div>
        )
    }
}
