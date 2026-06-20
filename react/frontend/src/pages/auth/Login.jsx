import { useState, useEffect } from "react";
import { loginUser } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [role, setRole] = useState("Filler");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data =  await loginUser({ "role" :role,"password": password });

            console.log("Login success:", data);

            // redirect after login
            navigate("/dashboard");

        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            alert("Login failed");
        } finally {
            setLoading(false);
        }
    };

    const [error, setError] = useState("");

    useEffect(() => {

        const msg = localStorage.getItem("auth_error");

        if (msg) {
            setError(msg);
            localStorage.removeItem("auth_error");
        }

    }, []);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                await api.get("/auth/me");
                navigate("/dashboard");
            } catch {
                // Not logged in, stay on login page
            }
        };

        checkLogin();
    }, []);

    return (
        <div style={styles.container}>
            {error && (
                <p style={{ color: "red", alignContent:top }}>
                    {error}
                </p>
            )}
            <form style={styles.card} onSubmit={handleSubmit}>

                <h2>Downtime Tracker Login</h2>

                {/* Role Dropdown */}
                <label>Role</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={styles.input}
                >
                    <option value="Filler">Filler</option>
                    <option value="Labeler">Labeler</option>
                </select>

                {/* Password */}
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    placeholder="Enter password"
                />

                {/* Submit */}
                <button type="submit" style={styles.button}>
                    Login
                </button>

            </form>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "30px",
        width: "300px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    input: {
        padding: "10px",
        fontSize: "14px",
        alignText: "center"
    },
    button: {
        marginTop: "10px",
        padding: "10px",
        background: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer"
    }
};

export default Login;