import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import Transaction from "./Transaction";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/transaction" element={<Transaction/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;