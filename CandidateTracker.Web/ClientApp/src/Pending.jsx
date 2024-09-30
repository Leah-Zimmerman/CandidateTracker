import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Pending = () => {

    const [pendingCandidates, setPendingCandidates] = useState([]);

    const getPendingCandidates = async () => {
        const { data } = await axios.get('/api/candidates/getPendingCandidates');
        setPendingCandidates(data);
    }

    useEffect(() => {
        getPendingCandidates();
    }, [])


    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingCandidates.map((pc) =>(
                        <tr key={pc.id}>
                            <td>
                                <Link to={`/viewdetails/${pc.id}`}>View Details</Link>
                            </td>
                            <td>{pc.firstName}</td>
                            <td>{pc.lastName}</td>
                            <td>{pc.phoneNumber}</td>
                            <td>{pc.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Pending;