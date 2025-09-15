import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
const Nav = () => {
    return (
        <div className="nav-container">
            <Link to='/'>
                <p>ghostlyDB</p>
            </Link>

            <nav>
                <ul>
                    <li><NavLink to='/my-list'>My List</NavLink></li>
                    <li><NavLink to='/'>Explore</NavLink>
                        <div className="explore-dropdown">
                            <ul className="explore-links">
                                <li><NavLink to='/#popular'>Popular</NavLink></li>
                                <li><NavLink to='/#now-playing'>Now Playing</NavLink></li>
                                <li><NavLink to='/#upcoming'>Upcoming</NavLink></li>
                                <li><NavLink to='/#top-rated'>Top Rated</NavLink></li>
                            </ul>
                        </div>
                    </li>
                    <li><NavLink to='/about'>About</NavLink></li>
                </ul>
            </nav>

            <Search />

        </div>
    )
}

export default Nav