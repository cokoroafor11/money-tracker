import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Transaction from "./Transaction";
import Login from './Login';
import SignUp from "./SignUp";
import Home from "./Home";
import Budget from "./Budget";

/**
 * Function to set up routes for application:
 * dashboard, transaction and budget protected
 * @param {Object} param0 object containing isAuthenticated flag for conditional routing
 * @param {boolean} param0.isAuthenticated Flag to indicate if user is currently authenticated
 * @returns {JSX.Element} All components set up with routes
 */
function AppRouter({ isAuthenticated }) {
    
    return (
            
        <Routes>
            {/* Unprotected routes */}
            <Route exact path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>

            {/* Conditional for redirect from protected routes */}
            {isAuthenticated ? (
            <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/budget" element={<Budget />} />
            </>
            ) : (
                <Route path="/unauthorized" element={<Navigate to="/"/>} />
            )}
        </Routes>
    )
}

export default AppRouter;