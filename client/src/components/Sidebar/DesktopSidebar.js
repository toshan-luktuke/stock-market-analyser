import React from 'react';

import SidebarContent from './SidebarContent';

const DesktopSidebar = () => {
  return (
    <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-gray-200 dark:bg-gray-700 lg:block">
      <SidebarContent />
    </aside>
  );
};

export default DesktopSidebar;
