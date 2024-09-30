import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Refused = () => {

    const [refusedCandidates, setRefusedCandidates] = useState([]);
    const [toggleNotes,setToggleNotes] = useState(false);

    const getRefusedCandidates = async () => {
        const { data } = await axios.get('/api/candidates/getRefusedCandidates');
        setRefusedCandidates(data);
    }

    useEffect(() => {
        getRefusedCandidates();
    }, [])


    return (
        <>
           <h2>Refused</h2>
           <div>
            <button className="btn btn-success" onClick={()=>setToggleNotes(!toggleNotes)}>Toggle Notes</button>
           </div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        {!toggleNotes&&<th>Notes</th>}
                    </tr>
                </thead>
                <tbody>
                    {refusedCandidates.length>0 && refusedCandidates.map((cc) =>(
                        <tr key={cc.id}>
                            <td>{cc.firstName}</td>
                            <td>{cc.lastName}</td>
                            <td>{cc.phoneNumber}</td>
                            <td>{cc.email}</td>
                            {!toggleNotes&&<td>{cc.notes && cc.notes.length?cc.notes:'N/A'}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Refused;