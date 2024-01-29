import Dashboard from './components/Dashboard';
import Transaction from './components/Transaction';
import NavBar from './components/NavBar';
import './App.css'
import './styles/Transaction.css'
import './styles/Dashboard.css'
import AppRouter from './components/AppRouter';
import Icon from '@mdi/react';
import { mdiViewDashboardOutline, mdiCashFast , mdiAccountOutline } from '@mdi/js';

function App() {
  return (
    <>
    <div className="app-main">
      <div className="navbar">
        <div className="profile">
          <Icon path={mdiAccountOutline} size={1} />Welcome, name.
          
        </div>
        <div className="nav-menu">
          <ul id>
            <li><a href="http://localhost:5173/dashboard">
            <Icon path={mdiViewDashboardOutline} size={1} />Dashboard
            </a></li>
            <li><a href="http://localhost:5173/transaction">
            <Icon path={mdiCashFast} size={1} />Transactions
            </a></li>
          </ul>
        </div>

      </div>
      <div className="app-body">
        <AppRouter />
      </div>
    </div>
    </>
    
  )
}

export default App
