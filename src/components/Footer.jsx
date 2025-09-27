
import { NavLink } from "react-router-dom";
const Footer = () => {
    const currentYear = new Date().getFullYear();


    return (
        <footer>
            <div className="footer-top">
                <nav aria-label="Footer navigation">
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/my-list'>My List</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                    </ul>
                </nav>

                <a href="#site-main">to top</a>
            </div>
            <p>&copy; {currentYear} Melissa Goon</p>
        </footer>
    )
}

export default Footer