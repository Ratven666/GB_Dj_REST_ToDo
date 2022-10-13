import React from "react";
import { useParams } from "react-router-dom";

const ProjectItem = ({project})=>{
    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.rep_url}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ConcreteProject = ({projects}) => {
    let {project_id} = useParams()
    console.log(project_id)
    let filter_projects = projects.filter((project) => project.id.toString().includes(project_id))
    return (
        <table>
            <th>Name</th>
            <th>Rep_url</th>
            <th>Users</th>
            {filter_projects.map((project_) => <ProjectItem project={project_} />)}
        </table>
    )
}

export default ConcreteProject
