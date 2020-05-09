import React from 'react';
import {
    HomePage,
    LoginPage,
    SignUpPage,
    ChatPage
} from '../pages/index';
import { availablePages } from '../constants/index';
import PrivateRoute from './PrivateRoute';
import { Route, Switch } from 'react-router-dom';

const Routes = () => {

    return (
        <>
            <Switch>
                <Route exact path={availablePages.homePage} component={HomePage} />
                <Route exact path={availablePages.loginPage} component={LoginPage} />
                <Route exact path={availablePages.signUpPage} component={SignUpPage} />
                <Route exact path={availablePages.chatPage} component={ChatPage} />
            </Switch>
        </>
    )
}

export default Routes;