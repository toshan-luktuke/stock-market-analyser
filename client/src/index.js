import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Windmill } from '@windmill/react-ui'
import './index.css'
import App from './App'
import ThemedSuspense from './components/ThemedSuspense'
import { SidebarProvider } from './context/SidebarContext'

ReactDOM.render(
  <React.StrictMode>
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <Windmill usePreferences>
          <App />
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
