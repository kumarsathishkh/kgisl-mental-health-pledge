import React from 'react';

// CLSE Logo - Real Image Version
export const CLSELogo: React.FC<{ className?: string }> = ({ className = "h-14" }) => {
  const [imageError, setImageError] = React.useState(false);
  
  if (imageError) {
    return <div className={`${className} bg-purple-200 rounded flex items-center justify-center text-xs`}>CLSE</div>;
  }
  
  return (
    <img 
      src="/images/clse-logo.png?v=1" 
      alt="CLSE - Center for Life Skills Education" 
      className={`${className} object-contain`}
      onError={() => setImageError(true)}
    />
  );
};

// KGiSL Logo - Real Image Version
export const KGiSLLogo: React.FC<{ className?: string }> = ({ className = "h-14" }) => {
  const [imageError, setImageError] = React.useState(false);
  
  if (imageError) {
    return <div className={`${className} bg-purple-200 rounded flex items-center justify-center text-xs`}>KGiSL</div>;
  }
  
  return (
    <img 
      src="/images/kgisl-logo.png?v=1" 
      alt="KGiSL Educational Institutions" 
      className={`${className} object-contain`}
      onError={() => setImageError(true)}
    />
  );
};

// Mini version for footer
export const CLSELogoMini: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <CLSELogo className={className} />
);

export const KGiSLLogoMini: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <KGiSLLogo className={className} />
);
