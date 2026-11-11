import React, { useState } from 'react';
import { User, Shield, CreditCard, Bell, Camera, ChevronRight } from 'lucide-react';
import { Button, Logo } from '../components/UI';
import { Barcode } from '../components/Ticket';

interface ProfileProps {
  user: { name: string; email: string };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'billing'>('general');
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: 'Digital nomad. Music enthusiast. Event explorer.',
  });

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="display mb-10 text-poster-lg text-paper md:mb-14">My profile</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

        {/* --- LEFT SIDEBAR (MEMBER PASS + NAV) --- */}
        <div className="space-y-8 lg:col-span-4">

          {/* Member pass, cut like a backstage laminate */}
          <div className="on-paper mx-auto max-w-sm -rotate-1 overflow-hidden rounded-lg bg-paper text-ink-950 shadow-lift lg:max-w-none">
            <div className="flex items-center justify-between bg-coral px-5 py-3">
              <span className="display text-3xl leading-none">Member</span>
              <span aria-hidden="true" className="h-3 w-12 rounded-full bg-ink-900" />
            </div>
            <div className="px-5 pb-5 pt-6">
              <Logo className="h-6 w-9" />
              <p className="display mt-4 break-words text-5xl leading-[0.86]">{user.name}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs font-medium text-ink-600">Member ID</dt>
                  <dd className="text-sm font-bold tabular-nums">8829 4421 0092</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-ink-600">Joined</dt>
                  <dd className="text-sm font-bold tabular-nums">2025</dd>
                </div>
              </dl>
              <Barcode code="882944210092" className="mt-5 h-10 w-full" />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div role="tablist" aria-label="Profile sections" aria-orientation="vertical" className="panel p-2">
            <TabButton
              active={activeTab === 'general'}
              onClick={() => setActiveTab('general')}
              icon={<User size={18} aria-hidden="true" />}
              label="General Info"
            />
            <TabButton
              active={activeTab === 'security'}
              onClick={() => setActiveTab('security')}
              icon={<Shield size={18} aria-hidden="true" />}
              label="Security"
            />
            <TabButton
              active={activeTab === 'billing'}
              onClick={() => setActiveTab('billing')}
              icon={<CreditCard size={18} aria-hidden="true" />}
              label="Billing Methods"
            />
            <div className="mx-3 my-2 h-px bg-ink-700" />
            <TabButton
              active={false}
              onClick={() => {}}
              icon={<Bell size={18} aria-hidden="true" />}
              label="Notifications"
            />
          </div>
        </div>

        {/* --- RIGHT CONTENT AREA --- */}
        <div className="lg:col-span-8">
          <div className="panel p-5 md:p-8 lg:min-h-[560px] lg:p-10">

            {activeTab === 'general' && (
              <div className="space-y-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="display text-poster-sm text-paper">General info</h2>
                    <p className="mt-1 text-mute">Update your photo and personal details.</p>
                  </div>
                  <Button variant="secondary">Cancel</Button>
                </div>

                {/* Avatar Upload */}
                <div className="flex items-center gap-5 border-b border-ink-700 pb-8">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-stock bg-coral font-display text-6xl font-black leading-none text-ink-950">
                    {user.name.charAt(0)}
                    <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-stock bg-ink-950 text-paper">
                      <Camera size={16} aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-paper">Profile photo</h3>
                    <p className="mb-3 text-sm text-mute">Recommended 400x400px.</p>
                    <div className="flex gap-4 text-sm font-semibold">
                      <button type="button" className="text-volt underline-offset-4 hover:underline">Change</button>
                      <button type="button" className="text-mute underline-offset-4 hover:text-coral hover:underline">Remove</button>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <InputGroup id="profile-name" label="Full name" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
                  <InputGroup id="profile-email" label="Email address" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} />
                  <div className="md:col-span-2">
                    <label htmlFor="profile-bio" className="field-label">Bio</label>
                    <textarea
                      id="profile-bio"
                      className="field min-h-[120px]"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    />
                  </div>
                </div>

                <Button>Save changes</Button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="display text-poster-sm text-paper">Security</h2>
                  <p className="mt-1 text-mute">Manage your password and 2FA settings.</p>
                </div>

                <div className="max-w-md space-y-5">
                  <InputGroup id="pw-current" label="Current password" type="password" value="********" />
                  <InputGroup id="pw-new" label="New password" type="password" placeholder="Min 8 characters" />
                  <InputGroup id="pw-confirm" label="Confirm password" type="password" />
                  <div className="pt-2">
                    <Button>Update password</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8">
                <div>
                  <h2 className="display text-poster-sm text-paper">Payment methods</h2>
                  <p className="mt-1 text-mute">Manage your saved cards for faster checkout.</p>
                </div>

                <div className="max-w-xl space-y-4">
                  <div className="flex items-center justify-between gap-4 rounded-stock border border-ink-600 p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-14 items-center justify-center rounded-stock bg-paper text-xs font-bold text-ink-950">VISA</div>
                      <div>
                        <p className="font-bold text-paper">Visa ending in 4242</p>
                        <p className="text-sm text-mute">Expires 12/28</p>
                      </div>
                    </div>
                    <button type="button" className="text-sm font-semibold text-volt underline-offset-4 hover:underline">Edit</button>
                  </div>

                  <button type="button" className="flex w-full items-center justify-center gap-2 rounded-stock border border-dashed border-ink-500 py-4 font-semibold text-paper-dim transition-colors hover:border-volt hover:text-volt">
                    <CreditCard size={20} aria-hidden="true" /> Add new card
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className={`flex w-full items-center justify-between rounded-stock px-4 py-3.5 text-sm font-semibold transition-colors ${
      active ? 'bg-paper text-ink-950' : 'text-paper-dim hover:bg-ink-700 hover:text-paper'
    }`}
  >
    <span className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </span>
    {active && <ChevronRight size={16} aria-hidden="true" />}
  </button>
);

const InputGroup = ({ id, label, value, onChange, type = "text", placeholder }: { id: string, label: string, value?: string, onChange?: (v: string) => void, type?: string, placeholder?: string }) => (
  <div>
    <label htmlFor={id} className="field-label">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      className="field"
    />
  </div>
);

export default Profile;
