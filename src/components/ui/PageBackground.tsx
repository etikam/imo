import React from 'react';

interface PageBackgroundProps {
  variant?: 'default' | 'subtle';
}

export const PageBackground: React.FC<PageBackgroundProps> = ({ variant = 'default' }) => {
  return (
    <div className="fixed inset-0 -z-10">
      {variant === 'default' ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.25) 0%, transparent 45%)'
          }} />
        </>
      ) : (
        <div className="absolute inset-0 bg-slate-950" />
      )}
    </div>
  );
};

export default PageBackground;


