import React from 'react';
import {
    HomePage,
    LoginPage
} from '../pages/index';
import { availablePages } from '../constants/index';
import PrivateRoute from './PrivateRoute';
import { Route, Switch } from 'react-router-dom';

const Routes = () => {

    return (
        <>
            <Switch>
                <PrivateRoute exact path={availablePages.homePage} component={HomePage} />
                <Route exact path={availablePages.loginPage} component={LoginPage} />
            </Switch>
        </>
    )
}

export default Routes;