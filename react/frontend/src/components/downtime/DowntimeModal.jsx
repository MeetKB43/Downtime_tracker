import { useEffect, useState } from "react";

import { getIssues } from "../../api/issue.api";
import { insertDowntime } from "../../api/downtime.api";
function DowntimeModal({

    downtime,

    machines,

    onClose,

    onSuccess

}){

    const [machine,setMachine]=useState("");

    const [issues,setIssues]=useState([]);

    const [issue,setIssue]=useState("");

    const [operator,setOperator]=useState("");

    const [comment,setComment]=useState("");

    useEffect(()=>{

        if(!machine) return;

        loadIssues();

    },[machine]);

    const loadIssues=async()=>{
        const res=await getIssues({machine_id: machine});
        console.log(res.data.result)
        setIssues(res.data.result);

    };

    const submit=async()=>{

        const data = {

            dt_id: downtime.dt_id,

            machine_id: machine,

            issue_id: issue,

            operator: operator,

            comments: comment

        };

        // later call update API here
        const res = await insertDowntime(data)
        console.log(res)
        onSuccess();

    };

    return(

        <div style={overlay}>

            <div style={modal}>

                <h2>Complete Downtime</h2>

                <label>Machine</label>

                <select
                    value={machine}
                    onChange={(e)=>setMachine(e.target.value)}
                >

                    <option value="">Select Machine</option>

                    {
                        machines.map(machine=>(

                            <option
                                key={machine.machine_id}
                                value={machine.machine_id}
                            >
                                {machine.machine_type}
                            </option>

                        ))
                    }

                </select>

                <br/><br/>

                <label>Issue</label>

                <select
                    value={issue}
                    onChange={(e)=>setIssue(e.target.value)}
                >

                    <option value="">Select Issue</option>

                    {
                        issues.map(issue=>(

                            <option
                                key={issue.issue_id}
                                value={issue.issue_id}
                            >
                                {issue.issue}
                            </option>

                        ))
                    }

                </select>

                <br/><br/>

                <input
                    placeholder="Operator"
                    value={operator}
                    onChange={(e)=>setOperator(e.target.value)}
                />

                <br/><br/>

                <textarea
                    placeholder="Comment (optional)"
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                />

                <br/><br/>

                <button onClick={submit}>
                    Submit
                </button>

                <button onClick={onClose}>
                    Cancel
                </button>

            </div>

        </div>

    );

}

const overlay={
    position:"fixed",
    top:0,
    left:0,
    right:0,
    bottom:0,
    background:"rgba(0,0,0,.4)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
};

const modal={
    background:"#fff",
    padding:"25px",
    borderRadius:"8px",
    width:"450px"
};

export default DowntimeModal;