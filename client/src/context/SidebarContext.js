import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

export const SidebarContext = React.createContext()

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  const value = useMemo(() => {
    return {
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    }
  }, [isSidebarOpen])

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
