import { useEffect, useState } from 'react';
import './App.css'
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { useLocation } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

function App() {
    const location = useLocation();
    const paths = ['/dashboard','/transaction','/budget'];
    const renderFlag = paths.includes(location.pathname);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [userUID,setUserUID] = useState(null);
    
    //trigger the auth state - check if user is signed in or out
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              const uid = user.uid;
              setIsAuthenticated(true);
              setUserUID(uid);
              console.log("uid", uid);
          } else {
              console.log("User is logged out.")
              setIsAuthenticated(false);
              setUserUID(null)
          }
      })

      function cleanup() {
        unsubscribe();
      }
      return cleanup
    },[])

    useEffect(() => {
      console.log("userUID state after setting:", userUID);
      
    },[userUID]);
  
    return (
      <>
      <div className="app-main">
        {renderFlag && <NavBar/>}
        <div className="app-body">
          <AppRouter isAuthenticated={isAuthenticated} userUID={userUID} />
        </div>
      </div>
      </>
      
    )
}

export default App
