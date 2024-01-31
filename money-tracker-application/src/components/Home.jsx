import AppRouter from './AppRouter';
import {Link} from 'react-router-dom';
import "../styles/Home.css"
function Home({onLogin}) {
    return (
        <>
        <div className="home">
          <h1>Welcome to the Expense Tracker</h1>
          <p>Login if you've already created an account, or sign up below</p>
          <div className="button-group">
            <Link to="/login">
              <button type="button">Login</button>
            </Link>
            <Link to="/signup">
              <button type="button">Sign Up</button>
            </Link>
          </div>
        </div>

      </>
    )
}

export default Home;