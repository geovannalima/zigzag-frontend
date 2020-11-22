import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Register from '../pages/Register';
import Login from '../pages/Login';
import Painel from '../pages/Painel';
import Slangs from '../pages/slangsNotRegister';
import My from '../pages/mygirias';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Routes() {

    const check = () => {
        const user = cookies.get('id');

        if (user) {
            return true;
        } else {
            return false;
        }
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={props =>
                check() ? (

                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    )
            }
        />
    );


    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/painel" component={Painel} />
                <PrivateRoute path="/mySlangs" component={My} />
                <Route path="/register" component={Register} />
                <Route path="/slangs" component={Slangs} />
            </Switch>
        </Router>

    )
}