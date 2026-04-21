import React, { useState, useEffect } from 'react';

export function ScoreRing({ score }) {
  const [visible, setVisible] = useState(0);
  
  useEffect(() => {
    let s = 0;
    const t = setInterval(()=>{ 
      s = Math.min(s+2, score); 
      setVisible(s); 
      if(s >= score) clearInterval(t); 
    }, 20);
    return () => clearInterval(t);
  }, [score]);
  
  const color = score >= 75 ? '#39ff14' : score >= 50 ? '#00f5ff' : '#ff006e';
  const verdict = score >= 80 ? 'STRONG MATCH' : score >= 60 ? 'GOOD MATCH' : score >= 40 ? 'PARTIAL MATCH' : 'WEAK MATCH';
  
  const ring = (
    <div className="relative w-[160px] h-[160px] mx-auto">
      <div 
        className="w-[160px] h-[160px] rounded-full flex items-center justify-center relative" 
        style={{
          background: `conic-gradient(${color} ${visible}%, var(--tw-colors-bg-deep, #040c12) 0%)`
        }}
      >
        <div className="absolute inset-[12px] rounded-full bg-[#000a14]"></div>
        <div className="relative z-10 font-display text-[3rem] font-bold leading-none drop-shadow-md" style={{color, textShadow: `0 0 15px ${color}`}}>
          {visible}<span className="text-[1.25rem] font-normal">%</span>
        </div>
      </div>
      <div className="font-mono text-[0.95rem] text-text-muted mt-4 text-center tracking-widest font-semibold">MATCH SCORE</div>
    </div>
  );
  
  return { ring, verdict, color };
}
