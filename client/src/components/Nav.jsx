import React from 'react';

function Nav({ user, onLogin, onSignup, onLogout, page, onGoAnalyzer, onGoHome }) {
  return (
    <nav className="flex items-center justify-between px-8 h-[72px] border-b border-border bg-[#040c12]/95 backdrop-blur-md sticky top-0 z-[100]">
      <div className="font-display text-[1.5rem] font-bold text-cyan tracking-[0.1em] drop-shadow-[0_0_20px_#00f5ff] animate-flicker cursor-pointer [text-shadow:0_0_6px_rgba(0,255,255,0.4)]" onClick={onGoHome}>
        NEXUS<span className="text-magenta">CV</span>
      </div>
      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <span className="font-mono text-[1rem] text-cyan-dim border border-border px-4 py-1.5 rounded bg-[#000a1499]">{user.email.split('@')[0]}</span>
            {page !== 'analyzer' && (
              <button 
                className="bg-cyan border border-cyan text-bg-void font-ui text-[1rem] font-bold px-5 py-2 cursor-pointer tracking-wider transition-all uppercase hover:bg-cyan-dim rounded hover:shadow-[0_0_12px_rgba(0,255,255,0.4)]" 
                onClick={onGoAnalyzer}
              >
                Launch Analyzer
              </button>
            )}
            <button className="bg-transparent border-none text-text-muted font-mono text-[0.95rem] cursor-pointer hover:text-magenta transition-colors" onClick={onLogout}>[LOGOUT]</button>
          </>
        ) : (
          <>
            <button className="bg-transparent border border-border text-text-sec font-ui text-[1rem] font-semibold px-5 py-2 cursor-pointer tracking-wider transition-all uppercase hover:border-cyan hover:text-cyan hover:bg-cyan-dark rounded" onClick={onLogin}>Login</button>
            <button className="bg-cyan border border-cyan text-bg-void font-ui text-[1rem] font-bold px-5 py-2 cursor-pointer tracking-wider transition-all uppercase hover:bg-cyan-dim rounded hover:shadow-[0_0_12px_rgba(0,255,255,0.4)]" onClick={onSignup}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
