import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/Production/Dashboard";
import Production from "./pages/Production/Production";
import Downtime from "./pages/Downtime/Downtime";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectRoute";


function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>} />
            <Route path="/production" element={
                <ProtectedRoute>
                    <Production />
                </ProtectedRoute>} />
            <Route path="/downtime" element={
                <ProtectedRoute>
                    <Downtime />
                </ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;