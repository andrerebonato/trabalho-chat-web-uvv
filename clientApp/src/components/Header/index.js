import React, { useState, useEffect } from 'react';
import './styles.css';
import { CSSTransition } from "react-transition-group";
import { NavbarToggler } from 'reactstrap';

const Header = ({ pageTitle, isLoggedIn }) => {
    const [isHeaderVisible, setHeaderVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    //check window media query on instance this component
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    //check if the window is on "smallscreen mode (<700px)"
    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    //open/close the header component.
    const toggleHeader = () => {
        setHeaderVisibility(!isHeaderVisible);
    };

    return (
        <header className="Header">
            <h6 className="">Chat web uvv</h6>
            <CSSTransition
                in={!isSmallScreen || isHeaderVisible}
                timeout={350}
                classNames="NavAnimation"
                unmountOnExit
            >
                <nav className="Nav">
                    <a href="/">Home</a>
                    <a href="/">Articles</a>
                    <a href="/">About</a>
                    {isLoggedIn ? (
                        <button className="btn btn-danger">Logout</button>
                    ) : (
                            <button className="btn btn-primary">Entrar</button>
                        )
                    }
                </nav>
            </CSSTransition>
            <button onClick={toggleHeader} className="Burger">
                Menu
            </button>
        </header>
    )
}

export default Header;