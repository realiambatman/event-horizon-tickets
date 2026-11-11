import React from 'react';
import { Card, Button, Badge } from '../components/UI';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Plus, TrendingUp, Minus } from 'lucide-react';
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

const weekTotal = data.reduce((sum, d) => sum + d.sales, 0);

// Chart colours, matched to the Tailwind theme.
const CHART = {
  bar: '#ff5a4e',
  barActive: '#ffe81a',
  grid: '#1d2050',
  tick: '#a8abd2',
  cursor: 'rgba(245, 238, 220, 0.06)',
};

const Admin = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="display text-poster-md text-paper">Organizer dashboard</h1>
          <p className="mt-2 text-mute">Manage your events and attendees.</p>
        </div>
        <Button className="self-start sm:self-auto">
          <Plus size={18} aria-hidden="true" /> Create event
        </Button>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-ink-700 bg-ink-700 sm:grid-cols-3">
        <StatCard label="Total revenue" value="₹12,45,000" change="+12.5%" trend="up" />
        <StatCard label="Total attendees" value="8,240" change="+5.2%" trend="up" />
        <StatCard label="Active events" value="4" change="Stable" trend="flat" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 md:gap-8">
        {/* Sales Chart */}
        <Card className="flex flex-col">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-bold text-paper">Ticket sales, this week</h2>
            <p className="text-sm tabular-nums text-mute">₹{weekTotal.toLocaleString('en-IN')} total</p>
          </div>
          <div className="h-64 w-full shrink-0">
            <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 520, height: 256 }}>
              <BarChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} barCategoryGap="28%">
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="name" stroke={CHART.tick} tick={{ fontSize: 12, fill: CHART.tick }} axisLine={false} tickLine={false} />
                <YAxis
                  width={44}
                  stroke={CHART.tick}
                  tick={{ fontSize: 12, fill: CHART.tick }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => (v === 0 ? '0' : `₹${v / 1000}k`)}
                />
                <Tooltip
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Sales']}
                  contentStyle={{ backgroundColor: '#06061a', border: '1px solid #2c3070', borderRadius: 3, color: '#f5eedc', fontSize: 14 }}
                  labelStyle={{ color: '#a8abd2' }}
                  itemStyle={{ color: '#f5eedc' }}
                  cursor={{ fill: CHART.cursor }}
                />
                <Bar dataKey="sales" fill={CHART.bar} radius={[2, 2, 0, 0]} activeBar={{ fill: CHART.barActive }} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Event List Status */}
        <Card>
          <h2 className="mb-6 text-lg font-bold text-paper">Event capacity</h2>
          <div className="space-y-6">
            {MOCK_EVENTS.map(event => {
              const pct = Math.round((event.sold / event.capacity) * 100);
              const nearlyFull = pct >= 90;
              return (
                <div key={event.id}>
                  <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2 font-semibold text-paper">
                      <span className="truncate">{event.title}</span>
                      {nearlyFull && <Badge variant="hot">Nearly full</Badge>}
                    </span>
                    <span className="tabular-nums text-paper-dim">{pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ink-700">
                    <div
                      className={`h-full rounded-full ${nearlyFull ? 'bg-coral' : 'bg-paper'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-xs tabular-nums text-mute">
                    <span>{event.sold.toLocaleString('en-IN')} sold</span>
                    <span>{event.capacity.toLocaleString('en-IN')} capacity</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent Attendees Table */}
      <Card noPadding className="overflow-hidden">
        <h2 className="border-b border-ink-700 px-5 py-4 text-lg font-bold text-paper md:px-6">Recent transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-mute">
              <tr className="border-b border-ink-700">
                <th scope="col" className="px-5 py-3 font-medium md:px-6">Attendee</th>
                <th scope="col" className="px-5 py-3 font-medium md:px-6">Event</th>
                <th scope="col" className="px-5 py-3 font-medium md:px-6">Tier</th>
                <th scope="col" className="px-5 py-3 text-right font-medium md:px-6">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700">
              {[1,2,3,4,5].map(i => (
                <tr key={i} className="transition-colors hover:bg-ink-700/40">
                  <td className="px-5 py-3 md:px-6">
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-stock bg-ink-700 text-xs font-bold text-paper-dim">
                        U{i}
                      </span>
                      <span className="font-semibold text-paper">User #{1000 + i}</span>
                    </span>
                  </td>
                  <td className="px-5 py-3 text-paper-dim md:px-6">Neon Symphony 2025</td>
                  <td className="px-5 py-3 md:px-6"><Badge variant="outline">VIP</Badge></td>
                  <td className="px-5 py-3 text-right font-semibold tabular-nums text-paper md:px-6">₹3,750</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const StatCard = ({ label, value, change, trend }: { label: string, value: string, change: string, trend: 'up' | 'flat' }) => (
  <div className="bg-ink-800 p-5 md:p-6">
    <p className="text-sm font-medium text-mute">{label}</p>
    <p className="mt-2 font-display text-5xl font-black leading-none tabular-nums text-paper">{value}</p>
    <p className={`mt-3 flex items-center gap-1.5 text-sm font-semibold ${trend === 'up' ? 'text-volt' : 'text-mute'}`}>
      {trend === 'up' ? <TrendingUp size={14} aria-hidden="true" /> : <Minus size={14} aria-hidden="true" />}
      {change}
    </p>
  </div>
);

export default Admin;
