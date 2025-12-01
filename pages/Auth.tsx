import React, { useState } from 'react';
import { GlassCard, GlassButton, GlassInput } from '../components/GlassUI';
import { User, Role } from '../types';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string) => void;
  onSignup: (name: string, email: string, role: Role) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  
  // Signup State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.BUYER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(loginEmail);
    } else {
      onSignup(name, email, role);
    }
  };

  return (
    <div className="flex flex-col gap-6">
       {/* Tabs */}
       <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${isLogin ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${!isLogin ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
       </div>

       <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <GlassInput 
              icon={<UserIcon size={18} />} 
              placeholder="Full Name" 
              required={!isLogin}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}
          
          <GlassInput 
            icon={<Mail size={18} />} 
            type="email" 
            placeholder="Email Address" 
            required
            value={isLogin ? loginEmail : email}
            onChange={e => isLogin ? setLoginEmail(e.target.value) : setEmail(e.target.value)}
          />
          
          <GlassInput 
            icon={<Lock size={18} />} 
            type="password" 
            placeholder="Password" 
            required
            value={isLogin ? loginPass : password}
            onChange={e => isLogin ? setLoginPass(e.target.value) : setPassword(e.target.value)}
          />

          {!isLogin && (
            <div className="space-y-2">
               <label className="text-xs font-medium text-gray-300 ml-1">I want to join as a:</label>
               <div className="grid grid-cols-2 gap-3">
                  <div 
                    onClick={() => setRole(Role.BUYER)}
                    className={`
                      cursor-pointer p-3 rounded-xl border transition-all text-center
                      ${role === Role.BUYER ? 'bg-indigo-500/20 border-indigo-500/50 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}
                    `}
                  >
                    <div className="font-semibold text-sm">Buyer</div>
                    <div className="text-[10px] opacity-70">Browse & Shop</div>
                  </div>
                  <div 
                    onClick={() => setRole(Role.SELLER)}
                    className={`
                      cursor-pointer p-3 rounded-xl border transition-all text-center
                      ${role === Role.SELLER ? 'bg-purple-500/20 border-purple-500/50 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}
                    `}
                  >
                    <div className="font-semibold text-sm">Seller</div>
                    <div className="text-[10px] opacity-70">Sell Products</div>
                  </div>
               </div>
            </div>
          )}

          <GlassButton type="submit" className="w-full mt-2" size="lg" icon={isLogin ? <ArrowRight size={18} /> : undefined}>
             {isLogin ? 'Login to Account' : 'Create Account'}
          </GlassButton>
       </form>

       <div className="text-center">
         <p className="text-xs text-gray-500">
           {isLogin ? "Don't have an account? " : "Already have an account? "}
           <button 
             onClick={() => setIsLogin(!isLogin)} 
             className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2"
           >
             {isLogin ? 'Sign Up' : 'Sign In'}
           </button>
         </p>
         {isLogin && (
            <div className="mt-4 p-3 bg-white/5 rounded-lg text-left text-xs text-gray-400">
              <p className="font-semibold mb-1 text-gray-300">Demo Credentials:</p>
              <p>Buyer: alex@lumina.com</p>
              <p>Seller: sarah@lumina.com</p>
              <p>Admin: admin@lumina.com</p>
            </div>
         )}
       </div>
    </div>
  );
};