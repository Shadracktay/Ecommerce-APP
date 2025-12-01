import React, { useState } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, Search, MoreVertical, 
  TrendingUp, Users, Package, ShoppingCart, DollarSign, 
  Activity, ArrowUpRight, ArrowDownRight, Filter, Eye, 
  XCircle, Check, Flag, Server, Lock, AlertOctagon, 
  RefreshCw, Mail, CreditCard, Layers, BarChart as BarChartIcon,
  Calendar, Clock, User as UserIcon, List, Bell, Key
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { GlassCard, GlassInput, Badge, GlassButton, GlassSelect } from '../components/GlassUI';
import { USERS, MOCK_PRODUCTS, MOCK_ORDERS } from '../constants';
import { Role, User as UserType } from '../types';

// --- MOCK DATA FOR ADMIN ---

const ADMIN_STATS = [
  { label: 'Total Sales', value: '$124,592', change: '+14.5%', isPositive: true, icon: DollarSign, color: 'emerald' },
  { label: 'Active Users', value: '45.2k', change: '+8.2%', isPositive: true, icon: Users, color: 'blue' },
  { label: 'Pending Approvals', value: '28', change: '-2.4%', isPositive: false, icon: Package, color: 'amber' },
  { label: 'Open Disputes', value: '12', change: '+1.2%', isPositive: false, icon: AlertTriangle, color: 'red' },
];

const SALES_DATA = [
  { name: 'Mon', uv: 4000, pv: 2400 },
  { name: 'Tue', uv: 3000, pv: 1398 },
  { name: 'Wed', uv: 2000, pv: 9800 },
  { name: 'Thu', uv: 2780, pv: 3908 },
  { name: 'Fri', uv: 1890, pv: 4800 },
  { name: 'Sat', uv: 2390, pv: 3800 },
  { name: 'Sun', uv: 3490, pv: 4300 },
];

const TRAFFIC_SOURCE = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Organic', value: 300 },
  { name: 'Referral', value: 200 },
];
const COLORS = ['#818cf8', '#34d399', '#f472b6', '#fbbf24'];

const LOGS = [
  { id: 1, event: 'Failed Login Attempt', ip: '192.168.1.42', user: 'admin_sus', time: '10 mins ago', type: 'danger' },
  { id: 2, event: 'New Seller Registration', ip: '10.0.0.55', user: 'tech_store_v2', time: '25 mins ago', type: 'success' },
  { id: 3, event: 'Product Flagged', ip: 'System', user: 'AI Bot', time: '1 hour ago', type: 'warning' },
  { id: 4, event: 'API Rate Limit Exceeded', ip: '203.112.44.1', user: 'bot_crawler', time: '2 hours ago', type: 'danger' },
];

const DISPUTES = [
  { id: 'D-1023', user: 'Alice Freeman', seller: 'Tech Haven', issue: 'Item not received', status: 'Open', date: '2023-10-25' },
  { id: 'D-1022', user: 'John Doe', seller: 'Future Wear', issue: 'Damaged item', status: 'Escalated', date: '2023-10-24' },
  { id: 'D-1021', user: 'Sarah Smith', seller: 'Home AI', issue: 'Refund delay', status: 'Resolved', date: '2023-10-20' },
];

// --- SUB-COMPONENTS ---

