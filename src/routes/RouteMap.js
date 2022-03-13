import React, { useState, useEffect } from 'react';
import {Route, Switch} from 'react-router-dom';
import { DashboardRoutes } from '../routes';

//Components
import Preloader from '../components/Preloader';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

//views
import Signin from '../views/login/Signin';
import Signup from '../views/login/Signup';
import Dashboard from '../views/dashboard/Dashboard';

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
    const RouteWithSidebar = ({ component: Component, ...rest }) => {
        const [loaded, setLoaded] = useState(false);
        useEffect(() => {
          const timer = setTimeout(() => setLoaded(true), 1000);
          return () => clearTimeout(timer);
        }, []);
      
        const localStorageIsSettingsVisible = () => {
          return localStorage.getItem('settingsVisible') === 'false' ? false : true
        }
      
        const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
      
        const toggleSettings = () => {
          setShowSettings(!showSettings);
          localStorage.setItem('settingsVisible', !showSettings);
        }
      
        return (
          <Route {...rest} render={props => (
            <>
              <Preloader show={loaded ? false : true} />
              <Sidebar />
      
              <main className="content">
                <Navbar />
                <Component {...props} />
                <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
              </main>
            </>
          )}
          />
        );
    };

    return (
        <Switch>
            {/* Without Sidebar */}
            <RouteWithLoader exact path={DashboardRoutes.Signin.path} component={Signin} />
            <RouteWithLoader exact path={DashboardRoutes.Signup.path} component={Signup} />

            {/* With Sidebar */}
            <RouteWithSidebar exact path={DashboardRoutes.Dashboard.path} component={Dashboard} />
        </Switch>
    )
}
 
export default RouteMap;