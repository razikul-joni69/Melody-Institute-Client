import  {useContext} from 'react';
import {AuthContext} from "../providers/AuthProvider.jsx";
import Sidebar from '../components/Dashboard/Sidebar/Sidebar.jsx';

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <Sidebar/>
        </div>
    );
};

export default Dashboard;