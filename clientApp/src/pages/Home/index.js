import React from 'react';
import { HeaderComponent } from '../../components/index';
import { availablePages } from '../../constants/index'

const Home = () => {
    return (
        <>
            <HeaderComponent isLoggedIn={false} />
        </>
    )
}

export default Home;