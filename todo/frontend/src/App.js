import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import ProjectList from "./components/Project";
import ConcreteProject from "./components/ConcreteProject";
import TodoList from "./components/Todo";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import axios from "axios";
import {BrowserRouter, Routes, Route, Link, Switch} from "react-router-dom"

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

                <BrowserRouter>
                    <nav>
                        <li>
                            <Link to='/'>USERS</Link>
                        </li>
                        <li>
                            <Link to='/projects'>PROJECTS</Link>
                        </li>
                        <li>
                            <Link to='/todos'>TODOs</Link>
                        </li>
                    </nav>

                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>

                        <Route path='/projects' >
                            <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path=":project_id" element={<ConcreteProject projects={this.state.projects}/>}/>
                        </Route>

                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>}/>

                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>

                <Footer />
            </div>
        )
    }
}

export default App;
