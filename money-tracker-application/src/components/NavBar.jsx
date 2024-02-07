import Icon from '@mdi/react';
import { mdiViewDashboardOutline, mdiCashFast , mdiAccountOutline, mdiCalculatorVariantOutline } from '@mdi/js';
import '../styles/NavBar.css'
import {NavLink} from 'react-router-dom';

function NavBar() {
    return (
        <div className="navbar">
            <div className="profile">
                <Icon path={mdiAccountOutline} size={1} />Welcome, name.
            </div>
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
      </div>
    )
}

export default NavBar;