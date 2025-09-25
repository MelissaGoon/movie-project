import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import { ASSETS_FOLDER_PATH } from "../globals/global-variables";
import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

const Nav = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [showExplore, setShowExplore] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const largerScreen = useMediaQuery(
        "only screen and (min-width : 720px)"
    );

    const exploreRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (exploreRef.current && !exploreRef.current.contains(event.target)) {
                setShowExplore(false);
            }
        };
        if (showExplore) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showExplore]);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);

        if (showSearch) {
            setShowSearch(false);
        }
    };

    const handleShowSearch = () => {
        setShowSearch(!showSearch);

        if (showNavbar) {
            setShowNavbar(false);
        }

        if (showExplore) {
            setShowExplore(false);
        }
    };

    const handleShowExplore = () => {
        setShowExplore(!showExplore);

        if (showSearch) {
            setShowSearch(false);
        }
    };


    return (
        <div className="nav-container">
            <Link to='/' className="logo-link">
                <img src={`${ASSETS_FOLDER_PATH}logo.svg`} alt="ghostlyDB logo" />
                <span className="screen-reader-text">Navigate to ghostlyDB Home</span>
            </Link>

            <button className="hamburger-btn" id="menu-toggle" aria-controls="nav-menu" aria-expanded={showNavbar ? "true" : "false"}
                aria-label="Toggles navigation menu" onClick={handleShowNavbar}>

                {/* Hamburger icon */}
                <svg style={{ display: showNavbar ? "none" : "block" }}
                    width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M2 26H33.5M2 14H33.5M2 2H33.5" stroke="#A30D0B" strokeWidth="3.63" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* Close icon */}
                <svg style={{ display: showNavbar ? "block" : "none" }}
                    width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" id="close-icon" aria-hidden="true" focusable="false">
                    <path d="M2 26L25.88 2M26 26L2.12 2" stroke="#A30D0B" strokeWidth="3.58531" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </button>
            <nav id="nav-menu" className={!showNavbar && "hidden"}>
                <ul>
                    <li><NavLink to='/my-list'>My List</NavLink></li>
                    <li className="explore"><NavLink to='/'>Explore</NavLink>
                        <button className="explore-expand" id="explore-expand" aria-controls="explore-dropdown" aria-expanded={showExplore ? "true" : "false"}
                            aria-label="Toggles navigation menu" onClick={handleShowExplore}>

                            <svg width="53" height="32" viewBox="0 0 53 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 3.55514L26.5551 26.1103L49.1103 3.55514" stroke="#A30D0B" strokeWidth="7" strokeLinecap="round" />
                            </svg>

                        </button>
                        <div className={`explore-dropdown ${!showExplore && largerScreen && "hidden"}`} id="explore-dropdown" ref={exploreRef}>
                            <ul className="explore-links">
                                <li><NavLink to='/?type=popular'>Popular</NavLink></li>
                                <li><NavLink to='/?type=nowPlaying'>Now Playing</NavLink></li>
                                <li><NavLink to='/?type=upcoming'>Upcoming</NavLink></li>
                                <li><NavLink to='/?type=topRated'>Top Rated</NavLink></li>
                            </ul>
                        </div>
                    </li>
                    <li><NavLink to='/about'>About</NavLink></li>
                </ul>
            </nav>

            <button onClick={handleShowSearch}
                className="search-btn" aria-controls="search-bar" aria-expanded={showSearch ? "true" : "false"}
                aria-label="Toggles search dropdown">

                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M23.1747 23.5L32.7988 33.1241M27 14.5C27 21.4036 21.4036 27 14.5 27C7.59644 27 2 21.4036 2 14.5C2 7.59644 7.59644 2 14.5 2C21.4036 2 27 7.59644 27 14.5Z" stroke="#A30D0B" strokeWidth="3.36" strokeLinecap="round" />
                </svg>

            </button>

            {showSearch && <Search className="search-bar" id="search-bar" />}

        </div>
    )
}

export default Nav