import { useState, useEffect } from 'react';
import {
  collection, addDoc, deleteDoc, doc, query, where, orderBy, onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { AntioxidantLog, PortionSize, ActiveMode } from '../types';
import { ANTIOXIDANT_FOODS, FOOD_CATEGORIES, PORTION_LABELS, calcScore } from '../antioxidants';

const MODE_DESCRIPTIONS: Record<ActiveMode, string> = {
  balanced:  'Balanced daily antioxidant intake for overall wellness.',
  dieting:   'Higher multipliers on low-cal, high-antioxidant foods.',
  digestion: 'Prioritises gut-friendly antioxidant foods.',
};

export default function BellyBalanceTab() {
  const { user, profile, updateMode } = useAuth();
  const [logs, setLogs] = useState<AntioxidantLog[]>([]);
  const [selectedFood, setSelectedFood] = useState(ANTIOXIDANT_FOODS[0].id);
  const [portion, setPortion] = useState<PortionSize>('palm');
  const [category, setCategory] = useState('All');
  const [adding, setAdding] = useState(false);

  const mode = profile?.activeMode ?? 'balanced';

  // Real-time Firestore logs for today
  useEffect(() => {
    if (!user) return;
    const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
    const q = query(
      collection(db, 'users', user.uid, 'logs'),
      where('timestamp', '>=', startOfDay.getTime()),
      orderBy('timestamp', 'desc')
    );
    return onSnapshot(q, snap => {
      setLogs(snap.docs.map(d => d.data() as AntioxidantLog));
    });
  }, [user]);

  const filtered = category === 'All'
    ? ANTIOXIDANT_FOODS
    : ANTIOXIDANT_FOODS.filter(f => f.category === category);

  const food = ANTIOXIDANT_FOODS.find(f => f.id === selectedFood) ?? ANTIOXIDANT_FOODS[0];
  const preview = calcScore(food, portion, mode);

  const addLog = async () => {
    if (!user) return;
    setAdding(true);
    try {
      const id = `${user.uid}_${Date.now()}`;
      const score = calcScore(food, portion, mode);
      const entry: AntioxidantLog = { id, foodId: food.id, portion, timestamp: Date.now(), score, userId: user.uid };
      await addDoc(collection(db, 'users', user.uid, 'logs'), entry);
    } finally {
      setAdding(false);
    }
  };

  const removeLog = async (logId: string) => {
    if (!user) return;
    const snap = await import('firebase/firestore').then(m =>
      m.getDocs(m.query(collection(db, 'users', user.uid, 'logs'), m.where('id', '==', logId)))
    );
    snap.forEach(d => deleteDoc(doc(db, 'users', user.uid, 'logs', d.id)));
  };

  const todayScore = logs.reduce((s, l) => s + l.score, 0);
  const scoreLevel = todayScore >= 400 ? { label: 'Excellent', color: '#639922' }
    : todayScore >= 200 ? { label: 'Good', color: '#EF9F27' }
    : { label: 'Keep Going', color: '#D85A30' };

  const foodById = (id: string) => ANTIOXIDANT_FOODS.find(f => f.id === id);

  return (
    <div className="p-4 space-y-3 fade-up">
      {/* Score card */}
      <div className="rounded-2xl p-4" style={{ background: '#27500A' }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>TODAY'S ANTIOXIDANT SCORE</div>
            <div className="font-display text-4xl text-white">{todayScore}</div>
            <div className="text-xs mt-1 font-medium" style={{ color: scoreLevel.color }}>{scoreLevel.label}</div>
          </div>
          <div className="text-right">
            <div className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>ACTIVE MODE</div>
            <div className="flex flex-col gap-1">
              {(['balanced','dieting','digestion'] as ActiveMode[]).map(m => (
                <button key={m} onClick={() => updateMode(m)}
                  className="text-xs px-3 py-1 rounded-full text-left transition-all"
                  style={{
                    background: mode === m ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)',
                    color: mode === m ? '#fff' : 'rgba(255,255,255,0.45)',
                    border: `0.5px solid ${mode === m ? 'rgba(255,255,255,0.3)' : 'transparent'}`,
                    fontWeight: mode === m ? 500 : 400,
                  }}>
                  {m === 'balanced' ? '⚖️' : m === 'dieting' ? '🥗' : '🫄'} {m}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{MODE_DESCRIPTIONS[mode]}</p>
      </div>

      {/* Add food */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#9E9E90' }}>log antioxidant food</p>

        {/* Category filter */}
        <div className="flex gap-1.5 flex-wrap">
          {['All', ...FOOD_CATEGORIES].map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className="text-xs px-2.5 py-1 rounded-full transition-all"
              style={{
                background: category === c ? '#27500A' : '#F4F2EC',
                color: category === c ? '#fff' : '#6B6B5E',
                border: '1px solid transparent',
              }}>{c}</button>
          ))}
        </div>

        <select className="w-full rounded-lg px-3 py-2 text-sm outline-none" value={selectedFood} onChange={e => setSelectedFood(e.target.value)}
          style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)' }}>
          {filtered.map(f => (
            <option key={f.id} value={f.id}>{f.emoji} {f.name} — {f.description}</option>
          ))}
        </select>

        <div className="grid grid-cols-4 gap-2">
          {(Object.entries(PORTION_LABELS) as [PortionSize, string][]).map(([p, label]) => (
            <button key={p} onClick={() => setPortion(p)}
              className="rounded-lg py-2 px-1 text-xs text-center transition-all"
              style={{
                background: portion === p ? '#EAF3DE' : '#F4F2EC',
                border: `1.5px solid ${portion === p ? '#639922' : 'transparent'}`,
                color: portion === p ? '#27500A' : '#6B6B5E',
                fontWeight: portion === p ? 500 : 400,
              }}>{label}</button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm" style={{ color: '#6B6B5E' }}>
            Score preview: <span className="font-medium" style={{ color: '#27500A' }}>+{preview} pts</span>
          </div>
          <button onClick={addLog} disabled={adding}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            style={{ background: '#27500A' }}>
            {adding ? '...' : '+ Log Food'}
          </button>
        </div>
      </div>

      {/* Today's logs */}
      <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#9E9E90' }}>
          today's antioxidant log {logs.length > 0 && <span style={{ color: '#27500A' }}>({logs.length} entries)</span>}
        </p>
        {logs.length === 0
          ? <div className="text-center py-6 text-sm" style={{ color: '#9E9E90' }}>🫐 No antioxidant foods logged yet today!</div>
          : logs.map(l => {
            const f = foodById(l.foodId);
            return f ? (
              <div key={l.id} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{f.emoji}</span>
                  <div>
                    <div className="text-sm font-medium">{f.name}</div>
                    <div className="text-xs" style={{ color: '#9E9E90' }}>{PORTION_LABELS[l.portion]} · {f.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: '#639922' }}>+{l.score}</span>
                  <button onClick={() => removeLog(l.id)} className="text-lg leading-none px-1 rounded hover:text-red-400" style={{ color: '#9E9E90' }}>×</button>
                </div>
              </div>
            ) : null;
          })
        }
      </div>
    </div>
  );
}