const DashboardView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
        <p className="text-gray-400">Real-time monitoring of the Lumina ecosystem.</p>
      </div>
      <div className="flex gap-2">
         <GlassButton size="sm" variant="secondary" icon={<RefreshCw size={14} />}>Refresh Data</GlassButton>
      </div>
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {ADMIN_STATS.map((stat, idx) => (
        <GlassCard key={idx} className="p-6 flex flex-col justify-between h-full group hover:bg-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:bg-${stat.color}-500/20 transition-colors`}>
              <stat.icon size={24} />
            </div>
            <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
              {stat.isPositive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
              {stat.change}
            </div>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold mt-1 text-white">{stat.value}</p>
          </div>
        </GlassCard>
      ))}
    </div>

    {/* Charts Section */}
    <div className="grid lg:grid-cols-3 gap-6">
      <GlassCard className="lg:col-span-2 p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Activity className="text-indigo-400" size={20} />
          Revenue & Traffic
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SALES_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              />
              <Area type="monotone" dataKey="uv" stroke="#818cf8" fillOpacity={1} fill="url(#colorUv)" />
              <Area type="monotone" dataKey="pv" stroke="#34d399" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-xl font-bold mb-6">Traffic Sources</h3>
        <div className="h-[200px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={TRAFFIC_SOURCE}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {TRAFFIC_SOURCE.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3 mt-4">
          {TRAFFIC_SOURCE.map((source, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                <span className="text-gray-300">{source.name}</span>
              </div>
              <span className="font-semibold">{Math.floor((source.value / 1200) * 100)}%</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  </div>
);

const UsersView = () => {
  const [activeTab, setActiveTab] = useState<'buyers' | 'sellers'>('buyers');
  const filteredUsers = USERS.filter(u => activeTab === 'buyers' ? u.role === Role.BUYER : u.role === Role.SELLER);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">User Management</h2>
        <GlassButton icon={<Mail size={16} />} variant="secondary">Email All {activeTab === 'buyers' ? 'Buyers' : 'Sellers'}</GlassButton>
      </div>

      <div className="flex gap-2 border-b border-white/10 pb-4">
         <button 
           onClick={() => setActiveTab('buyers')}
           className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'buyers' ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-400 hover:text-white'}`}
         >
           Buyers
         </button>
         <button 
           onClick={() => setActiveTab('sellers')}
           className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'sellers' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
         >
           Sellers
         </button>
      </div>

      <GlassCard className="overflow-hidden">
         <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
             <GlassInput placeholder="Search users..." icon={<Search size={16} />} className="w-64" />
             <div className="flex gap-2">
                <GlassButton size="sm" variant="ghost" icon={<Filter size={14} />}>Filter</GlassButton>
             </div>
         </div>
         <table className="w-full text-left">
           <thead>
             <tr className="text-gray-400 text-sm bg-white/5">
               <th className="p-4 font-medium pl-6">User</th>
               <th className="p-4 font-medium">Status</th>
               <th className="p-4 font-medium">Joined Date</th>
               {activeTab === 'sellers' && <th className="p-4 font-medium">Balance</th>}
               <th className="p-4 font-medium text-right pr-6">Actions</th>
             </tr>
           </thead>
           <tbody>
             {filteredUsers.map(user => (
               <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                 <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} className="w-10 h-10 rounded-full" alt="" />
                      <div>
                         <div className="font-medium">{user.name}</div>
                         <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                 </td>
                 <td className="p-4">
                   <Badge color="green">Active</Badge>
                 </td>
                 <td className="p-4 text-gray-400 text-sm">Oct 24, 2023</td>
                 {activeTab === 'sellers' && <td className="p-4 font-mono">${user.balance?.toLocaleString()}</td>}
                 <td className="p-4 text-right pr-6">
                   <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white" title="View Profile">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400" title="Suspend">
                        <XCircle size={16} />
                      </button>
                   </div>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
      </GlassCard>
    </div>
  );
};

const ProductsView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
     <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Product Approval</h2>
        <div className="flex gap-2">
           <GlassButton variant="secondary" icon={<Filter size={16}/>}>Filter Status</GlassButton>
        </div>
      </div>
     
      <GlassCard className="overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-gray-400 text-sm">
              <th className="p-4 pl-6">Product</th>
              <th className="p-4">Seller</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PRODUCTS.map((product, i) => (
              <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                 <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                       <img src={product.image} className="w-12 h-12 rounded-lg object-cover bg-white/5" alt="" />
                       <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.category}</div>
                       </div>
                    </div>
                 </td>
                 <td className="p-4 text-sm text-gray-300">Seller {product.sellerId}</td>
                 <td className="p-4 font-mono">${product.price}</td>
                 <td className="p-4 text-sm">{product.stock} units</td>
                 <td className="p-4">
                    {/* Mock Status logic */}
                    {i % 3 === 0 ? <Badge color="yellow">Pending</Badge> : <Badge color="green">Live</Badge>}
                 </td>
                 <td className="p-4 text-right pr-6">
                   <div className="flex justify-end gap-2">
                      <button className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors">
                        <Check size={16} />
                      </button>
                      <button className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                        <XCircle size={16} />
                      </button>
                   </div>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
  </div>
);

const OrdersView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-3xl font-bold">Order Management</h2>
    
    <div className="grid md:grid-cols-4 gap-4">
      {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
        <GlassCard key={status} className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
           <span className="font-medium text-gray-300">{status}</span>
           <Badge color="blue">{Math.floor(Math.random() * 50)}</Badge>
        </GlassCard>
      ))}
    </div>

    <GlassCard className="overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-white/5">
        <h3 className="font-semibold text-lg">Recent Orders</h3>
      </div>
      <table className="w-full text-left">
         <thead>
            <tr className="text-gray-400 text-sm">
               <th className="p-4 pl-6">Order ID</th>
               <th className="p-4">Customer</th>
               <th className="p-4">Date</th>
               <th className="p-4">Total</th>
               <th className="p-4">Status</th>
               <th className="p-4 text-right pr-6">Tracking</th>
            </tr>
         </thead>
         <tbody>
            {MOCK_ORDERS.map(order => (
               <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 pl-6 font-mono text-indigo-300">{order.id}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4 text-sm text-gray-400">{order.date}</td>
                  <td className="p-4 font-bold">${order.total}</td>
                  <td className="p-4">
                     <span className={`px-2 py-1 rounded text-xs font-medium border
                        ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          order.status === 'Processing' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                          'bg-blue-500/10 text-blue-400 border-blue-500/20'}
                     `}>
                        {order.status}
                     </span>
                  </td>
                  <td className="p-4 text-right pr-6 text-sm text-gray-400">
                     TRK-{Math.floor(Math.random()*100000)}
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
    </GlassCard>
  </div>
);

const FinanceView = () => (
   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold">Finance & Revenue</h2>
      
      <div className="grid lg:grid-cols-3 gap-6">
         <GlassCard className="p-6 bg-gradient-to-br from-indigo-900/50 to-slate-900/50">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-300">
                   <DollarSign size={24} />
                </div>
                <Badge color="green">+24% YoY</Badge>
             </div>
             <p className="text-gray-400 text-sm">Total Platform Revenue</p>
             <h3 className="text-3xl font-bold mt-1">$2.4M</h3>
             <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sm">
                <span className="text-gray-400">Commission (5%)</span>
                <span className="text-white">$120,000</span>
             </div>
         </GlassCard>

         <GlassCard className="p-6">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-500/20 rounded-xl text-amber-300">
                   <RefreshCw size={24} />
                </div>
             </div>
             <p className="text-gray-400 text-sm">Pending Payouts</p>
             <h3 className="text-3xl font-bold mt-1">$45,200</h3>
             <div className="mt-4 pt-4 border-t border-white/10">
                <GlassButton size="sm" className="w-full">Process Payouts</GlassButton>
             </div>
         </GlassCard>

         <GlassCard className="p-6">
            <h3 className="font-bold mb-4">Commission Structure</h3>
            <div className="space-y-3">
               <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Standard Sellers</span>
                  <span className="font-bold text-white">5%</span>
               </div>
               <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div className="bg-indigo-500 h-1.5 rounded-full w-[60%]"></div>
               </div>
               
               <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-400">Power Sellers (Verified)</span>
                  <span className="font-bold text-white">3.5%</span>
               </div>
               <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full w-[40%]"></div>
               </div>
            </div>
         </GlassCard>
      </div>

      <GlassCard className="p-6">
         <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
         <div className="space-y-4">
            {[1,2,3,4,5].map(i => (
               <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className={`p-2 rounded-full ${i%2===0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                        {i%2===0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                     </div>
                     <div>
                        <p className="font-medium text-sm">{i%2===0 ? 'Seller Payout - Tech Store' : 'Order Commission #ORD-772'+i}</p>
                        <p className="text-xs text-gray-400">Oct 2{i}, 2023 at 14:30</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className={`font-bold ${i%2===0 ? 'text-white' : 'text-emerald-400'}`}>
                        {i%2===0 ? '-' : '+'}${Math.floor(Math.random() * 500)}.00
                     </p>
                     <p className="text-xs text-gray-500">{i%2===0 ? 'Completed' : 'Received'}</p>
                  </div>
               </div>
            ))}
         </div>
      </GlassCard>
   </div>
);

const DisputesView = () => (
   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold text-white">Dispute Resolution Center</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-4">
            {DISPUTES.map(dispute => (
               <GlassCard key={dispute.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <div className="flex items-center gap-3 mb-1">
                           <span className="font-mono text-sm text-gray-400">{dispute.id}</span>
                           <Badge color={dispute.status === 'Escalated' ? 'red' : dispute.status === 'Open' ? 'yellow' : 'green'}>{dispute.status}</Badge>
                        </div>
                        <h3 className="font-bold text-lg">{dispute.issue}</h3>
                     </div>
                     <span className="text-sm text-gray-400">{dispute.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl mb-4">
                     <div className="flex items-center gap-2">
                        <Users size={16} className="text-indigo-400" />
                        <span className="text-sm">
                           <span className="text-white font-medium">{dispute.user}</span> vs <span className="text-white font-medium">{dispute.seller}</span>
                        </span>
                     </div>
                     <GlassButton size="sm" variant="ghost">View Evidence</GlassButton>
                  </div>

                  <div className="flex gap-3 justify-end">
                     <GlassButton size="sm" variant="secondary">Reject Claim</GlassButton>
                     <GlassButton size="sm" variant="primary">Approve Refund</GlassButton>
                  </div>
               </GlassCard>
            ))}
         </div>

         <div className="space-y-6">
            <GlassCard className="p-6 bg-gradient-to-br from-amber-900/40 to-slate-900/40 border-amber-500/20">
               <div className="flex items-center gap-3 mb-4">
                  <AlertOctagon className="text-amber-400" />
                  <h3 className="font-bold text-amber-100">Action Required</h3>
               </div>
               <p className="text-sm text-amber-200/70 mb-4">
                  There are 3 escalated disputes that require immediate admin intervention.
               </p>
               <GlassButton className="w-full bg-amber-600 hover:bg-amber-500 border-none">Review Escalations</GlassButton>
            </GlassCard>

            <GlassCard className="p-6">
               <h3 className="font-bold mb-4">Resolution Stats</h3>
               <div className="space-y-4">
                  <div>
                     <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Refunded</span>
                        <span>65%</span>
                     </div>
                     <div className="w-full bg-white/10 h-1.5 rounded-full"><div className="w-[65%] bg-blue-500 h-full rounded-full"></div></div>
                  </div>
                  <div>
                     <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Rejected</span>
                        <span>25%</span>
                     </div>
                     <div className="w-full bg-white/10 h-1.5 rounded-full"><div className="w-[25%] bg-red-500 h-full rounded-full"></div></div>
                  </div>
               </div>
            </GlassCard>
         </div>
      </div>
   </div>
);

const SecurityView = () => (
   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold">System Health & Security</h2>

      <div className="grid md:grid-cols-3 gap-6">
         <GlassCard className="p-6 border-emerald-500/30 bg-emerald-900/10">
            <div className="flex items-center gap-3 mb-2">
               <Server className="text-emerald-400" />
               <h3 className="font-bold text-emerald-100">System Status</h3>
            </div>
            <p className="text-2xl font-bold text-emerald-400">Operational</p>
            <p className="text-xs text-emerald-300/60 mt-1">Uptime: 99.99%</p>
         </GlassCard>
         <GlassCard className="p-6 border-indigo-500/30 bg-indigo-900/10">
            <div className="flex items-center gap-3 mb-2">
               <Activity className="text-indigo-400" />
               <h3 className="font-bold text-indigo-100">API Latency</h3>
            </div>
            <p className="text-2xl font-bold text-indigo-400">24ms</p>
            <p className="text-xs text-indigo-300/60 mt-1">Global Average</p>
         </GlassCard>
         <GlassCard className="p-6 border-red-500/30 bg-red-900/10">
            <div className="flex items-center gap-3 mb-2">
               <Shield className="text-red-400" />
               <h3 className="font-bold text-red-100">Threat Level</h3>
            </div>
            <p className="text-2xl font-bold text-red-400">Low</p>
            <p className="text-xs text-red-300/60 mt-1">0 Critical Alerts</p>
         </GlassCard>
      </div>

      <GlassCard className="p-6">
         <h3 className="font-bold text-xl mb-6">Security Logs</h3>
         <table className="w-full text-left">
            <thead>
               <tr className="text-gray-400 text-sm border-b border-white/10">
                  <th className="pb-3 pl-4">Event Type</th>
                  <th className="pb-3">IP Address</th>
                  <th className="pb-3">User / System</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3 text-right pr-4">Status</th>
               </tr>
            </thead>
            <tbody>
               {LOGS.map(log => (
                  <tr key={log.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="py-4 pl-4 font-medium">{log.event}</td>
                     <td className="py-4 font-mono text-sm text-gray-400">{log.ip}</td>
                     <td className="py-4 text-sm">{log.user}</td>
                     <td className="py-4 text-sm text-gray-500">{log.time}</td>
                     <td className="py-4 text-right pr-4">
                        <Badge color={log.type === 'danger' ? 'red' : log.type === 'warning' ? 'yellow' : 'green'}>
                           {log.type === 'danger' ? 'Blocked' : log.type === 'warning' ? 'Flagged' : 'Allowed'}
                        </Badge>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </GlassCard>
   </div>
);

const ProfileView: React.FC<{ user: UserType | null }> = ({ user }) => {
   const [activeTab, setActiveTab] = useState('identity');

   return (
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-80 space-y-6">
               <GlassCard className="p-6 text-center">
                  <div className="w-32 h-32 mx-auto rounded-full border-4 border-indigo-500/30 p-1 mb-4 relative">
                     <img src={user?.avatar || "https://ui-avatars.com/api/?name=Admin&background=random"} className="w-full h-full rounded-full object-cover" alt="Profile" />
                     <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <p className="text-gray-400 text-sm mb-4">{user?.email}</p>
                  <Badge color="blue">Super Admin</Badge>
               </GlassCard>

               <GlassCard className="p-2">
                  {[
                     { id: 'identity', label: 'Identity & Profile', icon: UserIcon },
                     { id: 'permissions', label: 'Access Permissions', icon: Key },
                     { id: 'logs', label: 'Activity Logs', icon: List },
                     { id: 'security', label: 'Security Settings', icon: Shield },
                  ].map(item => (
                     <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${activeTab === item.id ? 'bg-indigo-600/20 text-white shadow-sm border border-indigo-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                     >
                        <item.icon size={18} />
                        <span className="font-medium">{item.label}</span>
                     </button>
                  ))}
               </GlassCard>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6">
               {activeTab === 'identity' && (
                  <GlassCard className="p-8">
                     <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h3 className="text-xl font-bold flex items-center gap-2"><UserIcon className="text-indigo-400"/> Identity Details</h3>
                        <GlassButton size="sm" variant="secondary">Edit Profile</GlassButton>
                     </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <label className="text-xs text-gray-400">Full Name</label>
                           <p className="font-medium text-lg">{user?.name}</p>
                        </div>
                        <div>
                           <label className="text-xs text-gray-400">Username</label>
                           <p className="font-medium text-lg">admin_master</p>
                        </div>
                        <div>
                           <label className="text-xs text-gray-400">Email Address</label>
                           <p className="font-medium text-lg">{user?.email}</p>
                        </div>
                        <div>
                           <label className="text-xs text-gray-400">Phone Number</label>
                           <p className="font-medium text-lg">+1 (555) 999-8888</p>
                        </div>
                        <div className="md:col-span-2">
                           <label className="text-xs text-gray-400">Role Description</label>
                           <p className="text-gray-300 mt-1">
                              Super Admin with full system access. Responsible for user management, platform configuration, and financial oversight.
                           </p>
                        </div>
                     </div>
                  </GlassCard>
               )}

               {activeTab === 'permissions' && (
                  <GlassCard className="p-8">
                     <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Key className="text-amber-400"/> Access & Permissions</h3>
                     
                     <div className="space-y-4">
                        <div className="bg-white/5 rounded-xl p-4">
                           <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold">System Configuration</h4>
                              <Badge color="green">Full Access</Badge>
                           </div>
                           <p className="text-sm text-gray-400">Can modify global settings, API keys, and server configurations.</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4">
                           <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold">User Management</h4>
                              <Badge color="green">Full Access</Badge>
                           </div>
                           <p className="text-sm text-gray-400">Can view, edit, suspend, and delete any user account.</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4">
                           <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold">Financial Oversight</h4>
                              <Badge color="yellow">View & Audit</Badge>
                           </div>
                           <p className="text-sm text-gray-400">Can view transaction logs and generate reports. Cannot initiate payouts.</p>
                        </div>
                     </div>
                     <p className="text-xs text-gray-500 mt-4 text-right">Last permission update: Oct 20, 2023 by System Root</p>
                  </GlassCard>
               )}

               {activeTab === 'logs' && (
                  <GlassCard className="p-8">
                     <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><List className="text-blue-400"/> My Activity Logs</h3>
                     <div className="space-y-4">
                        {[
                           { action: 'Updated System Settings', details: 'Changed marketplace name', time: '2 hours ago' },
                           { action: 'User Suspension', details: 'Suspended seller account "BadStore123"', time: '5 hours ago' },
                           { action: 'Login', details: 'Successful login from IP 192.168.1.1', time: '1 day ago' },
                           { action: 'Dispute Resolution', details: 'Resolved dispute #D-1021', time: '1 day ago' },
                        ].map((log, i) => (
                           <div key={i} className="flex gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                              <div className="flex flex-col items-center">
                                 <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                                 <div className="w-[1px] h-full bg-white/10 mt-1"></div>
                              </div>
                              <div>
                                 <p className="font-bold">{log.action}</p>
                                 <p className="text-sm text-gray-400">{log.details}</p>
                                 <p className="text-xs text-indigo-400 mt-1">{log.time}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </GlassCard>
               )}

               {activeTab === 'security' && (
                  <GlassCard className="p-8">
                     <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Shield className="text-red-400"/> Security Settings</h3>
                     <div className="space-y-6">
                        <div className="flex justify-between items-center">
                           <div>
                              <h4 className="font-bold">Change Password</h4>
                              <p className="text-sm text-gray-400">Update your account password</p>
                           </div>
                           <GlassButton variant="secondary">Update</GlassButton>
                        </div>
                        <div className="h-[1px] bg-white/10"></div>
                        <div className="flex justify-between items-center">
                           <div>
                              <h4 className="font-bold">Two-Factor Authentication (2FA)</h4>
                              <p className="text-sm text-gray-400">Currently active via Authenticator App</p>
                           </div>
                           <Badge color="green">Enabled</Badge>
                        </div>
                        <div className="h-[1px] bg-white/10"></div>
                        <div>
                           <h4 className="font-bold mb-3">Active Sessions</h4>
                           <div className="bg-white/5 rounded-xl p-3 flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                 <div className="p-2 bg-white/10 rounded">
                                    <Server size={18}/>
                                 </div>
                                 <div>
                                    <p className="text-sm font-medium">MacBook Pro 16"</p>
                                    <p className="text-xs text-gray-500">San Francisco, USA • 192.168.1.1</p>
                                 </div>
                              </div>
                              <span className="text-emerald-400 text-xs font-bold">Current</span>
                           </div>
                        </div>
                     </div>
                  </GlassCard>
               )}
            </div>
         </div>
      </div>
   );
};

// --- MAIN ADMIN COMPONENT ---

export const AdminPages: React.FC<{ view: string, user: UserType | null }> = ({ view, user }) => {
  switch(view) {
    case 'users': return <UsersView />;
    case 'products': return <ProductsView />;
    case 'orders': return <OrdersView />;
    case 'finance': return <FinanceView />;
    case 'disputes': return <DisputesView />;
    case 'security': return <SecurityView />;
    // Settings view removed, Logic for 'profile' view is self-contained.
    case 'profile': return <ProfileView user={user} />;
    default: return <DashboardView />;
  }
};