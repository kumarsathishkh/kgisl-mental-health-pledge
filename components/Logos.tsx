import React from 'react';

// CLSE Logo - Real Image Version (Inverted to fix black background)
export const CLSELogo: React.FC<{ className?: string, bgWhite?: boolean }> = ({ className = "h-14", bgWhite = false }) => {
  const [imageError, setImageError] = React.useState(false);

  if (imageError) {
    return <div className={`${className} bg-purple-200 rounded flex items-center justify-center text-xs font-bold text-kgislPurple`}>CLSE</div>;
  }

  return (
    <div className={`relative flex items-center justify-center ${bgWhite ? 'bg-white p-1 rounded-lg' : ''}`}>
      <img
        src="/images/clse-logo.png?v=1"
        alt="CLSE - Center for Life Skills Education"
        className={`${className} object-contain mix-blend-multiply filter invert`}
        onError={() => setImageError(true)}
      />
    </div>
  );
};

// KGiSL Logo - Real Image Version
export const KGiSLLogo: React.FC<{ className?: string, bgWhite?: boolean }> = ({ className = "h-14", bgWhite = false }) => {
  const [imageError, setImageError] = React.useState(false);

  if (imageError) {
    return <div className={`${className} bg-purple-200 rounded flex items-center justify-center text-xs font-bold text-kgislPurple`}>KGiSL</div>;
  }

  return (
    <div className={`relative flex items-center justify-center ${bgWhite ? 'bg-white p-1 rounded-lg' : ''}`}>
      <img
        src="/images/kgisl-logo.png?v=1"
        alt="KGiSL Educational Institutions"
        className={`${className} object-contain mix-blend-multiply`}
        onError={() => setImageError(true)}
      />
    </div>
  );
};

// Mini version for footer
export const CLSELogoMini: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <CLSELogo className={className} bgWhite />
);

export const KGiSLLogoMini: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <KGiSLLogo className={className} bgWhite />
);
