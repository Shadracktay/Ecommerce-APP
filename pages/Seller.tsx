import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Package, DollarSign, TrendingUp, Users, MoreHorizontal, Plus, Upload, Image as ImageIcon, X, User, Bell, CheckCircle, Save, Store, CreditCard, Shield, Settings, FileText, AlertTriangle, Briefcase, Lock, LogOut, Search } from 'lucide-react';
import { GlassCard, GlassButton, Badge, GlassModal, GlassInput, GlassSelect } from '../components/GlassUI';
import { MOCK_ORDERS } from '../constants';
import { Product, User as UserType } from '../types';

// Mock Chart Data
const SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const MOCK_PAYOUT_HISTORY = [
  { id: 'TX-9921', date: 'Oct 24, 2023', amount: 2300.00, status: 'Processing' },
  { id: 'TX-8821', date: 'Oct 15, 2023', amount: 4250.00, status: 'Completed' },
  { id: 'TX-8820', date: 'Oct 01, 2023', amount: 3100.50, status: 'Completed' },
  { id: 'TX-8819', date: 'Sep 15, 2023', amount: 2800.00, status: 'Completed' },
  { id: 'TX-8818', date: 'Sep 01, 2023', amount: 1500.00, status: 'Completed' },
  { id: 'TX-8750', date: 'Aug 15, 2023', amount: 5200.25, status: 'Completed' },
];

interface SellerProps {
  view: string;
  products: Product[];
  user: UserType | null;
  onAddProduct: (p: Product) => void;
}

