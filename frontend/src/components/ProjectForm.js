import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', rep_url: '', users: []}
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
    }

    handleProjectChange(event) {


    }

    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.rep_url, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <input type="text" name="name" placeholder="name"
                    value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                <input type="text" name="rep_url" placeholder="rep_url"
                    value={this.state.rep_url} onChange={(event)=>this.handleChange(event)} />
                <select name="users" multiple onChange={(event) => this.handleProjectChange(event)}
                    {this.props.users.map((item)=> <option value={item.id}>{item.id})}

                </select>


                        <input type="password" name="password" placeholder="password"
                    value={this.state.password} onChange={(event)=>this.handleChange(event)} />
                <input type="submit" value="Login" />
            </form>
        );
    }
}

export default ProjectForm