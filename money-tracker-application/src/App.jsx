import './App.css'
import AppRouter from './components/AppRouter';
import { mdiViewDashboardOutline, mdiCashFast , mdiAccountOutline } from '@mdi/js';
function App() {
  return (
    <>
    <div className="app-main">
      <div className="app-body">
        <AppRouter />
      </div>
    </div>
    </>
    
  )
}

export default App
