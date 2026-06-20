import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DowntimeTable from "../../components/downtime/DowntimeTable";
import DowntimeModal from "../../components/downtime/DowntimeModal";

import { getPendingDowntimes } from "../../api/downtime.api";
import { getMachines } from "../../api/machine.api";

function Downtime() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [downtimes, setDowntimes] = useState([]);

    const [machines, setMachines] = useState([]);

    const [selectedDowntime, setSelectedDowntime] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {

        try {

            setLoading(true);

            const today = new Date().toISOString().split("T")[0];

            const [downtimeRes, machineRes] = await Promise.all([
                getPendingDowntimes(today),
                getMachines()
            ]);
            setDowntimes(downtimeRes.data.result);

            setMachines(machineRes.data.result);

        }
        catch(err){

            console.error(err);

        }
        finally{

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchData();

    }, []);

    const handleComplete = (downtime) => {

        setSelectedDowntime(downtime);

        setShowModal(true);

    };

    const handleSuccess = () => {

        setShowModal(false);

        fetchData();

    };

    if(loading){

        return <h2>Loading...</h2>;

    }

    return(

        <div style={{padding:"30px"}}>

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    marginBottom:"30px"
                }}
            >

                <h2>Pending Downtimes</h2>

                <button>
                    Logout
                </button>

            </div>

            <DowntimeTable
                downtimes={downtimes}
                onComplete={handleComplete}
            />

            {
                showModal &&
                <DowntimeModal
                    downtime={selectedDowntime}
                    machines={machines}
                    onClose={()=>setShowModal(false)}
                    onSuccess={handleSuccess}
                />
            }

            <button
                style={{marginTop:"30px"}}
                onClick={()=>navigate("/dashboard")}
            >
                Back
            </button>

        </div>

    );

}

export default Downtime;