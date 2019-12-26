import React, { Component } from 'react'

export default class Card extends Component {
    render() {

        if (this.props.liked) {
            return (
            <div>
                <div className="col-sm-6 p-3 mb-2">
                    <div className="card" style={{ width: '14rem' }}>
                        <img className="card-img-top" src={this.props.user.image} alt={this.props.user.name} />
                        <div className="card-body">
                            <h5 className="card-title">{this.props.user.name}</h5>
                            <p className="card-text">Age: {this.props.user.age}</p>
                            <p className="card-text">Hieght: {this.props.user.height}</p>
                            <p className="card-text">Location: {this.props.user.location}</p>
                            <p className="card-text">{this.props.user.premium ? 'Hobbies: ' + this.props.user.hobbies + '' : ''}</p>                                                
                        </div>
                    </div>
                </div>
            </div>
            )} else {
        return (
            <div>
                <div className="col-sm-6 p-3 mb-2">
                    <div className="card" style={{ width: '14rem' }}>
                        <img className="card-img-top" src={this.props.user.image} alt={this.props.user.name} />
                        <div className="card-body">
                            <h5 className="card-title">{this.props.user.name}</h5>
                            <p className="card-text">Age: {this.props.user.age}</p>
                            <p className="card-text">Hieght: {this.props.user.height}</p>
                            <p className="card-text">Location: {this.props.user.location}</p>
                            <p className="card-text">{this.props.user.premium ? 'Hobbies: ' + this.props.user.hobbies + '' : ''}</p>
                            <div className="row centeredDiv">
                                <div className="col-xs-6 centeredDiv">
                                    <a href="#" className="btn btn-info btn-lg">
                                        <span className="glyphicon glyphicon-heart" onClick={() => this.props.heartBtn(this.props.user.id - 1)}></span>
                                    </a>&nbsp;	&nbsp;	&nbsp;	&nbsp;	
                                </div>
                                <div className="col-xs-6 centeredDiv">
                                    <a href="#" className="btn btn-info btn-lg">
                                        <span className="glyphicon glyphicon-arrow-right" onClick={() => this.props.arrowBtn()}></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    }
}
