import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useCountContext } from "./StatusCountContext";

const ViewDetails = () => {

    const [candidate, setCandidate] = useState('');

    const { id } = useParams();
    const nav = useNavigate();
    const { refreshCounts } = useCountContext();

    const getCandidate = async () => {
        const { data } = await axios.get('/api/candidates/getCandidateById', { params: { id } })
        setCandidate(data);
    }

    useEffect(() => {
        getCandidate();
    }, [])

    const confirmCandidate = async () => {
        await axios.post('/api/candidates/confirmCandidate', { id });
        await getCandidate();
        await refreshCounts();
        nav(`/viewdetails/${id}`);
    }
    const refuseCandidate = async () => {
        await axios.post('/api/candidates/refuseCandidate', { id });
        await getCandidate();
        await refreshCounts();
        nav(`/viewdetails/${id}`);
    }

    const { firstName, lastName, email, phoneNumber, status, notes } = candidate;
    return (
        <>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h3>Name: {firstName} {lastName}</h3>
                        <h3>Email: {email}</h3>
                        <h3>Phone: {phoneNumber}</h3>
                        <h3>Status: {status}</h3>
                        <h3>Notes:
                            <h5 className="mt-3"> {notes && notes.length ? notes : 'N/A'}</h5>
                        </h3>
                        <div>
                            <button className="btn btn-primary" onClick={confirmCandidate}>Confirm</button>
                            <button className="btn btn-danger" onClick={refuseCandidate}>Refuse</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewDetails;