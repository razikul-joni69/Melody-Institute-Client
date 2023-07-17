import { useContext } from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar.jsx";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
    return (
        <div>
            <Sidebar />
        </div>
    );
};

export default Dashboard;
