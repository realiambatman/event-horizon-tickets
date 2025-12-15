import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, CreditCard, Bell, Camera, ChevronRight } from 'lucide-react';
import { Button } from '../components/UI';

interface ProfileProps {
  user: { name: string; email: string } | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'billing'>('general');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Digital nomad. Music enthusiast. Event explorer.',
  });

  if (!user) return <div className="p-8 text-center text-slate-500">Please sign in to view your profile.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- LEFT SIDEBAR (MEMBER CARD + NAV) --- */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Member ID Card */}
          <div className="relative h-64 w-full rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500">
            {/* Holographic Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 pointer-events-none animate-shine" />
            
            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                 <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-xl border border-white/20">
                    E
                 </div>
                 <span className="font-mono text-xs text-indigo-300 uppercase tracking-widest border border-indigo-500/30 px-2 py-1 rounded">
                   Member
                 </span>
              </div>
              
              <div>
                <p className="font-mono text-xs text-slate-400 mb-1">MEMBER ID</p>
                <p className="font-mono text-lg tracking-widest mb-6">8829 • 4421 • 0092</p>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Name</p>
                      <p className="font-display font-bold text-xl">{user.name}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Joined</p>
                      <p className="font-medium">2025</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
             <TabButton 
               active={activeTab === 'general'} 
               onClick={() => setActiveTab('general')} 
               icon={<User size={18} />} 
               label="General Info" 
             />
             <TabButton 
               active={activeTab === 'security'} 
               onClick={() => setActiveTab('security')} 
               icon={<Shield size={18} />} 
               label="Security" 
             />
             <TabButton 
               active={activeTab === 'billing'} 
               onClick={() => setActiveTab('billing')} 
               icon={<CreditCard size={18} />} 
               label="Billing Methods" 
             />
             <div className="my-2 h-px bg-slate-100 mx-4" />
             <TabButton 
               active={false} 
               onClick={() => {}} 
               icon={<Bell size={18} />} 
               label="Notifications" 
             />
          </div>
        </div>

        {/* --- RIGHT CONTENT AREA --- */}
        <div className="lg:col-span-8">
           <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 min-h-[600px]">
              
              {activeTab === 'general' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-display font-bold text-slate-900">General Info</h2>
                        <p className="text-slate-500">Update your photo and personal details.</p>
                      </div>
                      <Button variant="secondary">Cancel</Button>
                   </div>

                   {/* Avatar Upload */}
                   <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                      <div className="relative group cursor-pointer">
                         <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-400 border-4 border-white shadow-lg overflow-hidden">
                            {user.name.charAt(0)}
                         </div>
                         <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" size={24} />
                         </div>
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900">Profile Photo</h4>
                         <p className="text-sm text-slate-500 mb-3">Recommended 400x400px.</p>
                         <div className="flex gap-3">
                            <button className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600 transition-colors">Change</button>
                            <button className="text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">Remove</button>
                         </div>
                      </div>
                   </div>

                   {/* Form */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputGroup label="Full Name" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
                      <InputGroup label="Email Address" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} />
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-1 block">Bio</label>
                        <textarea 
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[120px]"
                           value={formData.bio}
                           onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        />
                      </div>
                   </div>
                   
                   <div className="pt-4">
                      <Button>Save Changes</Button>
                   </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div>
                     <h2 className="text-3xl font-display font-bold text-slate-900">Security</h2>
                     <p className="text-slate-500">Manage your password and 2FA settings.</p>
                   </div>
                   
                   <div className="space-y-6 max-w-md">
                      <InputGroup label="Current Password" type="password" value="********" />
                      <InputGroup label="New Password" type="password" placeholder="Min 8 characters" />
                      <InputGroup label="Confirm Password" type="password" />
                      <div className="pt-2">
                         <Button>Update Password</Button>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'billing' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div>
                     <h2 className="text-3xl font-display font-bold text-slate-900">Payment Methods</h2>
                     <p className="text-slate-500">Manage your saved cards for faster checkout.</p>
                   </div>

                   <div className="space-y-4">
                      <div className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-indigo-300 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                            <div>
                               <p className="font-bold text-slate-900">Visa ending in 4242</p>
                               <p className="text-xs text-slate-500">Expires 12/28</p>
                            </div>
                         </div>
                         <button className="text-slate-400 hover:text-indigo-600 font-bold text-sm">Edit</button>
                      </div>
                      
                      <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                         <CreditCard size={20} /> Add New Card
                      </button>
                   </div>
                </motion.div>
              )}
           </div>
        </div>
      </div>
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        .animate-shine {
          animation: shine 6s infinite linear;
        }
      `}</style>
    </motion.div>
  );
};

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-medium transition-all ${
      active ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <div className="flex items-center gap-3">
       {icon}
       <span>{label}</span>
    </div>
    {active && <ChevronRight size={16} />}
  </button>
);

const InputGroup = ({ label, value, onChange, type = "text", placeholder }: { label: string, value?: string, onChange?: (v: string) => void, type?: string, placeholder?: string }) => (
  <div className="space-y-1">
     <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{label}</label>
     <input 
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
     />
  </div>
);

export default Profile;