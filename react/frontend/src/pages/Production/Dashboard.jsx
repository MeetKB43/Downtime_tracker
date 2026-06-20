import { useEffect, useState } from "react";
import {
    getProductionDetails,
    saveProduction,
    updateProduction
} from "../../api/production.api";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth.api";

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [production, setProduction] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [sku, setSku] = useState("");
    const [jobNumber, setJobNumber] = useState("");
    const [operator, setOperator] = useState("Filler");

    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0];
    

    const fetchData = async () => {
        try {
            
            setLoading(true);
            console.log(today)
            const res = await getProductionDetails({"Date":today});
            
            if (res.data.result) {
                setProduction(res.data.result);
                setSku(res.data.result.sku);
                setJobNumber(res.data.result.job_number);
            } else {
                setEditMode(true);
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {
        try {
            await saveProduction({
                Date: today,
                sku: sku,
                job_number: jobNumber
            });

            setEditMode(false);
            fetchData();

        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async () => {
        try {
            await updateProduction({
                Date: today,
                sku: sku,
                job_number: jobNumber
            });

            setEditMode(false);
            fetchData();

        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div style={{ padding: "20px" }}>

            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Dashboard</h2>

                <button
                    onClick={async () => {
                        localStorage.clear();
                        await logoutUser();
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </div>

            <hr />

            {/* PRODUCTION SECTION */}
            <h3>Today's Production</h3>

            {!production || editMode ? (
                <div>
                    <input
                        placeholder="SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />

                    <input
                        placeholder="Job Number"
                        value={jobNumber}
                        onChange={(e) => setJobNumber(e.target.value)}
                    />

                    {production ? (
                        <button onClick={handleUpdate}>Update</button>
                    ) : (
                        <button onClick={handleSave}>Save</button>
                    )}
                </div>
            ) : (
                <div>
                    <p>SKU: {production.sku}</p>
                    <p>Job Number: {production.job_number}</p>

                    <button onClick={() => setEditMode(true)}>
                        Modify
                    </button>
                </div>
            )}

            {/* DOWNTIME BUTTON */}
            <div style={{ marginTop: "40px" }}>
                <button
                    onClick={() => navigate("/downtime")}
                    style={{
                        padding: "10px 20px",
                        background: "black",
                        color: "white"
                    }}
                >
                    Downtimes
                </button>
            </div>

        </div>
    );
}

export default Dashboard;