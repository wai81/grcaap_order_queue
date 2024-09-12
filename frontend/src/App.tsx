import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/organizations').then(response => {
            setOrganizations(response.data.items)
        })
    }, [])
    console.log(organizations)
    return (
        <div>
            <h1>РУП "Гродненское агентство по государственной регистрации и земельному кадастру"</h1>
            <ul>
                {organizations.map((organization:any)=>(
                    <li key={organization.id}>{organization.title}</li>
                ))}

            </ul>
        </div>
    )
}

export default App
