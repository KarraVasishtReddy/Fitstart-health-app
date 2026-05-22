import { useState } from 'react';
import { MealEntry, ActivityEntry, ActiveMode } from '../types';

interface Props {
  meals: MealEntry[];
  activities: ActivityEntry[];
  antioxScore: number;
  calGoal: number;
  mode: ActiveMode;
}

export default function AICoachTab({ meals, activities, antioxScore, calGoal, mode }: Props) {
  const [context, setContext] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!meals.length && !activities.length && !antioxScore) {
      setResult('Please log at least one meal, activity, or antioxidant food before running your analysis!');
      return;
    }
    setLoading(true);
    setResult('');

    const calIn  = meals.reduce((s, m) => s + m.cal, 0);
    const calOut = activities.reduce((s, a) => s + a.cal, 0);
    const foodList = meals.map(m => `- ${m.meal}: ${m.name}${m.cal ? ` (${m.cal} kcal)` : ''}${m.notes ? ` [${m.notes}]` : ''}`).join('\n') || 'None logged';
    const actList  = activities.map(a => `- ${a.name} (${a.type})${a.dur ? `, ${a.dur} min` : ''}${a.cal ? `, ~${a.cal} kcal burned` : ''}`).join('\n') || 'None logged';

    const prompt = `You are a warm, encouraging health coach specialising in helping fitness beginners. Avoid jargon. Speak like a supportive friend.

${context ? `About this person:\n${context}\n\n` : ''}Active mode: ${mode}
Daily calorie goal: ${calGoal} kcal
Calories consumed: ${calIn} kcal
Calories burned from exercise: ${calOut} kcal
Net calories: ${calIn - calOut} kcal
Antioxidant score today: ${antioxScore} pts

Meals:
${foodList}

Activities:
${actList}

Give them:
1. A warm, honest overall assessment (2–3 sentences). Celebrate wins.
2. 2–3 beginner-friendly, actionable improvements for tomorrow.
3. A note on their antioxidant intake — is ${antioxScore} pts good? What should they add?
4. One simple thing to do in the next hour to feel better.
5. An encouraging sign-off.

Under 280 words. No bullet symbols — use numbered points. Be warm, human, and beginner-friendly.`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      setResult((data.content ?? []).map((b: any) => b.text ?? '').join('') || 'No response. Please try again.');
    } catch {
      setResult('Could not connect to the AI coach. Please check your internet and try again.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-3 fade-up">
      {/* Intro */}
      <div className="rounded-xl p-4" style={{ background: '#27500A' }}>
        <div className="text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>✨ POWERED BY CLAUDE AI</div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
          Your personal AI coach reviews your meals, activity, and antioxidant intake — then gives beginner-friendly, actionable advice tailored to your day.
        </p>
      </div>

      {/* Context */}
      <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: '#9E9E90' }}>about you (optional)</p>
        <textarea
          className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
          style={{ background: '#F4F2EC', border: '1px solid rgba(0,0,0,0.07)', minHeight: 72 }}
          placeholder="Tell your coach about yourself — age, weight goal, diet type, fitness level..."
          value={context}
          onChange={e => setContext(e.target.value)}
        />
      </div>

      {/* CTA */}
      <button
        onClick={run}
        disabled={loading}
        className="w-full py-3 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
        style={{ background: '#27500A' }}
      >
        {loading
          ? <><span className="pulse-dot">●</span> Analysing your day...</>
          : <>✨ Get my AI health insights</>
        }
      </button>

      {/* Result */}
      {(result || loading) && (
        <div className="rounded-2xl p-4 fade-up" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#9E9E90' }}>your personalised insights</p>
          {loading
            ? <div className="text-sm" style={{ color: '#9E9E90', fontStyle: 'italic' }}>Your AI coach is reviewing your day…</div>
            : <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#1A1A14' }}>{result}</div>
          }
        </div>
      )}
    </div>
  );
}
