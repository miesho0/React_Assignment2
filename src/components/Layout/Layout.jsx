import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import logo from '../../assets/images/logo-BfNap0Pe.png';

export default function Layout() {
  const links = [
    { name: "Meals", path: "/" },
    { name: "Ingrediant", path: "/Ingrediant" },
    { name: "Area", path: "/Area" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <aside className="bg-gray-50 h-full px-2 w-[242px]">
          <img src={logo}  className="w-full py-5 pt-3" alt="logo" />
          <div className="links flex flex-col space-y-2 gap-2">
            {links.map((link) => (
              <NavLink key={link.path} to={link.path} end={link.path === "/"}
                className={({ isActive }) => `py-1.5 text-center p-2 rounded-lg transition-all ${isActive
                  ? "bg-[#F29724] text-white shadow-orange-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-50 text-lg font-semibold"
                  : "bg-transparent text-gray-700 border-gray-300 rounded-xl border hover:scale-105 hover:shadow-xl transition-all"}`}>{link.name}
              </NavLink>))}
          </div></aside>
        <div className="bg-neutral-100 w-full px-8 py-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#ff6600] via-[#ff3366] to-[#cc0033] bg-clip-text text-transparent drop-shadow-md">
            Learn, Cook, Eat Your Food</h1>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
