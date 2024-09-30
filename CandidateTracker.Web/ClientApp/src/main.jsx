import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import Layout from './Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddCandidate from './AddCandidate'
import { StatusCountContextComponent } from './StatusCountContext'
import Pending from './Pending'
import Confirmed from './Confirmed'
import Refused from './Refused'
import ViewDetails from './ViewDetails'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StatusCountContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/addcandidate' element={<AddCandidate />} />
                    <Route exact path='/pending' element={<Pending />} />
                    <Route exact path='/confirmed' element={<Confirmed />} />
                    <Route exact path='/refused' element={<Refused />} />
                    <Route exact path='/viewdetails/:id' element={<ViewDetails />} />
                </Routes>
            </Layout>
        </StatusCountContextComponent>
    </BrowserRouter>
)
