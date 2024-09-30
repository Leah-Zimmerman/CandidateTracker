import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Confirmed = () => {

    const [confirmedCandidates, setConfirmedCandidates] = useState([]);
    const [toggleNotes,setToggleNotes] = useState(false);

    const getConfirmedCandidates = async () => {
        const { data } = await axios.get('/api/candidates/getConfirmedCandidates');
        setConfirmedCandidates(data);
    }

    useEffect(() => {
        getConfirmedCandidates();
    }, [])


    return (
        <>
           <h2>Confirmed</h2>
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
                    {confirmedCandidates.length>0 && confirmedCandidates.map((cc) =>(
                        <tr key={cc.id}>
                            <td>{cc.firstName}</td>
                            <td>{cc.lastName}</td>
                            <td>{cc.phoneNumber}</td>
                            <td>{cc.email}</td>
                            {!toggleNotes&&<td>{cc.notes &&cc.notes.length?cc.notes:'N/A'}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Confirmed;