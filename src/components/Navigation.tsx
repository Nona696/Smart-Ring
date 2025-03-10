
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Footprints, Moon, Heart, Activity } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, color, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center px-2 py-1 relative ${
        isActive ? 'tab-active' : 'opacity-70'
      }`}
    >
      <div 
        className={`rounded-full p-2 transition-all duration-300 mb-1 ${
          isActive ? 'bg-white/10' : 'bg-transparent'
        }`}
        style={{ color: isActive ? color : 'currentColor' }}
      >
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
      <div className="tab-indicator" style={{ backgroundColor: color }}></div>
    </Link>
  );
};

const Navigation: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 z-50">
      <nav className="flex justify-around items-center p-2">
        <NavItem 
          to="/walking" 
          icon={<Footprints className="w-5 h-5" />} 
          label="Steps" 
          color="#0EA5E9" 
          isActive={pathname === '/walking' || pathname === '/'}
        />
        <NavItem 
          to="/sleep" 
          icon={<Moon className="w-5 h-5" />} 
          label="Sleep" 
          color="#8B5CF6" 
          isActive={pathname === '/sleep'}
        />
        <NavItem 
          to="/heart-rate" 
          icon={<Heart className="w-5 h-5" />} 
          label="Heart Rate" 
          color="#EF4444" 
          isActive={pathname === '/heart-rate'}
        />
        <NavItem 
          to="/blood-oxygen" 
          icon={<Activity className="w-5 h-5" />} 
          label="Blood Oxygen" 
          color="#06B6D4" 
          isActive={pathname === '/blood-oxygen'}
        />
      </nav>
    </div>
  );
};

export default Navigation;
