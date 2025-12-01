import React, { useState } from 'react';
import { Search, Star, Filter, Heart, ShoppingCart, Plus, Minus, Trash2, CreditCard, Truck, CheckCircle, ArrowLeft, ShieldCheck, User, Package, MapPin, Settings, Bell, Moon, Lock, LogOut, RefreshCw, Smartphone, Globe, Flag } from 'lucide-react';
import { GlassCard, GlassButton, GlassInput, Badge, GlassSelect } from '../components/GlassUI';
import { Product, CartItem, User as UserType } from '../types';
import { MOCK_ORDERS } from '../constants';

interface BuyerProps {
  view: string;
  cart: CartItem[];
  products: Product[];
  user: UserType | null;
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  onNavigate: (view: string) => void;
  clearCart: () => void;
  onNotify: (userId: string, message: string, type: 'order' | 'system' | 'alert') => void;
}

export const BuyerPages: React.FC<BuyerProps> = ({ 
  view, 
  cart, 
  products, 
  user,
  addToCart, 
  removeFromCart, 
  updateQuantity,
  onNavigate,
  clearCart,
  onNotify
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState('overview');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || p.category === categoryFilter)
  );

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      
      // Notify Sellers
      const sellersMap = new Map<string, string[]>();
      cart.forEach(item => {
        const items = sellersMap.get(item.sellerId) || [];
        items.push(`${item.quantity}x ${item.name}`);
        sellersMap.set(item.sellerId, items);
      });

      sellersMap.forEach((items, sellerId) => {
        onNotify(sellerId, `New Order Received: ${items.join(', ')}`, 'order');
      });

      // Notify Buyer
      if (user) {
        onNotify(user.id, `Order successfully placed! Total: $${total.toFixed(2)}`, 'system');
      }

      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        onNavigate('home');
      }, 3000);
    }, 2000);
  };

  // --- Components for Buyer Views ---

  if (view === 'profile') {
    return (
      <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full md:w-80 flex flex-col gap-6">
             {/* Profile Snapshot */}
             <GlassCard className="p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-indigo-600/50 to-purple-600/50"></div>
                <div className="relative z-10 mt-6">
                  <div className="w-24 h-24 rounded-full p-1 bg-slate-900 mx-auto mb-3">
                    <img 
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-2 border-indigo-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{user?.name}</h3>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                  <div className="mt-3">
                     <Badge color="blue">Member</Badge>
                  </div>
                </div>
             </GlassCard>

             {/* Navigation Menu */}
             <GlassCard className="p-4">
                <nav className="space-y-1">
                   {[
                     { id: 'overview', label: 'Overview', icon: User },
                     { id: 'orders', label: 'My Orders', icon: Package },
                     { id: 'addresses', label: 'Addresses', icon: MapPin },
                     { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                     { id: 'wishlist', label: 'Wishlist', icon: Heart },
                     { id: 'security', label: 'Security', icon: ShieldCheck },
                     { id: 'preferences', label: 'Preferences', icon: Settings },
                   ].map(item => (
                     <button
                        key={item.id}
                        onClick={() => setActiveProfileTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeProfileTab === item.id ? 'bg-indigo-600/20 text-white shadow-sm border border-indigo-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                     >
                        <item.icon size={18} />
                        <span className="font-medium">{item.label}</span>
                     </button>
                   ))}
                </nav>
                <div className="h-[1px] bg-white/10 my-4"></div>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
                   <LogOut size={18} />
                   <span className="font-medium">Sign Out</span>
                </button>
             </GlassCard>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 w-full space-y-6">
             
             {/* OVERVIEW TAB */}
             {activeProfileTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in">
                   <h2 className="text-2xl font-bold">Account Overview</h2>
                   
                   {/* Personal Details */}
                   <GlassCard className="p-6">
                      <div className="flex justify-between items-center mb-6">
                         <h3 className="font-bold text-lg">Personal Information</h3>
                         <GlassButton size="sm" variant="ghost">Edit</GlassButton>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                         <div>
                            <label className="text-xs text-gray-400">Full Name</label>
                            <p className="font-medium text-lg">{user?.name}</p>
                         </div>
                         <div>
                            <label className="text-xs text-gray-400">Email Address</label>
                            <p className="font-medium text-lg">{user?.email}</p>
                         </div>
                         <div>
                            <label className="text-xs text-gray-400">Phone Number</label>
                            <p className="font-medium text-lg">+1 (555) 123-4567</p>
                         </div>
                         <div>
                            <label className="text-xs text-gray-400">Username</label>
                            <p className="font-medium text-lg">@alexbuyer</p>
                         </div>
                      </div>
                   </GlassCard>

                   {/* Active Orders Summary */}
                   <div className="grid md:grid-cols-2 gap-6">
                      <GlassCard className="p-6">
                         <div className="flex items-center gap-3 mb-4">
                            <Truck className="text-indigo-400" />
                            <h3 className="font-bold">Active Shipment</h3>
                         </div>
                         <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="flex justify-between mb-2">
                               <span className="text-sm font-mono text-gray-300">#ORD-7723</span>
                               <span className="text-sm text-indigo-300">In Transit</span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full mb-2">
                               <div className="bg-indigo-500 w-[60%] h-full rounded-full"></div>
                            </div>
                            <p className="text-xs text-gray-500">Estimated delivery: Oct 28</p>
                         </div>
                         <GlassButton variant="ghost" size="sm" className="w-full mt-2">Track Order</GlassButton>
                      </GlassCard>

                      <GlassCard className="p-6">
                         <div className="flex items-center gap-3 mb-4">
                            <Heart className="text-pink-400" />
                            <h3 className="font-bold">Wishlist Preview</h3>
                         </div>
                         <div className="flex gap-2">
                            {[1, 2, 3].map(i => (
                               <div key={i} className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                  <img src={`https://picsum.photos/100/100?random=${i}`} className="w-full h-full object-cover rounded-lg opacity-80" alt="" />
                               </div>
                            ))}
                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gray-400">
                               +5
                            </div>
                         </div>
                         <GlassButton variant="ghost" size="sm" className="w-full mt-2">View Wishlist</GlassButton>
                      </GlassCard>
                   </div>
                </div>
             )}

             {/* ORDERS TAB */}
             {activeProfileTab === 'orders' && (
                <div className="space-y-6 animate-in fade-in">
                   <h2 className="text-2xl font-bold">Order History</h2>
                   
                   <GlassCard>
                      <div className="p-4 border-b border-white/10 flex gap-4 overflow-x-auto">
                         {['All Orders', 'Processing', 'Shipped', 'Delivered', 'Returns'].map(filter => (
                            <button key={filter} className="px-4 py-2 rounded-full text-sm hover:bg-white/5 whitespace-nowrap transition-colors border border-transparent hover:border-white/10">
                               {filter}
                            </button>
                         ))}
                      </div>
                      <div className="divide-y divide-white/10">
                         {MOCK_ORDERS.map(order => (
                            <div key={order.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/5 transition-colors">
                               <div className="flex gap-4">
                                  <div className="p-3 bg-white/5 rounded-xl">
                                     <Package className="text-indigo-400" />
                                  </div>
                                  <div>
                                     <h4 className="font-bold text-lg">{order.id}</h4>
                                     <p className="text-gray-400 text-sm">Ordered on {order.date}</p>
                                     <div className="flex gap-2 mt-2">
                                        <Badge color={order.status === 'Delivered' ? 'green' : order.status === 'Shipped' ? 'blue' : 'yellow'}>{order.status}</Badge>
                                        <span className="text-xs text-gray-500 self-center">{order.items} items</span>
                                     </div>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className="text-xl font-bold">${order.total}</p>
                                  <div className="flex gap-2 mt-2">
                                     <GlassButton size="sm" variant="secondary">Invoice</GlassButton>
                                     <GlassButton size="sm" variant="primary">Track</GlassButton>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                   </GlassCard>
                </div>
             )}

             {/* ADDRESSES TAB */}
             {activeProfileTab === 'addresses' && (
                <div className="space-y-6 animate-in fade-in">
                   <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Saved Addresses</h2>
                      <GlassButton size="sm" icon={<Plus size={16}/>}>Add New</GlassButton>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-4">
                      {/* Default Address */}
                      <GlassCard className="p-6 border-indigo-500/50 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 bg-indigo-500 text-xs px-3 py-1 rounded-bl-xl font-bold">DEFAULT</div>
                         <div className="flex items-center gap-3 mb-4">
                            <MapPin className="text-indigo-400" />
                            <h3 className="font-bold">Home</h3>
                         </div>
                         <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            Alex Buyer<br/>
                            123 Future Boulevard, Apt 4B<br/>
                            Neo Tokyo Sector 7<br/>
                            Japan, 100-0001
                         </p>
                         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <GlassButton size="sm" variant="secondary">Edit</GlassButton>
                            <GlassButton size="sm" variant="ghost" className="text-red-400">Delete</GlassButton>
                         </div>
                      </GlassCard>

                      {/* Secondary Address */}
                      <GlassCard className="p-6 relative group">
                         <div className="flex items-center gap-3 mb-4">
                            <MapPin className="text-gray-400" />
                            <h3 className="font-bold">Office</h3>
                         </div>
                         <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            Lumina Corp<br/>
                            456 Tech Park, Building C<br/>
                            Silicon Valley, CA<br/>
                            USA, 94025
                         </p>
                         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <GlassButton size="sm" variant="secondary">Edit</GlassButton>
                            <GlassButton size="sm" variant="ghost" className="text-red-400">Delete</GlassButton>
                         </div>
                      </GlassCard>
                   </div>
                </div>
             )}

             {/* PREFERENCES TAB */}
             {activeProfileTab === 'preferences' && (
                <div className="space-y-6 animate-in fade-in">
                   <h2 className="text-2xl font-bold">Preferences</h2>
                   
                   <GlassCard className="p-6">
                      <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Bell size={20} className="text-indigo-400"/> Notifications</h3>
                      <div className="space-y-4">
                         {[
                           { label: 'Order Updates', desc: 'Receive emails about your order status' },
                           { label: 'Promotions', desc: 'Get news about exclusive deals and sales' },
                           { label: 'Security Alerts', desc: 'Get notified about login attempts' }
                         ].map((pref, i) => (
                           <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                              <div>
                                 <p className="font-medium">{pref.label}</p>
                                 <p className="text-xs text-gray-400">{pref.desc}</p>
                              </div>
                              <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </GlassCard>

                   <GlassCard className="p-6">
                      <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Globe size={20} className="text-emerald-400"/> Regional</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                         <GlassSelect label="Language" options={[{label: 'English (US)', value: 'en-US'}, {label: 'Spanish', value: 'es'}, {label: 'Japanese', value: 'jp'}]} />
                         <GlassSelect label="Currency" options={[{label: 'USD ($)', value: 'usd'}, {label: 'EUR (€)', value: 'eur'}, {label: 'BTC (₿)', value: 'btc'}]} />
                      </div>
                   </GlassCard>

                   <GlassCard className="p-6 border-red-500/20">
                      <h3 className="font-bold text-lg mb-6 text-red-400">Danger Zone</h3>
                      <div className="flex flex-col gap-4">
                         <div className="flex justify-between items-center">
                            <div>
                               <p className="font-medium">Deactivate Account</p>
                               <p className="text-xs text-gray-400">Temporarily disable your account</p>
                            </div>
                            <GlassButton variant="ghost">Deactivate</GlassButton>
                         </div>
                         <div className="flex justify-between items-center">
                            <div>
                               <p className="font-medium text-red-400">Delete Account</p>
                               <p className="text-xs text-gray-400">Permanently remove your data</p>
                            </div>
                            <GlassButton variant="danger">Delete</GlassButton>
                         </div>
                      </div>
                   </GlassCard>
                </div>
             )}

             {/* SECURITY TAB */}
             {activeProfileTab === 'security' && (
                <div className="space-y-6 animate-in fade-in">
                   <h2 className="text-2xl font-bold">Security Settings</h2>
                   
                   <GlassCard className="p-6">
                      <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                            <Lock className="text-indigo-400" />
                            <div>
                               <h3 className="font-bold">Password</h3>
                               <p className="text-xs text-gray-400">Last changed 3 months ago</p>
                            </div>
                         </div>
                         <GlassButton variant="secondary">Change Password</GlassButton>
                      </div>
                      <div className="h-[1px] bg-white/10 my-4"></div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Smartphone className="text-emerald-400" />
                            <div>
                               <h3 className="font-bold">Two-Factor Authentication</h3>
                               <p className="text-xs text-gray-400">Add an extra layer of security</p>
                            </div>
                         </div>
                         <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                             <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                         </div>
                      </div>
                   </GlassCard>

                   <GlassCard className="p-6">
                      <h3 className="font-bold mb-4">Login History</h3>
                      <div className="space-y-3">
                         {[
                            { device: 'MacBook Pro', loc: 'Tokyo, Japan', time: 'Active Now', icon: Globe },
                            { device: 'iPhone 13', loc: 'Tokyo, Japan', time: '2 hours ago', icon: Smartphone },
                         ].map((session, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                               <div className="flex items-center gap-3">
                                  <session.icon size={18} className="text-gray-400" />
                                  <div>
                                     <p className="font-medium">{session.device}</p>
                                     <p className="text-xs text-gray-500">{session.loc}</p>
                                  </div>
                               </div>
                               <span className="text-xs text-emerald-400 font-medium">{session.time}</span>
                            </div>
                         ))}
                      </div>
                   </GlassCard>
                </div>
             )}

             {/* Other tabs placeholder */}
             {(activeProfileTab === 'wishlist' || activeProfileTab === 'payment') && (
                <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
                   <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                      {activeProfileTab === 'wishlist' ? <Heart size={32} className="text-pink-400"/> : <CreditCard size={32} className="text-purple-400"/>}
                   </div>
                   <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
                   <p className="text-gray-400">This section is under construction.</p>
                </div>
             )}

          </div>
        </div>
      </div>
    );
  }

  if (view === 'lookbook') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
        <div className="flex items-center gap-4 mb-2">
            <button 
              onClick={() => onNavigate('home')} 
              className="p-3 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-3xl font-bold">Lumina Lookbook 2024</h2>
        </div>
        <p className="text-gray-300 max-w-2xl ml-14 -mt-4 mb-8">
          Explore the intersection of technology and lifestyle. Our curated collection defines the aesthetic of the future.
        </p>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <GlassCard className="break-inside-avoid overflow-hidden group relative h-[400px]">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Neon City" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-sm font-bold tracking-widest text-cyan-400 mb-1">COLLECTION 01</span>
                    <span className="text-2xl font-bold text-white">Retro Future</span>
                </div>
            </GlassCard>

            <GlassCard className="break-inside-avoid overflow-hidden group relative h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=1000" 
                  alt="Minimalist Tech" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                   <span className="text-sm font-bold tracking-widest text-purple-400 mb-1">COLLECTION 02</span>
                   <span className="text-2xl font-bold text-white">Smart Living</span>
                </div>
            </GlassCard>

            <GlassCard className="break-inside-avoid overflow-hidden group relative h-[350px]">
                <img 
                  src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=1000" 
                  alt="Digital Fashion" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-sm font-bold tracking-widest text-pink-400 mb-1">COLLECTION 03</span>
                    <span className="text-2xl font-bold text-white">Cyber Fashion</span>
                </div>
            </GlassCard>

             <GlassCard className="break-inside-avoid overflow-hidden group relative h-[450px]">
                <img 
                  src="https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&q=80&w=1000" 
                  alt="Workspace" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-sm font-bold tracking-widest text-emerald-400 mb-1">COLLECTION 04</span>
                    <span className="text-2xl font-bold text-white">Zen Workspace</span>
                </div>
            </GlassCard>
            
            <GlassCard className="break-inside-avoid overflow-hidden group relative h-[400px]">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000" 
                  alt="Food Tech" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-sm font-bold tracking-widest text-amber-400 mb-1">COLLECTION 05</span>
                    <span className="text-2xl font-bold text-white">Synthetic Gastronomy</span>
                </div>
            </GlassCard>
        </div>
      </div>
    );
  }

  if (view === 'checkout') {
    if (orderComplete) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in duration-500 text-center">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="text-emerald-400 w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md">
            Thank you for your purchase. Your order #LUM-{Math.floor(Math.random() * 10000)} is being processed and will be shipped shortly.
          </p>
          <GlassButton onClick={() => {
            clearCart();
            onNavigate('home');
            setOrderComplete(false);
          }}>
            Return to Home
          </GlassButton>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
        <button 
          onClick={() => onNavigate('cart')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Cart
        </button>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                  <Truck size={24} />
                </div>
                <h3 className="text-xl font-bold">Shipping Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassInput label="First Name" placeholder="Alex" defaultValue={user?.name.split(' ')[0] || ''} />
                <GlassInput label="Last Name" placeholder="Buyer" defaultValue={user?.name.split(' ')[1] || ''} />
                <GlassInput label="Email Address" placeholder="alex@example.com" type="email" className="md:col-span-2" defaultValue={user?.email || ''} />
                <GlassInput label="Address" placeholder="123 Future Street" className="md:col-span-2" />
                <GlassInput label="City" placeholder="Neo Tokyo" />
                <GlassInput label="Postal Code" placeholder="90210" />
                <GlassInput label="Country" placeholder="United States" className="md:col-span-2" />
              </div>
            </GlassCard>

            {/* Payment Info */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-xl font-bold">Payment Details</h3>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900 to-purple-900 border border-white/10 flex flex-col justify-between h-48 shadow-lg">
                  <div className="flex justify-between items-start">
                    <CreditCard className="text-white/50" />
                    <span className="text-white/80 font-mono">DEBIT</span>
                  </div>
                  <div className="font-mono text-2xl tracking-widest text-shadow">
                    •••• •••• •••• 4242
                  </div>
                  <div className="flex justify-between items-end text-sm text-white/70 font-mono">
                    <div>
                      <div className="text-[10px] uppercase">Card Holder</div>
                      <div>{user?.name.toUpperCase() || 'ALEX BUYER'}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase">Expires</div>
                      <div>12/25</div>
                    </div>
                  </div>
                </div>

                <GlassInput label="Card Number" placeholder="0000 0000 0000 0000" icon={<CreditCard size={16}/>} />
                <div className="grid grid-cols-2 gap-6">
                  <GlassInput label="Expiry Date" placeholder="MM/YY" />
                  <GlassInput label="CVC" placeholder="123" type="password" />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-white/5" />
                      <span className="absolute -top-1 -right-1 bg-gray-700 text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-gray-600">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">${item.price}</p>
                    </div>
                    <div className="text-sm font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-white/10">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-emerald-400">Free</span>
                </div>
                <div className="h-[1px] bg-white/10 my-2"></div>
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <GlassButton 
                className="w-full py-4 text-lg relative overflow-hidden" 
                variant="primary"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    Pay ${total.toFixed(2)}
                  </>
                )}
              </GlassButton>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                <ShieldCheck size={14} />
                <span>Secure SSL Encryption</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'cart') {
    return (
      <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-3xl font-bold mb-6">Shopping Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-gray-400">Looks like you haven't added anything yet.</p>
              <GlassButton variant="secondary" className="mt-6" onClick={() => onNavigate('home')}>Browse Products</GlassButton>
            </GlassCard>
          ) : (
            cart.map((item) => (
              <GlassCard key={item.id} className="p-4 flex gap-4 items-center group">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="font-bold text-xl text-indigo-300">${item.price}</div>
                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1 border border-white/10">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white/10 rounded-md transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white/10 rounded-md transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="h-[1px] bg-white/10 my-4"></div>
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <GlassButton 
                className="w-full py-4 text-lg" 
                variant="primary"
                onClick={() => onNavigate('checkout')}
              >
                Proceed to Checkout
              </GlassButton>
              <p className="text-xs text-gray-400 text-center mt-4">
                Secure checkout powered by Stripe
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    );
  }

  // Home / Browse View
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl h-[400px] flex items-center">
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/60 z-0"></div>
         <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 z-[-1]"
            alt="Hero"
         />
         <div className="relative z-10 px-10 md:px-16 max-w-2xl">
            <Badge color="blue">New Collection</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
              Future of <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Commerce</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-lg">
              Experience the next generation of shopping with curated premium items delivered instantly.
            </p>
            <div className="flex gap-4">
              <GlassButton size="lg" onClick={() => {
                const element = document.getElementById('products-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}>Shop Now</GlassButton>
              <GlassButton 
                size="lg" 
                variant="secondary"
                onClick={() => onNavigate('lookbook')}
              >
                View Lookbook
              </GlassButton>
            </div>
         </div>
      </div>

      {/* Filters & Search */}
      <div id="products-section" className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 z-30 py-4 backdrop-blur-md rounded-xl -mx-2 px-2">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          {['All', 'Electronics', 'Fashion', 'Home', 'Wearables', 'Food & Groceries'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border
                ${categoryFilter === cat 
                  ? 'bg-white text-indigo-900 border-white' 
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <GlassInput 
            placeholder="Search products..." 
            icon={<Search size={16} />} 
            className="w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <GlassButton variant="secondary" icon={<Filter size={16} />}>Filter</GlassButton>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map(product => (
          <GlassCard key={product.id} hoverEffect className="group flex flex-col h-full overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <button className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                <Heart size={18} />
              </button>
              {product.stock < 10 && (
                <div className="absolute top-3 left-3">
                   <Badge color="red">Low Stock</Badge>
                </div>
              )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg leading-tight truncate pr-2">{product.name}</h3>
                <div className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-md">
                  <Star size={12} fill="currentColor" />
                  <span>{product.rating}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-white">${product.price}</span>
                <GlassButton 
                  size="sm" 
                  onClick={() => addToCart(product)}
                  className="group-hover:bg-indigo-500 transition-colors"
                >
                  Add to Cart
                </GlassButton>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};