import { useAuth } from '../contexts/AuthContext';

interface Props {
  calIn: number;
  calOut: number;
  actMin: number;
  antioxScore: number;
}

const MODE_CONFIG = {
  balanced: { label: 'Balanced', color: '#639922', bg: 'rgba(255,255,255,0.12)' },
  dieting:  { label: 'Dieting',  color: '#EF9F27', bg: 'rgba(255,255,255,0.12)' },
  digestion:{ label: 'Digestion',color: '#1D9E75', bg: 'rgba(255,255,255,0.12)' },
};

export default function HeroHeader({ calIn, calOut, actMin, antioxScore }: Props) {
  const { profile, signOutUser } = useAuth();
  const mode = profile?.activeMode ?? 'balanced';
  const mc = MODE_CONFIG[mode];

  return (
    <div className="relative overflow-hidden px-5 pt-5 pb-4" style={{ background: '#27500A' }}>
      {/* bg circles */}
      <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="absolute -bottom-10 left-1/3 w-36 h-36 rounded-full" style={{ background: 'rgba(255,255,255,0.03)' }} />

      {/* Top row */}
      <div className="flex items-center justify-between mb-4 relative">
        <div>
          <div className="font-display text-2xl text-white leading-none">FitStart 🌱</div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Hi, {profile?.displayName?.split(' ')[0] ?? 'there'}!
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: mc.bg, color: '#C0DD97', border: '0.5px solid rgba(255,255,255,0.2)' }}>
            {mc.label} mode
          </span>
          {profile?.photoURL
            ? <img src={profile.photoURL} className="w-8 h-8 rounded-full cursor-pointer opacity-90 hover:opacity-100" onClick={signOutUser} alt="avatar" />
            : <button onClick={signOutUser} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                {(profile?.displayName ?? 'U')[0]}
              </button>
          }
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-2 relative">
        {[
          { val: calIn,        label: 'kcal eaten'  },
          { val: calOut,       label: 'kcal burned' },
          { val: actMin,       label: 'active mins' },
          { val: antioxScore,  label: 'antioxidant' },
        ].map(s => (
          <div key={s.label} className="rounded-xl px-2 py-2.5 text-center" style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.12)' }}>
            <div className="font-display text-xl text-white leading-none">{s.val}</div>
            <div className="text-xs mt-0.5 leading-tight" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
