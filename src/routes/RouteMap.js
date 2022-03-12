import React, { useState, useEffect } from 'react';
import {Route, Switch} from 'react-router-dom';
import { DashboardRoutes } from '../routes';

//Components
import Preloader from '../components/Preloader';

//views
import Signin from '../views/login/Signin';
import Signup from '../views/login/Signup';

const RouteMap = () => {
    const RouteWithLoader = ({ component: Component, ...rest }) => {
        const [loaded, setLoaded] = useState(false);
        
        useEffect(() => {
            const timer = setTimeout(() => setLoaded(true), 1000);
            return () => clearTimeout(timer);
        }, []);
        
        return (
            <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
        );
    };

    return (
        <Switch>
            <RouteWithLoader exact path={DashboardRoutes.Signin.path} component={Signin} />
            <RouteWithLoader exact path={DashboardRoutes.Signup.path} component={Signup} />
        </Switch>
    )
}
 
export default RouteMap;