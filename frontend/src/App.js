import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, BrowserRouter} from "react-router-dom";
import {Routes} from "./routes";
import {Provider} from "react-redux";
import store from './store'

// pages
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import BootstrapTables from "./pages/tables/BootstrapTables";
import Signin from "./pages/authentication/Signin";
import Signup from "./pages/authentication/Signup";
import ResetPasswordConfirm from "./pages/authentication/ResetPasswordConfirm";
import ResetPassword from "./pages/authentication/ResetPassword";
import Lock from "./pages/authentication/Lock";
import NotFoundPage from "./pages/authentication/NotFound";
import ServerError from "./pages/authentication/ServerError";
import Activate from "./pages/authentication/Activate"
import Google from "./pages/authentication/Google";

// components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Accordion from "./pages/components/Accordion";
import Alerts from "./pages/components/Alerts";
import Badges from "./pages/components/Badges";
import Breadcrumbs from "./pages/components/Breadcrumbs";
import Buttons from "./pages/components/Buttons";
import Forms from "./pages/components/Forms";
import Modals from "./pages/components/Modals";
import Navs from "./pages/components/Navs";
import Navbars from "./pages/components/Navbars";
import Pagination from "./pages/components/Pagination";
import Popovers from "./pages/components/Popovers";
import Progress from "./pages/components/Progress";
import Tables from "./pages/components/Tables";
import Tabs from "./pages/components/Tabs";
import Tooltips from "./pages/components/Tooltips";
import Toasts from "./pages/components/Toasts";


const RouteWithLoader = ({component: Component, ...rest}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true}/> <Component {...props} /> </>)}/>
    );
};

// const isAuthenticated = true

const RouteWithSidebar = ({component: Component, ...rest}) => {
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
            localStorage.getItem('access') ? (
                <>
                    <Preloader show={loaded ? false : true}/>
                    <Sidebar/>

                    <main className="content">
                        <Navbar/>
                        <Component {...props} />
                        <Footer toggleSettings={toggleSettings} showSettings={showSettings}/>
                    </main>
                </>
            ) : <Redirect to={{pathname: Routes.Signin.path, state: {from: props.location}}}/>

        )}
        />
    );
};

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>

                {/*is authenticated*/}
                <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview}/>
                <RouteWithSidebar exact path={Routes.Settings.path} component={Settings}/>
                <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions}/>
                <RouteWithLoader exact path={Routes.Lock.path} component={Lock}/>

                {/*auth*/}
                <RouteWithLoader exact path={Routes.Signin.path} component={Signin}/>
                <RouteWithLoader exact path={Routes.Signup.path} component={Signup}/>
                <RouteWithLoader exact path={Routes.Activate.path} component={Activate}/>
                <RouteWithLoader exact path={Routes.Google.path} component={Google}/>
                <RouteWithLoader exact path={Routes.ResetPasswordConfirm.path} component={ResetPasswordConfirm}/>
                <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword}/>

                {/*other*/}
                <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage}/>
                {/*<RouteWithLoader exact path={Routes.Navbars.path} component={Navbars}/>*/}
                {/*<RouteWithLoader exact path={Routes.ServerError.path} component={ServerError}/>*/}
                {/*<RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Badges.path} component={Badges}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Forms.path} component={Forms}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Modals.path} component={Modals}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Navs.path} component={Navs}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Progress.path} component={Progress}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Tables.path} component={Tables}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips}/>*/}
                {/*<RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts}/>*/}
                <Redirect to={Routes.NotFound.path}/>
            </Switch>
        </BrowserRouter>
    </Provider>
)

export default App