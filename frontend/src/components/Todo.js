import React from "react";

const TodoItem = ({todo, deleteToDo})=>{
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.root_user}</td>
            <td>{todo.text}</td>
            <td>{todo.creation_date}</td>
            <td>{todo.update_date}</td>
            <td>{todo.is_active}</td>
            <td><button onClick={()=>deleteToDo(todo.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodoList = ({todos, deleteToDo}) => {
    return (
        <table>
            <th>project</th>
            <th>root_user</th>
            <th>text</th>
            <th>creation_date</th>
            <th>update_date</th>
            <th>is_active</th>
            {todos.map((todo_) => <TodoItem todo={todo_} deleteToDo={deleteToDo}/>)}
        </table>
    )
}

export default TodoList
