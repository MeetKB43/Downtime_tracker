import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                await api.get("/auth/me");
                setAuthenticated(true);
            } catch (err) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;