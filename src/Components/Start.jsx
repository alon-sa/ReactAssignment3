import React, { Component } from 'react'

export default class Start extends Component {

    constructor(props) {
        super(props)
        this.state = {
            minAge: "",
            maxAge: "",
            gender: "choose"
        };
    }


    onMinChanged = (event) => {
        this.setState({ minAge: event.target.value });
        
    }
    onMaxChanged = (event) => {
        this.setState({ maxAge: event.target.value });
        
    }
    slctGenderChange = (event) => {
        this.setState({ gender: event.target.value });
        
    }


    render() {
        return (
            <div>

                <form>
                    Interested in:<br />
                    <select id="gender" value={this.state.gender} onChange={this.slctGenderChange}>
                        <option value="choose">Choose gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select><br /><br />
                    Minimum Age:<br />
                    <input type="number" id="minAge" value={this.state.minAge} onChange={this.onMinChanged} />
                    <br /><br />
                    Maximum Age:<br />
                    <input type="number" id="maxAge" value={this.state.maxAge} onChange={this.onMaxChanged} />
                    <br /><br />

                    <div className="text-center">
                        <a href="#" className="btn btn-info btn-lg" onClick={() => this.props.generateList(this.state)}>
                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span> Find
                    </a>
                    </div>
                </form>
            </div>
        )
    }
}
