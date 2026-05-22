import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import HeroHeader from './components/HeroHeader';
import MealsTab from './components/MealsTab';
import ActivityTab from './components/ActivityTab';
import BellyBalanceTab from './components/BellyBalanceTab';
import SummaryTab from './components/SummaryTab';
import AICoachTab from './components/AICoachTab';
import { MealEntry, ActivityEntry } from './types';

type Tab = 'meals' | 'activity' | 'antioxidants' | 'summary' | 'ai';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'meals',        label: 'Meals',    icon: '🍽️' },
  { id: 'activity',     label: 'Activity', icon: '🏃' },
  { id: 'antioxidants', label: 'Balance',  icon: '🫐' },
  { id: 'summary',      label: 'Summary',  icon: '📊' },
  { id: 'ai',           label: 'AI Coach', icon: '✨' },
];

function AppInner() {
  const { user, profile, loading } = useAuth();
  const [tab, setTab] = useState<Tab>('meals');
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [calGoal, setCalGoal] = useState(2000);
  const [antioxScore, setAntioxScore] = useState(0);

  // Listen to today's antioxidant score from Firestore
  useEffect(() => {
    if (!user) return;
    const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
    const q = query(
      collection(db, 'users', user.uid, 'logs'),
      where('timestamp', '>=', startOfDay.getTime()),
      orderBy('timestamp', 'desc'),
    );
    return onSnapshot(q, snap => {
      const total = snap.docs.reduce((s, d) => s + (d.data().score ?? 0), 0);
      setAntioxScore(total);
    });
  }, [user]);

  const calIn  = meals.reduce((s, m) => s + m.cal, 0);
  const calOut = activities.reduce((s, a) => s + a.cal, 0);
  const actMin = activities.reduce((s, a) => s + a.dur, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAFAF7' }}>
        <div className="text-center">
          <div className="font-display text-3xl mb-2" style={{ color: '#27500A' }}>FitStart 🌱</div>
          <div className="text-sm pulse-dot" style={{ color: '#9E9E90' }}>Loading…</div>
        </div>
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAFAF7', maxWidth: 480, margin: '0 auto' }}>
      <HeroHeader calIn={calIn} calOut={calOut} actMin={actMin} antioxScore={antioxScore} />

      {/* Tab bar */}
      <div className="flex border-b" style={{ background: '#fff', borderColor: 'rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex-1 py-2.5 px-1 flex flex-col items-center gap-0.5 transition-all"
            style={{
              fontSize: 10,
              fontWeight: tab === t.id ? 600 : 400,
              color: tab === t.id ? '#27500A' : '#9E9E90',
              background: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${tab === t.id ? '#27500A' : 'transparent'}`,
              cursor: 'pointer',
            } as React.CSSProperties}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'meals'        && <MealsTab meals={meals} onChange={setMeals} />}
        {tab === 'activity'     && <ActivityTab activities={activities} onChange={setActivities} />}
        {tab === 'antioxidants' && <BellyBalanceTab />}
        {tab === 'summary'      && <SummaryTab meals={meals} activities={activities} antioxScore={antioxScore} calGoal={calGoal} onGoalChange={setCalGoal} />}
        {tab === 'ai'           && <AICoachTab meals={meals} activities={activities} antioxScore={antioxScore} calGoal={calGoal} mode={profile?.activeMode ?? 'balanced'} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
