import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Transaction from "./Transaction";
import Login from './Login';
import SignUp from "./SignUp";
import Home from "./Home";
import Budget from "./Budget";

function AppRouter() {
    //Routes (dashboard and transaction protected )
    return (
            
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/transaction" element={<Transaction/>}/>
                <Route path="/budget" element={<Budget/>}/>
            </Routes>
    )
}

export default AppRouter;