import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Sidebar/Sidebar'

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout 