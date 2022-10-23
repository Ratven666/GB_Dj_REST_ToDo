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
import LoginForm from "./components/Auth";
import axios from "axios";
import {BrowserRouter, Routes, Route, Link, Switch} from "react-router-dom"
import Cookies from "universal-cookie"

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            "projects": [],
            "todos": [],
            "token": ""
        }
    }

    logout() {
        this.set_token("")
    }

    is_auth() {
        return !!this.state.token
    }

    set_token(token) {
        console.log(token)
        const cookies = new Cookies()
        cookies.set("token", token)
        this.setStage({"token": token}, () => this.load_data())
    }

    get_token_storage() {
        const cookies = new Cookies()
        const token = cookies.get("token")
        this.setState({"token": token}, () => this.load_data())
    }

    get_token(username, password) {
        const data = {username: username, password: password}
        axios.post("http://127.0.0.1:8000/api-token-auth/").then(response => {
        this.set_token(response.data["token"])
        }).catch(error => alert("Неверный логин или пароль"))
    }

    get_headers() {
        let headers = {
            "Content-Type": "application/json"
        }
        if (this.is_auth()) {
            headers["Authorization"] = "Token " + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()

        axios.get("http://127.0.0.1:8000/users/", {headers}).then(response => {
            const users = response.data
                 this.setState({
                'users': users
            })
        }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8000/project/", {headers}).then(response => {
            const projects = response.data["results"]
                 this.setState({
                'projects': projects
            })
        }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8000/todo/", {headers}).then(response => {
            const todos = response.data.results
                 this.setState({
                'todos': todos
            })
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_storage()
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
                        <li>
                            {this.is_auth() ? <button onClick={() => this.logout()}>LOGOUT</button> : <Link to='/login'>LOGIN</Link>}
                        </li>
                    </nav>

                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>

                        <Route exact path='/login' element={<LoginForm get_token={(username, password) =>
                            this.get_token(username, password)} />}/>

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
