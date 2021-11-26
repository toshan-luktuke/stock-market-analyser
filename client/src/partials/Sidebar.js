import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, SearchIcon } from '../icons';

const Sidebar = () => {
  return (
    <aside className="font-ticker2">
      <div className="flex flex-col items-center h-screen overflow-hidden text-gray-400 bg-gray-900 w-44">
        <Link className="flex items-center w-full px-3 mt-3" to="/">
          <span className="ml-2 font-black text-2xl font-head text-gray-300 text-center">
            Stock Market Analyzer
          </span>
        </Link>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700 text-right">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              to="/"
            >
              <div className="w-8 h-8 fill-current">
                <HomeIcon />
              </div>
              <span className="ml-2 text-lg font-medium">Dashboard</span>
            </Link>
          </div>
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700 text-right">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              to="/"
            >
              <div className="w-8 h-8 fill-current">
                <SearchIcon />
              </div>
              <span className="ml-2 text-lg font-medium">Search</span>
            </Link>
          </div>
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700 text-right">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              to="/"
            >
              <svg
                className="w-8 h-8 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="ml-2 text-lg font-medium">Prediction</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
