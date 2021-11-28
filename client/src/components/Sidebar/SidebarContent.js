import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import routes from '../../routes/sidebar';
import * as Icons from '../../icons';
import SidebarSubmenu from './SidebarSubmenu';

const Icon = ({ icon, ...props }) => {
  // eslint-disable-next-line no-shadow
  const Icon = Icons[icon];
  return <Icon {...props} />;
};

const SidebarContent = () => {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a
        className="ml-6 text-2xl font-black font-hand text-gray-800 dark:text-gray-200"
        href="/"
      >
        Stock Market Analyser
      </a>
      <ul className="mt-6">
        {/* eslint-disable */}
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={true}>
                  <span
                    className="absolute inset-y-0 left-0 w-2 dark:bg-green-500 rounded-tr-lg rounded-br-lg
                    bg-purple-500"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon
                  className="w-5 h-5 fill-current"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          ),
        )}
        {/* eslint-enable */}
      </ul>
    </div>
  );
};

export default SidebarContent;
