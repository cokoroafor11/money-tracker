import Icon from '@mdi/react';
import { mdiViewDashboardOutline, mdiCashFast , mdiAccountOutline } from '@mdi/js';


function NavBar() {
    return (
        <div className="nav-bar">
            <div className="button-group">
                <div className="pic">
                    <Icon path={mdiAccountOutline} size={1} />
                </div>
                <div className="prof-info">
                    <h3>Name</h3>
                </div>
            </div>
            <div className="button-group">
                <Icon path={mdiViewDashboardOutline} size={1} />
                <h3>Dashboard</h3>
            </div>
            <div className="button-group">
                <Icon path={mdiCashFast } size={1} />
                <h3>Balance Items</h3>
            </div>
            <div className="button-group">
                <Icon path={mdiCashFast } size={1} />
                <h3>Ad</h3>
            </div>
        </div>
    )
}

export default NavBar;