import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, IndexRoute, Link, hashHistory} from "react-router";

const root = document.createElement('div');
document.body.appendChild(root);

const PrimaryLayout = props => (
    <div className="primary-layout">
        <header>
            Our React Router 3 App
        </header>
        <div>
            <Link to="/">home</Link>
            <Link to="/users">user</Link>
            <Link to="/new">new</Link>
        </div>
        <main>
            {props.children}
        </main>
    </div>
);

const HomePage = () => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;
const NewPage = (nextState, cb) => {
    /*
    // https://blog.csdn.net/u010977147/article/details/53489932
    require.ensure([], (require) => {
        cb(null, require('./new.jsx').default);
    }, 'new');
    */
    import(/* webpackChunkName: 'new' */ './new.jsx').then(modules => {
        cb(null, modules.default);
    })
};

const App = () => (
    <Router history={hashHistory}>
        <Route path="/" component={PrimaryLayout}>
            <IndexRoute component={HomePage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/new" getComponent={NewPage} />
        </Route>
    </Router>
);

ReactDom.render(<App/>, root);