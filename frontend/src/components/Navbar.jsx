import { NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    return (
        <nav id='navbar'>
            <h1>To Do Lists</h1>
            <ul>
                <li>
                    <NavLink to="/" className="btn">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/list/new" className="btn newList">Create List</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar