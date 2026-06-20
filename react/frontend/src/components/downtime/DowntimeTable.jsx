function DowntimeTable({ downtimes, onComplete }) {

    if(downtimes.length===0){

        return(
            <h3>No pending downtimes.</h3>
        );

    }

    return(

        <table
            border="1"
            cellPadding="10"
            width="100%"
        >

            <thead>

                <tr>

                    <th>Start</th>

                    <th>End</th>

                    <th>Duration</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {
                    downtimes.map(dt=>(

                        <tr key={dt.dt_id}>

                            <td>{dt.start_time}</td>

                            <td>{dt.end_time}</td>

                            <td>{dt.duration_minutes}</td>

                            <td>

                                <button
                                    onClick={()=>onComplete(dt)}
                                >
                                    Complete
                                </button>

                            </td>

                        </tr>

                    ))
                }

            </tbody>

        </table>

    );

}

export default DowntimeTable;