import styles from './components-styles/App.module.css';
import Header from './Header';
import UserName from './UserName'
import Navigation from './Navigation'
import useUserDetails from '../Hooks/UserDetails';
import { Navigate } from 'react-router-dom';
import AppContext from '../Contexts/AppContext';
import { useReducer } from 'react';
import appReducer from '../Reducers/AppReducer';

const initialState = {
  projects: [],
  selectedProject: {},
  tasks: [],
  tasksOfProject: []
}

function App() {
  const isValidToken = useUserDetails();
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {isValidToken ?
        <><div className={styles.container}>
          <UserName />
        </div>
          <Navigation />
        </>
        : <Navigate to="/login" />}
    </AppContext.Provider>

  );
}

export default App;
