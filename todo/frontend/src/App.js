import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import axios from "axios";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/users_app/").then(response => {
            const users = response.data
                 this.setState({
                'users': users
            })
        }).catch(error => console.log(error))
    }

    render(){
        return (
            <div>
                <UserList users={this.state.users} />
            </div>
        )
    }
}

export default App;
