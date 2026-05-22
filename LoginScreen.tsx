import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#FAFAF7' }}>
      <div className="w-full max-w-sm fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-display text-5xl mb-2" style={{ color: '#27500A' }}>
            Fit<span style={{ color: '#639922' }}>Start</span>
          </div>
          <div className="text-sm font-light" style={{ color: '#9E9E90' }}>
            Your daily health &amp; antioxidant companion
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {['🥗 Meal Tracking', '🏃 Activity Log', '🫐 Antioxidant Score', '✨ AI Coach'].map(f => (
            <span key={f} className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: '#EAF3DE', color: '#3B6D11' }}>{f}</span>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 text-center"
          style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
          <div className="text-2xl mb-3">👋</div>
          <h2 className="font-display text-xl mb-1" style={{ color: '#1A1A14' }}>Welcome, beginner!</h2>
          <p className="text-sm mb-6" style={{ color: '#6B6B5E' }}>
            Sign in to save your logs, track antioxidant scores, and get AI-powered health insights.
          </p>
          <button
            onClick={signIn}
            className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-xl font-medium text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#27500A', color: '#fff' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="rgba(255,255,255,0.7)" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="rgba(255,255,255,0.85)" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
          <p className="text-xs mt-4" style={{ color: '#9E9E90' }}>
            Your data is saved securely to your account
          </p>
        </div>
      </div>
    </div>
  );
}
