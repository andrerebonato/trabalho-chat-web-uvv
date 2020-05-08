import React, { useState, useEffect } from 'react';
import { CSSTransition } from "react-transition-group";

const Header = ({ isLoggedIn }) => {
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
        <header className="Header primary-bg">
            <CSSTransition
                in={!isSmallScreen || isHeaderVisible}
                timeout={350}
                classNames="NavAnimation"
                unmountOnExit
            >
                <nav className="Nav">
                    <a href="/">Home</a>
                    <a href="/">Conversar</a>
                    <a href="/">Sobre</a>
                    {isLoggedIn ? (
                        <button className="btn btn-danger">Minha conta</button>
                    ) : (
                            <button className="btn btn-primary primary-bg">Entrar</button>
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