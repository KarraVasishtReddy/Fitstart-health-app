import { useState } from 'react';
import { MealEntry, MealType } from '../types';

const MEAL_BADGE: Record<MealType, string> = {
  Breakfast: 'bg-amber-100 text-amber-800',
  Lunch: 'bg-green-100 text-green-800',
  Dinner: 'bg-teal-100 text-teal-800',
  Snack: 'bg-red-100 text-red-800',
};
const MEAL_EMOJI: Record<MealType, string> = {
  Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙', Snack: '🍎',
};

interface Props {
  meals: MealEntry[];
  onChange: (meals: MealEntry[]) => void;
}

export default function MealsTab({ meals, onChange }: Props) {
  const [name, setName] = useState('');
  const [cal, setCal] = useState('');
  const [mealType, setMealType] = useState<MealType>('Breakfast');
  const [notes, setNotes] = useState('');

  const add = () => {
    if (!name.trim()) return;
    onChange([...meals, { id: Date.now(), name: name.trim(), cal: parseInt(cal) || 0, meal: mealType, notes: notes.trim() }]);
    setName(''); setCal(''); setNotes('');
  };

  const remove = (id: number) => onChange(meals.filter(m => m.id !== id));

  return (
    <div className="p-4 space-y-3 fade-up">
      {/* Tip banner */}
      <div className="rounded-xl p-3.5 flex gap-3" style={{ background: '#EAF3DE', border: '1px solid rgba(59,109,17,0.12)' }}>
        <span className="text-xl flex-shrink-0">👋</span>
        <p className="text-sm leading-relaxed" style={{ color: '#3B6D11' }}>
          <strong>Beginner tip:</strong> Don't stress about exact calories — even rough estimates help you build awareness over time.
        </p>
      </div>

      {/* Add form */}
      <div className="rounded-2xl p-4 space-y-2.5" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#9E9E90' }}>add a meal</p>
        <input className="w-full rounded-lg px-3 py-2 text-sm outline-none" placeholder="What did you eat?" value={name} onChange={e => setName(e.target.value)}
          style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)' }} onKeyDown={e => e.key === 'Enter' && add()} />
        <div className="flex gap-2">
          <select className="flex-1 rounded-lg px-3 py-2 text-sm outline-none" value={mealType} onChange={e => setMealType(e.target.value as MealType)}
            style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)' }}>
            {(['Breakfast','Lunch','Dinner','Snack'] as MealType[]).map(m => (
              <option key={m} value={m}>{MEAL_EMOJI[m]} {m}</option>
            ))}
          </select>
          <input type="number" className="w-24 rounded-lg px-3 py-2 text-sm outline-none" placeholder="kcal" value={cal} onChange={e => setCal(e.target.value)}
            style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)' }} min={0} />
        </div>
        <div className="flex gap-2">
          <input className="flex-1 rounded-lg px-3 py-2 text-sm outline-none" placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)}
            style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)' }} />
          <button onClick={add} className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#27500A' }}>+ Add</button>
        </div>
      </div>

      {/* Log */}
      <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#9E9E90' }}>today's meals</p>
        {meals.length === 0
          ? <div className="text-center py-8 text-sm" style={{ color: '#9E9E90' }}>🍽️ No meals yet — add your first one above!</div>
          : meals.map(m => (
            <div key={m.id} className="flex items-start justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
              <div>
                <div className="text-sm font-medium" style={{ color: '#1A1A14' }}>{m.name}</div>
                <div className="flex gap-1.5 mt-1 flex-wrap items-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${MEAL_BADGE[m.meal]}`}>{MEAL_EMOJI[m.meal]} {m.meal}</span>
                  {m.cal > 0 && <span className="text-xs" style={{ color: '#6B6B5E' }}>{m.cal} kcal</span>}
                  {m.notes && <span className="text-xs" style={{ color: '#9E9E90' }}>· {m.notes}</span>}
                </div>
              </div>
              <button onClick={() => remove(m.id)} className="text-lg leading-none px-1.5 py-0.5 rounded transition-colors hover:text-red-400" style={{ color: '#9E9E90' }}>×</button>
            </div>
          ))
        }
      </div>

      {/* Tip */}
      <div className="rounded-xl p-4" style={{ background: '#27500A' }}>
        <div className="text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>💡 BEGINNER TIP</div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
          Eating protein with every meal keeps you fuller longer. Think eggs, dal, paneer, chicken, or lentils.
        </p>
      </div>
    </div>
  );
}
