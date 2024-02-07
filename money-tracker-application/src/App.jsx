import './App.css'
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();
  const paths = ['/dashboard','/transaction','/budget'];
  const renderFlag = paths.includes(location.pathname);
  
  return (
    <>
    <div className="app-main">
      {renderFlag && <NavBar/>}
      <div className="app-body">
        <AppRouter />
      </div>
    </div>
    </>
    
  )
}

export default App
