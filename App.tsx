import React, { useState, useEffect } from 'react';
import { Home, ShoppingBag, User as UserIcon, LayoutDashboard, Package, Users, ShoppingCart, DollarSign, AlertTriangle, ShieldCheck, Eye } from 'lucide-react';
import { Layout } from './components/Layout';
import { AuthPage } from './pages/Auth';
import { BuyerPages } from './pages/Buyer';
import { SellerPages } from './pages/Seller';
import { AdminPages } from './pages/Admin';
import { GlassModal } from './components/GlassUI';
import { User, Role, CartItem, Product, NavItem, Notification } from './types';
import { USERS as INITIAL_USERS, MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  // Global State
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Navigation State
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Auth Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Reset view when role changes
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === Role.SELLER) setCurrentView('dashboard');
      else if (currentUser.role === Role.ADMIN) setCurrentView('dashboard');
      else setCurrentView('home');
      setIsAuthOpen(false); // Close auth modal on successful login
    } else {
      setCurrentView('home'); // Guest view
    }
  }, [currentUser]);

  // --- Actions ---

  const handleLogin = (email: string) => {
    // Admin override check first (mock)
    if (email === 'admin@lumina.com') {
      const admin = users.find(u => u.role === Role.ADMIN);
      if (admin) {
        setCurrentUser(admin);
        return;
      }
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
    } else {
      alert("User not found. Try the demo credentials.");
    }
  };

  const handleSignup = (name: string, email: string, role: Role) => {
    const existing = users.find(u => u.email === email);
    if (existing) {
      alert("Email already in use.");
      return;
    }
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const handleAddProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const addToCart = (product: Product) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addNotification = (userId: string, message: string, type: 'order' | 'system' | 'alert' = 'system') => {
    const newNotif: Notification = {
      id: `n-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Logic to determine Navigation Items based on Role
  const getNavItems = (): NavItem[] => {
    if (!currentUser) {
      // Guest Nav
      return [
        { label: 'Shop', icon: <Home size={18} />, view: 'home' },
        { label: 'Lookbook', icon: <Eye size={18} />, view: 'lookbook' },
      ];
    }

    switch (currentUser.role) {
      case Role.SELLER:
        return [
          { label: 'Dashboard', icon: <LayoutDashboard size={18} />, view: 'dashboard' },
          { label: 'Products', icon: <Package size={18} />, view: 'products' },
          // Removed Settings
        ];
      case Role.ADMIN:
        return [
          { label: 'Overview', icon: <LayoutDashboard size={18} />, view: 'dashboard' },
          { label: 'Users', icon: <Users size={18} />, view: 'users' },
          { label: 'Products', icon: <Package size={18} />, view: 'products' },
          { label: 'Orders', icon: <ShoppingCart size={18} />, view: 'orders' },
          { label: 'Finance', icon: <DollarSign size={18} />, view: 'finance' },
          { label: 'Disputes', icon: <AlertTriangle size={18} />, view: 'disputes' },
          { label: 'Security', icon: <ShieldCheck size={18} />, view: 'security' },
          // Removed Settings
        ];
      default: // BUYER
        return [
          { label: 'Shop', icon: <Home size={18} />, view: 'home' },
          { label: 'Lookbook', icon: <Eye size={18} />, view: 'lookbook' },
          { label: 'Profile', icon: <UserIcon size={18} />, view: 'profile' },
        ];
    }
  };

  // Filter notifications for current user
  const userNotifications = notifications.filter(n => n.userId === currentUser?.id);

  return (
    <>
      <Layout
        user={currentUser}
        onLogout={() => setCurrentUser(null)}
        onLoginClick={() => setIsAuthOpen(true)}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        currentView={currentView}
        onChangeView={setCurrentView}
        navItems={getNavItems()}
        notifications={userNotifications}
      >
        {/* Guest & Buyer View */}
        {(!currentUser || currentUser.role === Role.BUYER) && (
          <BuyerPages 
            view={currentView} 
            cart={cart}
            products={products}
            user={currentUser}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            onNavigate={setCurrentView}
            clearCart={clearCart}
            onNotify={addNotification}
          />
        )}
        
        {currentUser?.role === Role.SELLER && (
          <SellerPages 
            view={currentView} 
            products={products.filter(p => p.sellerId === 'current-seller' || p.sellerId === currentUser.id || p.sellerId.startsWith('s') || p.sellerId === 'u2')} 
            user={currentUser}
            onAddProduct={handleAddProduct}
          />
        )}

        {currentUser?.role === Role.ADMIN && (
          <AdminPages view={currentView} user={currentUser} />
        )}
      </Layout>

      {/* Auth Modal */}
      <GlassModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        title="Welcome to Lumina"
      >
        <AuthPage 
          onLogin={handleLogin} 
          onSignup={handleSignup} 
        />
      </GlassModal>
    </>
  );
};

export default App;