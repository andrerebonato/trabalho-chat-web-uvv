import React, { useEffect } from 'react';
import { isAuthenticated } from '../../services/authJwt';
import { availablePages } from '../../constants/index'
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    useEffect(() => {
        if (isAuthenticated)
            history.push(availablePages.chatPage);
        else {
            history.push(availablePages.loginPage);
        }
    }, []);

    return (
        <>
        </>
    )
}

export default Home;