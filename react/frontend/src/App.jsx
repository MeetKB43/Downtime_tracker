import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/Production/Dashboard";
import Production from "./pages/Production/Production";
import NotFound from "./pages/NotFound";


function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/production" element={<Production />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;