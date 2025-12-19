
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', total: 4000, blocked: 240, flagged: 450 },
  { name: 'Tue', total: 3000, blocked: 198, flagged: 380 },
  { name: 'Wed', total: 5000, blocked: 510, flagged: 620 },
  { name: 'Thu', total: 2780, blocked: 120, flagged: 290 },
  { name: 'Fri', total: 6890, blocked: 890, flagged: 1100 },
  { name: 'Sat', total: 2390, blocked: 450, flagged: 500 },
  { name: 'Sun', total: 3490, blocked: 210, flagged: 340 },
];

const categoryData = [
  { name: 'Identity Hate', value: 45 },
  { name: 'Threats', value: 12 },
  { name: 'Insults', value: 85 },
  { name: 'Severe Toxic', value: 34 },
];

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
          <p className="text-slate-500">Global moderation trends and model performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Export Logs</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Update Thresholds</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Messages', value: '2.4M', change: '+12%', color: 'text-blue-600' },
          { label: 'Blocked Content', value: '45.2k', change: '+5%', color: 'text-red-600' },
          { label: 'Avg Latency', value: '182ms', change: '-8%', color: 'text-emerald-600' },
          { label: 'Precision (P95)', value: '0.982', change: '+0.1%', color: 'text-indigo-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
              <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Moderation Volume</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip />
                <Area type="monotone" dataKey="blocked" stroke="#ef4444" fillOpacity={1} fill="url(#colorBlocked)" strokeWidth={2} />
                <Area type="monotone" dataKey="flagged" stroke="#f59e0b" fillOpacity={0.1} fill="#f59e0b" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Violation Categories</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Recent flagged messages</h3>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-widest font-bold">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Content Snippet</th>
                <th className="px-6 py-4">Flag Reason</th>
                <th className="px-6 py-4">Confidence</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {[
                { user: 'usr_942', text: 'You are absolutely useless and should...', reason: 'Insult', conf: '94%' },
                { user: 'usr_210', text: 'I am going to find where you live and...', reason: 'Threat', conf: '99%' },
                { user: 'usr_005', text: 'The way your people act is just...', reason: 'Identity Hate', conf: '88%' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{row.user}</td>
                  <td className="px-6 py-4 text-slate-600 italic">"{row.text}"</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-red-50 text-red-600 rounded text-[10px] font-bold uppercase">{row.reason}</span></td>
                  <td className="px-6 py-4 font-semibold">{row.conf}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-emerald-600 hover:text-emerald-700 font-bold">✓</button>
                      <button className="text-red-600 hover:text-red-700 font-bold">✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
