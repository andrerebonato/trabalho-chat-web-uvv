import React from 'react';
import {
    HomePage,
    LoginPage
} from '../pages/index';
import { AVAILABLEPAGES } from '../constants/index';
import { Route, Switch } from 'react-router-dom';

const Routes = () => {

    return (
        <>
            <Switch>
                <Route exact path={AVAILABLEPAGES.homePage} component={HomePage} />
                <Route exact path={AVAILABLEPAGES.loginPage} component={LoginPage} />
            </Switch>
        </>
    )
}

export default Routes;