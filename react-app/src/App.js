import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navbar/NavBar';
import Modals from "./components/Modals/Modals";
import { restoreUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(restoreUser());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar />
      <Modals />
      <Switch>
        <Route path='/' exact={true} >
          <h1>Plendar</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
