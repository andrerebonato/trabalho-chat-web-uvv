import React from "react";
import { availablePages } from '../constants/index';
import { isAuthenticated } from '../services/authJwt';
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: availablePages.loginPage, state: { from: props.location } }} />
                )
        }
    />
);

export default PrivateRoute;