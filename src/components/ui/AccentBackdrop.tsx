import React from 'react';

interface AccentBackdropProps {
  position?: 'top' | 'center' | 'bottom';
  colorFrom?: string; // tailwind class e.g. 'from-indigo-500/20'
  colorTo?: string;   // tailwind class e.g. 'to-purple-500/20'
  className?: string;
}

export const AccentBackdrop: React.FC<AccentBackdropProps> = ({
  position = 'center',
  colorFrom = 'from-indigo-500/15',
  colorTo = 'to-purple-500/15',
  className = ''
}) => {
  const posCls = position === 'top'
    ? 'top-0 translate-y-[-35%]'
    : position === 'bottom'
      ? 'bottom-0 translate-y-[35%]'
      : 'top-1/2 -translate-y-1/2';

  return (
    <div className={`pointer-events-none absolute inset-x-0 ${posCls} -z-10 ${className}`}>
      <div className={`mx-auto h-[420px] w-[80%] max-w-6xl blur-3xl rounded-full opacity-60 bg-gradient-to-br ${colorFrom} ${colorTo}`} />
    </div>
  );
};

export default AccentBackdrop;


