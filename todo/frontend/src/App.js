import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        const users = [
            {
                'first_name': 'Фёдор',
                'last_name': 'Достоевский',
                'birthday_year': 1821
            },
            {
                'first_name': 'Александр',
                'last_name': 'Грин',
                'birthday_year': 1880
            },
        ]

        this.setState({
            'users': users
        })
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
