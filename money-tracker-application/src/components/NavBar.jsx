import Icon from '@mdi/react';
import { mdiViewDashboardOutline, mdiCashFast , mdiAccountOutline, mdiCalculatorVariantOutline, mdiLogout } from '@mdi/js';
import '../styles/NavBar.css'
import {NavLink, useNavigate} from 'react-router-dom';
import { auth } from '../firebase';
import {signOut} from 'firebase/auth';

/**
 * Creation of navigation bar component
 * @returns {JSX.Element} Navigation bar with links to necessary components
 */
function NavBar() {
    const navigate = useNavigate();

    //Sign user out of application and redirect user to homepage
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
            console.error("Error:",error);
        });
    }
    return (
        <div className="navbar">
            <div className="nav-menu">
                <ul id>
                    <li><NavLink to="/dashboard">
                    <Icon path={mdiViewDashboardOutline} size={1} />Dashboard
                    </NavLink></li>
                    <li><NavLink to="/budget">
                    <Icon path={mdiCalculatorVariantOutline} size={1} />Budgets
                    </NavLink></li>
                    <li><NavLink to="/transaction">
                    <Icon path={mdiCashFast} size={1} />Transactions
                    </NavLink></li>
                    
                </ul>
            </div>
            <div className="logout"> 
                <button onClick={handleLogout}>
                    <Icon path={mdiLogout} size={1} />Log Out
                </button>
            </div>
      </div>
    )
}

export default NavBar;