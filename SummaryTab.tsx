import { MealEntry, ActivityEntry } from '../types';

interface Props {
  meals: MealEntry[];
  activities: ActivityEntry[];
  antioxScore: number;
  calGoal: number;
  onGoalChange: (n: number) => void;
}

export default function SummaryTab({ meals, activities, antioxScore, calGoal, onGoalChange }: Props) {
  const calIn   = meals.reduce((s, m) => s + m.cal, 0);
  const calOut  = activities.reduce((s, a) => s + a.cal, 0);
  const net     = calIn - calOut;
  const actMin  = activities.reduce((s, a) => s + a.dur, 0);
  const pct     = Math.min(120, Math.round((calIn / (calGoal || 1)) * 100));
  const barColor = pct > 110 ? '#E24B4A' : pct > 88 ? '#EF9F27' : '#1D9E75';
  const deficit  = calGoal - net;

  const antioxLevel = antioxScore >= 400 ? { label: '🌟 Excellent antioxidant day!', cls: 'bg-green-50 text-green-800 border-green-300' }
    : antioxScore >= 200 ? { label: '👍 Good antioxidant intake', cls: 'bg-amber-50 text-amber-800 border-amber-300' }
    : antioxScore > 0    ? { label: '🫐 Eat more colourful whole foods', cls: 'bg-red-50 text-red-700 border-red-200' }
    : { label: '🫐 Log antioxidant foods to see your score', cls: 'bg-gray-50 text-gray-500 border-gray-200' };

  return (
    <div className="p-4 space-y-3 fade-up">
      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { val: calIn,       label: 'kcal eaten',      sub: 'today' },
          { val: calOut,      label: 'kcal burned',     sub: 'from exercise' },
          { val: net,         label: 'net calories',    sub: deficit > 0 ? `${deficit} under goal` : `${Math.abs(deficit)} over goal` },
          { val: antioxScore, label: 'antioxidant pts', sub: antioxScore >= 400 ? 'excellent' : antioxScore >= 200 ? 'good' : 'keep going' },
        ].map(m => (
          <div key={m.label} className="rounded-xl p-3.5 text-center" style={{ background: '#F4F2EC' }}>
            <div className="font-display text-3xl" style={{ color: '#1A1A14' }}>{m.val}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: '#6B6B5E' }}>{m.label}</div>
            <div className="text-xs mt-0.5" style={{ color: '#9E9E90' }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Calorie goal */}
      <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#9E9E90' }}>daily calorie goal</p>
          <input type="number" value={calGoal} onChange={e => onGoalChange(parseInt(e.target.value)||2000)}
            className="w-24 text-center rounded-lg py-1 text-sm outline-none font-medium"
            style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)', color: '#1A1A14' }} min={500} />
        </div>
        <div className="rounded-full overflow-hidden h-2.5" style={{ background: '#F4F2EC' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100,pct)}%`, background: barColor }} />
        </div>
        <div className="text-xs mt-1.5" style={{ color: '#6B6B5E' }}>{calIn} of {calGoal} kcal ({pct}%)</div>
      </div>

      {/* Antioxidant status */}
      <div className={`rounded-xl p-3.5 border text-sm ${antioxLevel.cls}`}>
        {antioxLevel.label}
      </div>

      {/* At a glance */}
      <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#9E9E90' }}>today at a glance</p>
        {[
          ['Meals logged',       meals.length],
          ['Activities logged',  activities.length],
          ['Active time',        `${actMin} min`],
          ['Calorie balance',    net >= 0 ? `+${net} kcal` : `${net} kcal`],
          ['Antioxidant score',  `${antioxScore} pts`],
        ].map(([label, val]) => (
          <div key={label as string} className="flex justify-between items-center py-2 border-b last:border-0 text-sm" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <span style={{ color: '#6B6B5E' }}>{label}</span>
            <span className="font-medium" style={{ color: '#1A1A14' }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Balance banner */}
      {(meals.length > 0 || activities.length > 0) && (
        <div className="rounded-xl p-4 text-sm leading-relaxed"
          style={{
            background: deficit > 250 ? '#EAF3DE' : deficit < -250 ? '#FAECE7' : '#FAEEDA',
            color:      deficit > 250 ? '#3B6D11' : deficit < -250 ? '#993C1D' : '#854F0B',
            borderLeft: `3px solid ${deficit > 250 ? '#639922' : deficit < -250 ? '#D85A30' : '#EF9F27'}`,
          }}>
          {deficit > 250
            ? `✅ You're in a ${deficit} kcal deficit — great for gradual, healthy weight loss.`
            : deficit < -250
            ? `⚠️ You're ${Math.abs(deficit)} kcal over your goal. A short walk or lighter dinner will help.`
            : `⚖️ You're nicely balanced today! Keep the consistency going.`}
        </div>
      )}
    </div>
  );
}
