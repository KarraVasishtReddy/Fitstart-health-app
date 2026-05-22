import { useState } from 'react';
import { ActivityEntry, ActivityType } from '../types';

const ACT_EMOJI: Record<ActivityType, string> = {
  Walking: '🚶', Cardio: '🏃', Strength: '💪', Yoga: '🧘', Sports: '⚽', Other: '✨',
};

interface Props {
  activities: ActivityEntry[];
  onChange: (a: ActivityEntry[]) => void;
}

export default function ActivityTab({ activities, onChange }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<ActivityType>('Walking');
  const [dur, setDur] = useState('');
  const [cal, setCal] = useState('');

  const add = () => {
    if (!name.trim()) return;
    onChange([...activities, { id: Date.now(), name: name.trim(), type, dur: parseInt(dur)||0, cal: parseInt(cal)||0 }]);
    setName(''); setDur(''); setCal('');
  };
  const remove = (id: number) => onChange(activities.filter(a => a.id !== id));

  return (
    <div className="p-4 space-y-3 fade-up">
      <div className="rounded-xl p-3.5 flex gap-3" style={{ background: '#EAF3DE', border: '1px solid rgba(59,109,17,0.12)' }}>
        <span className="text-xl flex-shrink-0">🏃</span>
        <p className="text-sm leading-relaxed" style={{ color: '#3B6D11' }}>
          <strong>Any movement counts!</strong> A 10-minute walk is a win. Log your activity and celebrate every step.
        </p>
      </div>

      <div className="rounded-2xl p-4 space-y-2.5" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#9E9E90' }}>log an activity</p>
        <input className="w-full rounded-lg px-3 py-2 text-sm outline-none" placeholder="Activity name — e.g. morning walk" value={name} onChange={e => setName(e.target.value)}
          style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)' }} onKeyDown={e => e.key === 'Enter' && add()} />
        <div className="flex gap-2">
          <select className="flex-1 rounded-lg px-3 py-2 text-sm outline-none" value={type} onChange={e => setType(e.target.value as ActivityType)}
            style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)' }}>
            {(['Walking','Cardio','Strength','Yoga','Sports','Other'] as ActivityType[]).map(t => (
              <option key={t} value={t}>{ACT_EMOJI[t]} {t}</option>
            ))}
          </select>
          <input type="number" className="w-20 rounded-lg px-3 py-2 text-sm outline-none" placeholder="mins" value={dur} onChange={e => setDur(e.target.value)}
            style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)' }} min={0} />
          <input type="number" className="w-24 rounded-lg px-3 py-2 text-sm outline-none" placeholder="kcal" value={cal} onChange={e => setCal(e.target.value)}
            style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)' }} min={0} />
        </div>
        <button onClick={add} className="w-full py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: '#27500A' }}>+ Add Activity</button>
      </div>

      <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#9E9E90' }}>today's activities</p>
        {activities.length === 0
          ? <div className="text-center py-8 text-sm" style={{ color: '#9E9E90' }}>🏅 No activities yet — every move matters!</div>
          : activities.map(a => (
            <div key={a.id} className="flex items-start justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
              <div>
                <div className="text-sm font-medium">{a.name}</div>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#E1F5EE', color: '#0F6E56' }}>{ACT_EMOJI[a.type]} {a.type}</span>
                  {a.dur > 0 && <span className="text-xs" style={{ color: '#6B6B5E' }}>{a.dur} min</span>}
                  {a.cal > 0 && <span className="text-xs" style={{ color: '#6B6B5E' }}>−{a.cal} kcal</span>}
                </div>
              </div>
              <button onClick={() => remove(a.id)} className="text-lg leading-none px-1.5 py-0.5 rounded transition-colors hover:text-red-400" style={{ color: '#9E9E90' }}>×</button>
            </div>
          ))
        }
      </div>

      <div className="rounded-xl p-4" style={{ background: '#27500A' }}>
        <div className="text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>💡 BEGINNER TIP</div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
          Aim for just 20–30 minutes of movement a day to start. Walking counts. Stretching counts. Anything that gets your body moving is progress.
        </p>
      </div>
    </div>
  );
}
