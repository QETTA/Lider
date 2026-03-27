import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Smartphone,
  FileText,
  MessageSquare,
  Users,
  Settings,
  Bell,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { path: '/dashboard', label: '대시보드', icon: LayoutDashboard },
  { path: '/mobile-entry', label: '현장 기록', icon: Smartphone },
  { path: '/documents', label: '평가 문서', icon: FileText },
  { path: '/consultation', label: '상담 기록', icon: MessageSquare },
  { path: '/elderly', label: '어르신 관리', icon: Users },
];

const bottomItems = [
  { path: '/alerts', label: '알림', icon: Bell, badge: 3 },
  { path: '/settings', label: '설정', icon: Settings },
];

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          {isOpen && (
            <div>
              <h1 className="font-bold text-gray-900">LIDER</h1>
              <p className="text-xs text-gray-500">LIDER</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Menu */}
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200">
        <ul className="space-y-1">
          {bottomItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <div className="relative">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                {isOpen && <span className="font-medium">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}