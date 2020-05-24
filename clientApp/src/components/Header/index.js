import React, { useState, useEffect } from 'react';
import { CSSTransition } from "react-transition-group";
import { availablePages } from '../../constants/index';
import { useHistory } from 'react-router-dom';


const Header = ({ isLoggedIn, activePage }) => {
    const [isHeaderVisible, setHeaderVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const history = useHistory();

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
                classNames="NavAnimation" unmountOnExit>
                <nav className="Nav">
                    <a href="/" className={activePage === availablePages.homePage ? 'active' : null}>Home</a>
                    <a href=""
                        onClick={(e) => {
                            e.preventDefault();
                            history.push(availablePages.chatPage)
                        }}
                    >Chat
                    </a>
                    <a href="/">Sobre</a>
                    {isLoggedIn ? (
                        <button className="btn btn-danger">Logout</button>
                    ) : (
                            <button className="btn btn-primary primary-bg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push(availablePages.loginPage)
                                }}
                            >Entrar
                            </button>
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