import React from 'react'

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', root_user: ''}
    }


    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
    }

    handleToDoChange(event) {


    }

    handleSubmit(event) {
        this.props.create_todo(this.state.text, this.state.root_user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <input type="text" name="name" placeholder="name"
                    value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                <input type="text" name="rep_url" placeholder="rep_url"
                    value={this.state.root_user} onChange={(event)=>this.handleChange(event)} />

                </select>


                        <input type="password" name="password" placeholder="password"
                    value={this.state.password} onChange={(event)=>this.handleChange(event)} />
                <input type="submit" value="Login" />
            </form>
        );
    }
}

export default ToDoForm