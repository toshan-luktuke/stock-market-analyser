import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Windmill } from '@windmill/react-ui';

import './assets/css/tailwind.output.css';
import App from './App';
import { SidebarProvider } from './context/SidebarContext';
import ThemedSuspense from './components/ThemedSuspense';

ReactDOM.render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill usePreferences>
        <App />
      </Windmill>
    </Suspense>
  </SidebarProvider>,
  document.getElementById('root'),
);
