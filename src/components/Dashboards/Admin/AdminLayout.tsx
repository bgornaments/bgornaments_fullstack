import { Routes, Route } from 'react-router-dom';
import Orders from './OrderPage';
import DashboardPage from './DashboardPage';
import Sidebar from './Sidebar';
import CADPage from './CADPage';


const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <main className="bg-[#fff9f5] min-h-screen px-14 ">
            <div className="p-16 "> </div>
          <Routes>
            <Route path="orders" element={<Orders />} />
            <Route path="" element={<DashboardPage />} />
            <Route path="cad" element={<CADPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
