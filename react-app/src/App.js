import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navbar/NavBar';
import Modals from "./components/Modals/Modals";
import { restoreUser } from './store/session';
import MainView from './components/MainView/MainView';

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
    </>
  );
}

export default App;
