import React, { useState, useEffect } from 'react';

export function SkillBars({ data }) {
  const [filled, setFilled] = useState(false);
  
  useEffect(() => { 
    const t = setTimeout(()=>setFilled(true), 100); 
    return () => clearTimeout(t); 
  }, []);
  
  return (
    <div>
      {data.map((item,i) => (
        <div className="mb-4" key={i}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[1rem] text-text-primary font-semibold">{item.skill}</span>
            <span className="font-mono text-[0.95rem] text-text-sec">{item.score}%</span>
          </div>
          <div className="h-[6px] rounded-full bg-[#040c12] border border-border relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-dark to-cyan transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]" 
              style={{width: filled ? `${item.score}%` : '0%'}} 
            />
          </div>
        </div>
      ))}
    </div>
  );
}