export const SellerPages: React.FC<SellerProps> = ({ view, products, user, onAddProduct }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeProfileSection, setActiveProfileSection] = useState('store');
  const [isDragging, setIsDragging] = useState(false);
  
  // Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Electronics',
    stock: '',
    description: '',
    image: ''
  });

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price) || 0,
      category: newProduct.category,
      stock: parseInt(newProduct.stock) || 0,
      description: newProduct.description,
      image: newProduct.image || `https://picsum.photos/400/400?random=${Date.now()}`,
      rating: 0,
      reviews: 0,
      sellerId: user?.id || 'current-seller'
    };
    onAddProduct(product);
    setIsAddModalOpen(false);
    setNewProduct({ name: '', price: '', category: 'Electronics', stock: '', description: '', image: '' });
  };

  // Helper to simulate status for demo purposes
  const getProductStatus = (product: Product) => {
    // Deterministic pseudo-random status based on ID char code
    const val = product.id.charCodeAt(product.id.length - 1);
    if (val % 5 === 0) return 'Rejected';
    if (val % 3 === 0) return 'Pending';
    return 'Approved';
  };

  if (view === 'profile' || view === 'settings') {
    return (
      <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Banner */}
        <div className="h-48 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 relative overflow-hidden mb-8 shadow-2xl">
           <img src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover mix-blend-overlay opacity-30" alt="Store Banner"/>
           <div className="absolute bottom-6 left-8 flex items-end gap-6">
              <div className="w-24 h-24 rounded-2xl border-4 border-slate-900 bg-slate-800 shadow-xl overflow-hidden">
                 <img src={user?.avatar} className="w-full h-full object-cover" alt="Store Logo"/>
              </div>
              <div className="mb-2">
                 <h1 className="text-3xl font-bold text-white shadow-sm">{user?.name}'s Tech Store</h1>
                 <p className="text-indigo-200">Premium Electronics & Gadgets</p>
              </div>
           </div>
           <div className="absolute top-4 right-4">
              <Badge color="green">Verified Seller</Badge>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar */}
           <div className="w-full lg:w-72 flex flex-col gap-4">
              <GlassCard className="p-2">
                 {[
                   { id: 'store', label: 'Store Information', icon: Store },
                   { id: 'kyc', label: 'Verification (KYC)', icon: FileText },
                   { id: 'financial', label: 'Financials', icon: DollarSign },
                   { id: 'inventory', label: 'Inventory & Products', icon: Package },
                   { id: 'security', label: 'Security & Access', icon: Shield },
                 ].map(item => (
                   <button
                     key={item.id}
                     onClick={() => setActiveProfileSection(item.id)}
                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${activeProfileSection === item.id ? 'bg-indigo-600/20 text-white shadow-sm border border-indigo-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                   >
                     <item.icon size={18} />
                     <span className="font-medium">{item.label}</span>
                   </button>
                 ))}
                 <div className="h-[1px] bg-white/10 my-2 mx-2"></div>
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
                    <LogOut size={18} />
                    <span className="font-medium">Sign Out</span>
                 </button>
              </GlassCard>

              {/* Quick Stats Widget */}
              <GlassCard className="p-4 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
                 <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">Store Health</h4>
                 <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                       <span className="text-gray-300">Rating</span>
                       <span className="text-yellow-400 font-bold flex items-center gap-1">4.8 <span className="text-xs text-gray-500">/ 5.0</span></span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-gray-300">Response Rate</span>
                       <span className="text-emerald-400 font-bold">98%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-gray-300">Orders Fulfilled</span>
                       <span className="text-white font-bold">1,240</span>
                    </div>
                 </div>
              </GlassCard>
           </div>

           {/* Main Content */}
           <div className="flex-1 space-y-6">
              {activeProfileSection === 'store' && (
                 <div className="space-y-6 animate-in fade-in">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Store className="text-indigo-400"/> Store Details</h2>
                    <GlassCard className="p-6">
                       <div className="grid md:grid-cols-2 gap-6">
                          <GlassInput label="Store Name" defaultValue="Sarah's Tech Store" />
                          <GlassSelect label="Category" options={[{label: 'Electronics', value: 'electronics'}, {label: 'Fashion', value: 'fashion'}]} />
                          <div className="md:col-span-2">
                             <label className="text-xs text-gray-400 ml-1 mb-1 block">Store Description</label>
                             <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white h-24 focus:bg-white/10 outline-none focus:border-indigo-500/50 transition-colors" defaultValue="Providing the latest in futuristic gadgets and cyberpunk aesthetics." />
                          </div>
                          <GlassInput label="Business Email" defaultValue={user?.email || ''} icon={<Briefcase size={16}/>} />
                          <GlassInput label="Support Phone" defaultValue="+1 (555) 000-0000" />
                       </div>
                       <div className="mt-6 flex justify-end">
                          <GlassButton icon={<Save size={16}/>}>Save Changes</GlassButton>
                       </div>
                    </GlassCard>
                 </div>
              )}

              {activeProfileSection === 'kyc' && (
                 <div className="space-y-6 animate-in fade-in">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><FileText className="text-emerald-400"/> Seller Verification</h2>
                    
                    <GlassCard className="p-6 border-emerald-500/30 bg-emerald-900/10">
                       <div className="flex items-start gap-4">
                          <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
                             <CheckCircle size={24} />
                          </div>
                          <div>
                             <h3 className="font-bold text-lg text-white">Identity Verified</h3>
                             <p className="text-gray-400 text-sm mt-1">Your business documents have been approved. You are eligible to sell on Lumina.</p>
                          </div>
                       </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                       <h3 className="font-bold mb-4">Submitted Documents</h3>
                       <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                             <div className="flex items-center gap-3">
                                <FileText className="text-gray-400" size={20} />
                                <span className="font-medium">Business Registration (LLC)</span>
                             </div>
                             <Badge color="green">Approved</Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                             <div className="flex items-center gap-3">
                                <FileText className="text-gray-400" size={20} />
                                <span className="font-medium">Government ID</span>
                             </div>
                             <Badge color="green">Approved</Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                             <div className="flex items-center gap-3">
                                <FileText className="text-gray-400" size={20} />
                                <span className="font-medium">Proof of Address</span>
                             </div>
                             <Badge color="green">Approved</Badge>
                          </div>
                       </div>
                       <GlassButton variant="secondary" className="mt-4">Update Documents</GlassButton>
                    </GlassCard>
                 </div>
              )}

              {activeProfileSection === 'financial' && (
                 <div className="space-y-6 animate-in fade-in">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><DollarSign className="text-amber-400"/> Financial Center</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                       <GlassCard className="p-6">
                          <p className="text-sm text-gray-400">Current Balance</p>
                          <h3 className="text-3xl font-bold mt-1">$12,540.50</h3>
                          <GlassButton size="sm" className="w-full mt-4" variant="primary">Withdraw Funds</GlassButton>
                       </GlassCard>
                       <GlassCard className="p-6">
                          <p className="text-sm text-gray-400">Pending Payouts</p>
                          <h3 className="text-3xl font-bold mt-1">$2,300.00</h3>
                          <p className="text-xs text-gray-500 mt-4">Next payout: Oct 28</p>
                       </GlassCard>
                       <GlassCard className="p-6">
                          <p className="text-sm text-gray-400">Commission Rate</p>
                          <h3 className="text-3xl font-bold mt-1 text-purple-400">5%</h3>
                          <p className="text-xs text-gray-500 mt-4">Standard Tier</p>
                       </GlassCard>
                    </div>

                    <GlassCard className="p-6">
                       <h3 className="font-bold mb-4">Payout Methods</h3>
                       <div className="flex items-center justify-between p-4 border border-white/10 rounded-xl bg-gradient-to-r from-indigo-900/40 to-slate-900/40">
                          <div className="flex items-center gap-4">
                             <div className="p-2 bg-white/10 rounded-lg">
                                <Store size={24} />
                             </div>
                             <div>
                                <p className="font-bold">Chase Bank ****8821</p>
                                <p className="text-xs text-gray-400">Direct Deposit (USD)</p>
                             </div>
                          </div>
                          <Badge color="green">Active</Badge>
                       </div>
                       <GlassButton variant="ghost" icon={<Plus size={16} />} className="mt-4">Add Withdrawal Method</GlassButton>
                    </GlassCard>

                    <GlassCard className="overflow-hidden">
                       <div className="p-6 border-b border-white/10 flex justify-between items-center">
                          <h3 className="font-bold text-lg">Payout History</h3>
                          <GlassButton size="sm" variant="secondary" icon={<FileText size={14} />}>Export CSV</GlassButton>
                       </div>
                       <table className="w-full text-left">
                          <thead>
                             <tr className="bg-white/5 text-gray-400 text-sm">
                                <th className="p-4 pl-6">Reference ID</th>
                                <th className="p-4">Date Processed</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4 text-right pr-6">Status</th>
                             </tr>
                          </thead>
                          <tbody>
                             {MOCK_PAYOUT_HISTORY.map((payout) => (
                                <tr key={payout.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                   <td className="p-4 pl-6 font-mono text-sm text-indigo-300">{payout.id}</td>
                                   <td className="p-4 text-sm text-gray-300">{payout.date}</td>
                                   <td className="p-4 font-bold">${payout.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                   <td className="p-4 text-right pr-6">
                                      <Badge color={payout.status === 'Completed' ? 'green' : payout.status === 'Processing' ? 'yellow' : 'red'}>
                                         {payout.status}
                                      </Badge>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </GlassCard>
                 </div>
              )}

              {activeProfileSection === 'inventory' && (
                 <div className="space-y-6 animate-in fade-in">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Package className="text-blue-400"/> Inventory & Products</h2>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <GlassCard className="p-4 text-center">
                          <p className="text-xs text-gray-400">Total Products</p>
                          <p className="text-2xl font-bold">{products.length}</p>
                       </GlassCard>
                       <GlassCard className="p-4 text-center">
                          <p className="text-xs text-gray-400">Active</p>
                          <p className="text-2xl font-bold text-emerald-400">{products.filter(p => getProductStatus(p) === 'Approved').length}</p>
                       </GlassCard>
                       <GlassCard className="p-4 text-center">
                          <p className="text-xs text-gray-400">Pending</p>
                          <p className="text-2xl font-bold text-amber-400">{products.filter(p => getProductStatus(p) === 'Pending').length}</p>
                       </GlassCard>
                       <GlassCard className="p-4 text-center">
                          <p className="text-xs text-gray-400">Low Stock</p>
                          <p className="text-2xl font-bold text-red-400">{products.filter(p => p.stock < 10).length}</p>
                       </GlassCard>
                    </div>

                    {/* Table */}
                    <GlassCard className="overflow-hidden">
                       <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                           <GlassInput placeholder="Search inventory..." icon={<Search size={16} />} className="w-64" />
                           <GlassButton size="sm" icon={<Plus size={16} />} onClick={() => setIsAddModalOpen(true)}>Add Product</GlassButton>
                       </div>
                       <table className="w-full text-left">
                          <thead>
                             <tr className="bg-white/5 text-gray-400 text-sm">
                                <th className="p-4 pl-6">Product</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Approval Status</th>
                                <th className="p-4 text-right pr-6">Action</th>
                             </tr>
                          </thead>
                          <tbody>
                             {products.map((p) => {
                                const status = getProductStatus(p);
                                return (
                                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                     <td className="p-4 pl-6">
                                        <div className="flex items-center gap-3">
                                           <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-white/5" alt="" />
                                           <span className="font-medium">{p.name}</span>
                                        </div>
                                     </td>
                                     <td className="p-4 text-sm text-gray-300">{p.category}</td>
                                     <td className="p-4 font-mono">${p.price}</td>
                                     <td className="p-4">
                                        <div className="flex items-center gap-2 text-sm">
                                           <div className={`w-2 h-2 rounded-full ${p.stock < 10 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                                           {p.stock}
                                        </div>
                                     </td>
                                     <td className="p-4">
                                        <Badge color={status === 'Approved' ? 'green' : status === 'Pending' ? 'yellow' : 'red'}>
                                           {status}
                                        </Badge>
                                     </td>
                                     <td className="p-4 text-right pr-6">
                                        <button className="text-sm text-indigo-300 hover:text-white transition-colors">Edit</button>
                                     </td>
                                  </tr>
                                );
                             })}
                          </tbody>
                       </table>
                    </GlassCard>
                 </div>
              )}

              {activeProfileSection === 'security' && (
                 <div className="space-y-6 animate-in fade-in">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Shield className="text-red-400"/> Security Settings</h2>
                    
                    <GlassCard className="p-6">
                       <div className="flex justify-between items-center mb-6">
                          <div>
                             <h3 className="font-bold">Change Password</h3>
                             <p className="text-sm text-gray-400">Ensure your account is using a strong password.</p>
                          </div>
                          <GlassButton variant="secondary">Update</GlassButton>
                       </div>
                       <div className="h-[1px] bg-white/10 my-4"></div>
                       <div className="flex justify-between items-center mb-6">
                          <div>
                             <h3 className="font-bold">Two-Factor Authentication</h3>
                             <p className="text-sm text-gray-400">Require a code when logging in.</p>
                          </div>
                          <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                             <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                       </div>
                       <div className="h-[1px] bg-white/10 my-4"></div>
                       <div>
                          <h3 className="font-bold mb-4">Device Activity</h3>
                          <div className="space-y-2">
                             <div className="flex justify-between text-sm p-2 hover:bg-white/5 rounded">
                                <span>MacBook Pro - Chrome</span>
                                <span className="text-emerald-400">Active Now</span>
                             </div>
                             <div className="flex justify-between text-sm p-2 hover:bg-white/5 rounded">
                                <span>iPhone 14 - App</span>
                                <span className="text-gray-400">5 hours ago</span>
                             </div>
                          </div>
                       </div>
                    </GlassCard>
                 </div>
              )}
           </div>
        </div>
      </div>
    );
  }

  if (view === 'products') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Inventory Management</h2>
          <GlassButton icon={<Plus size={18} />} onClick={() => setIsAddModalOpen(true)}>Add New Product</GlassButton>
        </div>
        
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium">Rating</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{p.category}</td>
                    <td className="p-4">${p.price}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${p.stock < 10 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                        {p.stock}
                      </div>
                    </td>
                    <td className="p-4 text-yellow-400 flex items-center gap-1">
                       <span className="text-white">{p.rating}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          title="Add New Product"
        >
          <form onSubmit={handleAddSubmit} className="space-y-4">
             {/* Image Upload Section */}
             <div className="space-y-2">
                <label className="text-xs font-medium text-gray-300 ml-1">Product Image</label>
                {newProduct.image ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden group border border-white/10 bg-black/20">
                    <img src={newProduct.image} alt="Preview" className="w-full h-full object-contain" />
                    <button 
                      type="button"
                      onClick={() => setNewProduct(prev => ({...prev, image: ''}))}
                      className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div 
                        className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer group
                          ${isDragging 
                            ? 'border-indigo-500 bg-indigo-500/10' 
                            : 'border-white/20 text-gray-400 hover:border-indigo-500/50 hover:bg-white/5'
                          }
                        `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            onChange={handleImageUpload}
                        />
                        <div className={`p-3 rounded-full mb-3 transition-transform ${isDragging ? 'scale-110 bg-indigo-500/20' : 'bg-white/5 group-hover:scale-110'}`}>
                          <Upload size={24} className={isDragging ? 'text-indigo-300' : 'text-indigo-400'} />
                        </div>
                        <p className="text-sm font-medium text-gray-300">
                          {isDragging ? "Drop image here" : "Click or Drag to upload image"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG (max. 3MB)</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">OR</span>
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                    </div>

                    <GlassInput 
                        placeholder="Paste image URL..." 
                        icon={<ImageIcon size={16}/>}
                        value={newProduct.image} 
                        onChange={(e) => setNewProduct(prev => ({...prev, image: e.target.value}))}
                    />
                  </div>
                )}
             </div>

             <GlassInput 
               label="Product Name" 
               placeholder="e.g. Neon Lamp" 
               value={newProduct.name}
               onChange={e => setNewProduct({...newProduct, name: e.target.value})}
               required
             />
             <div className="grid grid-cols-2 gap-4">
               <GlassInput 
                 label="Price ($)" 
                 type="number" 
                 placeholder="0.00" 
                 value={newProduct.price}
                 onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                 required
               />
               <GlassInput 
                 label="Stock Quantity" 
                 type="number" 
                 placeholder="0" 
                 value={newProduct.stock}
                 onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                 required
               />
             </div>
             <GlassSelect 
               label="Category"
               options={[
                 { value: 'Electronics', label: 'Electronics' },
                 { value: 'Fashion', label: 'Fashion' },
                 { value: 'Home', label: 'Home' },
                 { value: 'Furniture', label: 'Furniture' },
                 { value: 'Wearables', label: 'Wearables' },
                 { value: 'Food & Groceries', label: 'Food & Groceries' },
               ]}
               value={newProduct.category}
               onChange={e => setNewProduct({...newProduct, category: e.target.value})}
             />
             <div className="flex flex-col gap-1.5">
               <label className="text-xs font-medium text-gray-300 ml-1">Description</label>
               <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:border-indigo-400/50 focus:bg-white/10 transition-all duration-300 resize-none h-24"
                  placeholder="Describe your product..."
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
               />
             </div>
             <div className="pt-2">
               <GlassButton type="submit" className="w-full">Create Product</GlassButton>
             </div>
          </form>
        </GlassModal>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', val: '$45,231.89', icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Total Orders', val: '+12,234', icon: Package, color: 'text-blue-400' },
          { label: 'Avg. Order Value', val: '$84.30', icon: TrendingUp, color: 'text-violet-400' },
          { label: 'Active Shoppers', val: '573', icon: Users, color: 'text-pink-400' },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 bg-white/5 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <Badge color="green">+12.5%</Badge>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold mt-1">{stat.val}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Revenue Overview</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white/10 rounded-lg text-xs hover:bg-white/20">Day</button>
              <button className="px-3 py-1 bg-white/5 rounded-lg text-xs hover:bg-white/20 text-gray-400">Week</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
           <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
           <div className="space-y-4">
             {MOCK_ORDERS.map((order) => (
               <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold">
                     {order.customerName.charAt(0)}
                   </div>
                   <div>
                     <p className="font-medium text-sm">{order.customerName}</p>
                     <p className="text-xs text-gray-400">{order.items} items • ${order.total}</p>
                   </div>
                 </div>
                 <div className={`text-xs px-2 py-1 rounded border ${
                   order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                   order.status === 'Processing' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                   'bg-blue-500/10 text-blue-400 border-blue-500/20'
                 }`}>
                   {order.status}
                 </div>
               </div>
             ))}
           </div>
           <GlassButton variant="ghost" className="w-full mt-4 text-sm">View All Orders</GlassButton>
        </GlassCard>
      </div>
    </div>
  );
};
