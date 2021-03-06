import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import NewProject from './components/NewProject';
import ProjectPage from './components/ProjectPage';
import ProfileOptionModal from './components/ProfileOptionModal';
import Overview from './components/Overview';
import { populateProjectsByUser } from './store/project';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(populateProjectsByUser())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/new/project' exact={true} >
          <NewProject />
        </ProtectedRoute>
        <ProtectedRoute path='/my_projects/:projectId' exact={true} >
         <ProjectPage />
        </ProtectedRoute>
        <ProtectedRoute path='/my_projects/overview/:projectId' exact={true} >
          <Overview />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
