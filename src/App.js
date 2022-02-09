import { useState, useEffect } from 'react';
import { getUser, logout } from './services/fetch-utils';
import { BrowserRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import DetailPage from './DetailPage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

import './App.css';

export default function App() {
  // You'll need to track the user in state
  const [userData, setUser] = useState(null);

  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, [userData]);

  async function handleLogout() {
    // call the logout function
    await logout();
    // clear the user in state
    setUser(null);
  }

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Game Inventory</h1>
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
          {userData ? (
            <>
              <Link to={'/board-games'}>List View</Link>
              <Link to={'/create'}>Create</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : null}
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
              {userData ? <Redirect to="/board-games" /> : <Redirect to="/auth" />}
            </Route>
            <Route exact path="/board-games">
              {userData ? <ListPage user={userData} /> : <Redirect to={'/auth'} />}
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
              <ListPage />
            </Route>
            <Route exact path="/board-games/:id">
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
              {userData ? <DetailPage /> : <Redirect to={'/auth'} />}
            </Route>
            <Route exact path="/create">
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
              {userData ? <CreatePage /> : <Redirect to={'/auth'} />}
            </Route>
            <Route exact path="/auth">
              {userData && <Redirect to="/board-games" />}
              <AuthPage setUser={setUser} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
