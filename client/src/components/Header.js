import React, { useContext } from 'react';
import { WindmillContext } from '@windmill/react-ui';

import { SidebarContext } from '../context/SidebarContext';
import { MoonIcon, SunIcon, MenuIcon } from '../icons';

const Header = () => {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);

  return (
    <header className="z-40 py-4 bg-gray-200 shadow-bottom dark:bg-gray-700">
      <div className="container flex justify-between items-center lg:justify-end h-full px-6 mx-auto text-purple-600 dark:text-green-500 lg:dark:text-orange-200">
        <button
          type="button"
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-green"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <div>
          <span className="lg:hidden font-black text-2xl font-hand">
            Stock Market Analyser
          </span>
        </div>
        <ul className="flex flex-row justify-end items-center flex-shrink-0 space-x-6 dark:text-orange-200">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              type="button"
              className="rounded-md focus:bg-transparent focus:outline-none hover:bg-transparent"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-6 h-6" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
