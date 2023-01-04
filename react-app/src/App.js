import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navbar/NavBar';
import Modals from "./components/Modals/Modals";
import { restoreUser } from './store/session';
import MainView from './components/MainView/MainView';
import EditEventForm from './components/EditEventForm/EditEventForm';
import { Route, Routes } from "react-router-dom";
import { setMonth, setYear } from './store/sessionData';
import { Setting } from './components/Settings/Settings';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const targetDate = new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  useEffect(() => {
    (async () => {
      await dispatch(restoreUser());
      dispatch(setYear(year));
      dispatch(setMonth(month));
      setLoaded(true);
    })();
  }, [dispatch, month, year]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={
          <>
            <NavBar />
            <MainView />
            <Modals />
          </>
        } />
        <Route path='/eventedit/:eventId' element={<EditEventForm />} />
        <Route path='/settings/*' element={<Setting />} />
      </Routes>
    </>
  );
}

export default App;
