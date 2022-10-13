import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import axios from "axios";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            "projects": [],
            "todos": []
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/users/").then(response => {
            const users = response.data
                 this.setState({
                'users': users
            })
        }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8000/project/").then(response => {
            const projects = response.data["results"]
                 this.setState({
                'projects': projects
            })
        }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8000/todo/").then(response => {
            const todos = response.data.results
                 this.setState({
                'todos': todos
            })
        }).catch(error => console.log(error))
    }

    render(){
        return (
            <div>
                <Menu />
                <UserList users={this.state.users} />
                <ProjectList projects={this.state.projects} />
                <TodoList todos={this.state.todos} />
                <Footer />
            </div>
        )
    }
}

export default App;
