import React from 'react';
import { HeaderComponent } from '../../components/index';
import { isAuthenticated } from '../../services/authJwt';
import { availablePages } from '../../constants/index'

const Home = () => {
    return (
        <>
            <HeaderComponent isLoggedIn={isAuthenticated() ? true : false} activePage={availablePages.homePage} />

        </>
    )
}

export default Home;