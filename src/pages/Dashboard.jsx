import React, {useContext} from 'react';
import {AuthContext} from "../providers/AuthProvider.jsx";
import SelectedClasses from "../components/Students/SelectedClasses.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <Footer/>
        </div>
    );
};

export default Dashboard;