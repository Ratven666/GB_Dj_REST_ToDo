import React from "react";

const TodoItem = ({todo})=>{
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.root_user}</td>
            <td>{todo.text}</td>
            <td>{todo.creation_date}</td>
            <td>{todo.update_date}</td>
            <td>{todo.is_active}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <table>
            <th>project</th>
            <th>root_user</th>
            <th>text</th>
            <th>creation_date</th>
            <th>update_date</th>
            <th>is_active</th>
            {todos.map((todo_) => <TodoItem todo={todo_} />)}
        </table>
    )
}

export default TodoList
