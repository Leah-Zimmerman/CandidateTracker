import { Link } from "react-router-dom";
import { StatusCountContextComponent } from "./StatusCountContext";
import { useCountContext } from "./StatusCountContext";

function Layout({ children }) {
    const {pendingCount} = useCountContext();
    const {confirmedCount} = useCountContext();
    const {refusedCount} = useCountContext();
    return <>
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand">Candidate Tracker</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link to='/' className="nav-link text-light">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/addcandidate' className="nav-link text-light">Add Candidate</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/pending' className="nav-link text-light">Pending ({pendingCount})</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/confirmed' className="nav-link text-light">Confirmed ({confirmedCount})</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/refused' className="nav-link text-light">Refused ({refusedCount})</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <div className="container">
            <main role="main">
                {children}
            </main>
        </div>
    </>
}

export default Layout;