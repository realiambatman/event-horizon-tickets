import React from 'react';
import { Card, Button, Badge } from '../components/UI';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Users, Activity, Plus, TrendingUp, IndianRupee } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';

const data = [
  { name: 'Mon', sales: 40000 },
  { name: 'Tue', sales: 30000 },
  { name: 'Wed', sales: 20000 },
  { name: 'Thu', sales: 27800 },
  { name: 'Fri', sales: 18900 },
  { name: 'Sat', sales: 23900 },
  { name: 'Sun', sales: 34900 },
];

const Admin = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Organizer Dashboard</h1>
          <p className="text-slate-500">Manage your events and attendees.</p>
        </div>
        <Button>
          <Plus size={16} /> Create Event
        </Button>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<IndianRupee className="text-slate-900" size={20} />} label="Total Revenue" value="₹12,45,000" change="+12.5%" />
        <StatCard icon={<Users className="text-blue-500" size={20} />} label="Total Attendees" value="8,240" change="+5.2%" />
        <StatCard icon={<Activity className="text-emerald-500" size={20} />} label="Active Events" value="4" change="Stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <Card className="flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6 text-lg">Ticket Sales (Weekly)</h3>
          <div className="h-64 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Sales']}
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="sales" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Event List Status */}
        <Card>
          <h3 className="font-bold text-slate-900 mb-6 text-lg">Event Capacity</h3>
          <div className="space-y-6">
            {MOCK_EVENTS.map(event => (
              <div key={event.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">{event.title}</span>
                  <span className="text-slate-500">{Math.round((event.sold / event.capacity) * 100)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-900 rounded-full" 
                    style={{ width: `${(event.sold / event.capacity) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-slate-400">
                  <span>{event.sold} Sold</span>
                  <span>{event.capacity} Capacity</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Attendees Table */}
      <Card noPadding className="overflow-hidden">
        <div className="p-6 pb-4 border-b border-slate-100">
           <h3 className="font-bold text-slate-900 text-lg">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-slate-400 uppercase text-xs bg-slate-50">
              <tr>
                <th className="py-3 px-6 font-medium">Attendee</th>
                <th className="py-3 px-6 font-medium">Event</th>
                <th className="py-3 px-6 font-medium">Tier</th>
                <th className="py-3 px-6 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1,2,3,4,5].map(i => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                      U{i}
                    </div>
                    <span className="font-medium text-slate-900">User #{1000 + i}</span>
                  </td>
                  <td className="py-3 px-6">Neon Symphony 2025</td>
                  <td className="py-3 px-6"><Badge variant="outline">VIP</Badge></td>
                  <td className="py-3 px-6 text-right font-mono text-slate-700">₹3,750</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const StatCard = ({ icon, label, value, change }: { icon: React.ReactNode, label: string, value: string, change: string }) => (
  <Card className="flex items-center justify-between">
    <div>
      <p className="text-slate-500 text-sm mb-1 font-medium">{label}</p>
      <h4 className="text-2xl font-display font-bold text-slate-900">{value}</h4>
    </div>
    <div className="flex flex-col items-end gap-2">
      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
        {icon}
      </div>
      <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
         <TrendingUp size={10} />
         {change}
      </div>
    </div>
  </Card>
);

export default Admin;