import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaGem, FaTools } from 'react-icons/fa';
import logo from "/src/assets/Group 7.png";

const Sidebar = () => {
  return (
    <div className="w-[20%] bg-[#f5e8d7] p-5 min-h-screen">
      <div className="flex justify-center mb-10">
        <img src={logo} alt="" className="md:w-[15vh] xl:w-[30vh]" />
      </div>
      <nav className="flex flex-col gap-5 text-[#00000080] text-[0.8rem] justify-center ">
        <Link to="/admin/" className="hover:bg-[#fff9f5] px-4 py-2 rounded-3xl">
          <FaHome className="inline-block mr-2" />
          Dashboard
        </Link>
        <Link to="/admin/orders" className="hover:bg-[#fff9f5] px-4 py-2 rounded-3xl">
          <FaShoppingCart className="inline-block mr-2" />
          Orders
        </Link>
        <Link to="/admin/cad" className="hover:bg-[#fff9f5] px-4 py-2 rounded-3xl">
          <FaGem className="inline-block mr-2" />
          CAD Modelling Status
        </Link>
        <Link to="/admin/manufacturing" className="hover:bg-[#fff9f5] px-4 py-2 rounded-3xl">
          <FaTools className="inline-block mr-2" />
          Manufacturing
        </Link>
        <Link to="/" className="hover:bg-[#fff9f5] px-4 py-2 rounded-3xl">
          <FaHome className="inline-block mr-2" />
          Home
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

