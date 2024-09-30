import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useCountContext } from "./StatusCountContext";

const AddCandidate = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [notes, setNotes] = useState('');

    const {refreshCounts} = useCountContext();
    const nav = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const candidateData={
            firstName,
            lastName,
            email,
            phoneNumber,
            notes
        }
        await axios.post('/api/candidates/addcandidate',candidateData);
        await refreshCounts();
        nav('/');
    }

    return (
        <>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h4>Add Candidate</h4>
                        <form onSubmit={handleSubmit}>
                            <input className="form-control" type="text" name="firstName" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                            <br/>
                            <input className="form-control" type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}></input>
                            <br/>
                            <input className="form-control" type="text" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
                            <br/>
                            <input className="form-control" type="text" name="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}></input>
                            <br/>
                            <textarea rows={5} className="form-control" type="text" name="notes" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                            <br/>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddCandidate;