import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

const StatusCountContext = createContext();

const StatusCountContextComponent = ({ children }) => {
    const [pendingCount, setPendingCount] = useState(0);
    const [confirmedCount, setConfirmedCount] = useState(0);
    const [refusedCount, setRefusedCount] = useState(0);

    const refreshCounts = async () => {
        const { data } = await axios.get('/api/candidates/getCounts')
        setPendingCount(data.pendingCount);
        setConfirmedCount(data.confirmedCount);
        setRefusedCount(data.refusedCount);
    }

    useEffect(() => {
        refreshCounts();
    }, [])

    return (
        <>
            <StatusCountContext.Provider value={{ pendingCount, confirmedCount, refusedCount, refreshCounts }}>
                {children}
            </StatusCountContext.Provider>
        </>
    )
}
const useCountContext = () => {
    return useContext(StatusCountContext);
}

export { StatusCountContextComponent, useCountContext }