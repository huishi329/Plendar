import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/Navbar/NavBar';
import MainView from './components/MainView/MainView';
import Modals from "./components/Modals/Modals";
import EditEventForm from './components/EditEventForm/EditEventForm';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { restoreUser } from './store/session';
import { setMonth, setYear, setSideCalendarMonth, setSideCalendarYear, setSideCalendarDate } from './store/sessionData';
import { Settings } from './components/Settings/Settings';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const targetDate = new Date();
  targetDate.setHours(23, 59, 59, 59);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  useEffect(() => {
    (async () => {
      await dispatch(restoreUser());
      dispatch(setYear(year));
      dispatch(setMonth(month));
      dispatch(setSideCalendarYear(year));
      dispatch(setSideCalendarMonth(month));
      dispatch(setSideCalendarDate(targetDate));
      setLoaded(true);
    })();
  }, [dispatch, month, year]);

  if (!loaded) return null;

  return (
    <>
      <Routes>
        <Route path='/' element={
          <>
            <NavBar />
            <MainView />
          </>
        } />
        <Route path='/eventedit/:eventId' element={<EditEventForm />} />
        <Route path='/settings/*' element={<Settings />} />
        <Route path='*' element={
          <>
            <NavBar />
            <PageNotFound />
          </>
        } />
      </Routes>
      <Modals />
    </>
  );
}

export default App;
