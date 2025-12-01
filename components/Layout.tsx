import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, ShoppingBag, LogOut, Search, User, X, LogIn, CheckCircle } from 'lucide-react';
import { User as UserType, Role, NavItem, Notification } from '../types';
import { GlassButton, GlassCard } from './GlassUI';

interface LayoutProps {
  children: React.ReactNode;
  user: UserType | null;
  onLogout: () => void;
  onLoginClick: () => void;
  cartCount?: number;
  currentView: string;
  onChangeView: (view: string) => void;
  navItems: NavItem[];
  notifications: Notification[];
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  onLogout, 
  onLoginClick,
  cartCount = 0, 
  currentView,
  onChangeView,
  navItems,
  notifications
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Click outside to close notification dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dynamic background based on role
  const getBgClass = () => {
    switch(user?.role) {
      case Role.SELLER: return "from-slate-900 via-purple-950 to-slate-900";
      case Role.ADMIN: return "from-slate-950 via-slate-900 to-indigo-950";
      default: return "from-indigo-950 via-purple-900 to-fuchsia-900"; // Buyer/Guest
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBgClass()} text-white overflow-x-hidden font-sans selection:bg-indigo-500/30`}>
      {/* Background Decor Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl">
            {/* Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onChangeView('home')}
              >
                <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <span className="font-bold text-white text-lg">L</span>
                </div>
                <span className="text-xl font-bold tracking-tight hidden sm:block">Lumina</span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => onChangeView(item.view)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2
                    ${currentView === item.view 
                      ? 'bg-white/15 text-white shadow-inner' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="relative" ref={notifRef}>
                    <button 
                      onClick={() => setIsNotifOpen(!isNotifOpen)}
                      className={`p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all relative ${isNotifOpen ? 'bg-white/10 text-white' : ''}`}
                    >
                      <Bell size={20} />
                      {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-gray-900 animate-pulse"></span>
                      )}
                    </button>

                    {/* Notification Dropdown */}
                    {isNotifOpen && (
                      <div className="absolute top-full right-0 mt-3 w-80 sm:w-96 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <GlassCard className="overflow-hidden border-white/20 shadow-2xl shadow-black/50 backdrop-blur-xl bg-slate-900/90">
                           <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                              <h3 className="font-bold">Notifications</h3>
                              {unreadCount > 0 && <span className="text-xs bg-indigo-500 px-2 py-0.5 rounded-full">{unreadCount} New</span>}
                           </div>
                           <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                              {notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                   <Bell size={24} className="mx-auto mb-2 opacity-30" />
                                   <p className="text-sm">No new notifications</p>
                                </div>
                              ) : (
                                notifications.map((notif) => (
                                  <div key={notif.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors flex gap-3">
                                    <div className={`mt-1 p-1.5 rounded-full flex-shrink-0 ${notif.type === 'order' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                       {notif.type === 'order' ? <ShoppingBag size={14} /> : <Bell size={14} />}
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-200 leading-snug">{notif.message}</p>
                                      <p className="text-[10px] text-gray-500 mt-1">{new Date(notif.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                  </div>
                                ))
                              )}
                           </div>
                           {notifications.length > 0 && (
                             <div className="p-2 bg-white/5 border-t border-white/10 text-center">
                               <button className="text-xs text-indigo-300 hover:text-white transition-colors">Mark all as read</button>
                             </div>
                           )}
                        </GlassCard>
                      </div>
                    )}
                  </div>
                  
                  {user.role === Role.BUYER && (
                    <button 
                      onClick={() => onChangeView('cart')}
                      className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all relative"
                    >
                      <ShoppingBag size={20} />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-slate-900">
                          {cartCount}
                        </span>
                      )}
                    </button>
                  )}

                  <div className="h-8 w-[1px] bg-white/10 mx-1"></div>

                  <div className="flex items-center gap-3 pl-1">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-sm font-medium leading-none">{user.name}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{user.role}</span>
                    </div>
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                      alt="Profile" 
                      className="w-9 h-9 rounded-full border-2 border-white/20 shadow-md cursor-pointer"
                      onClick={() => onChangeView('profile')}
                    />
                    <button 
                      onClick={onLogout}
                      className="p-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-xl transition-all ml-1"
                      title="Logout"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <GlassButton 
                  onClick={onLoginClick}
                  variant="primary"
                  size="sm"
                  icon={<LogIn size={16} />}
                >
                  Sign In
                </GlassButton>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xl md:hidden pt-24 px-6">
          <div className="flex flex-col gap-2">
             {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    onChangeView(item.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 flex items-center gap-4
                    ${currentView === item.view 
                      ? 'bg-indigo-600/30 text-white border border-indigo-500/30' 
                      : 'text-gray-300 border border-transparent hover:bg-white/5'}
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              
              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-4 rounded-xl text-lg font-medium text-red-300 hover:bg-red-500/10 border border-transparent flex items-center gap-4 mt-4"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-4 rounded-xl text-lg font-medium text-white bg-indigo-600 border border-transparent flex items-center gap-4 mt-4 justify-center"
                >
                  <LogIn size={20} />
                  Sign In
                </button>
              )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto min-h-screen z-10 relative">
        {children}
      </main>
    </div>
  );
};