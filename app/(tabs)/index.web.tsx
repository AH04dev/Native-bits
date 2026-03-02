import * as React from 'react';

const frameStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  width: '100vw',
  height: '100vh',
  border: 'none',
  display: 'block',
  backgroundColor: '#03030c',
  zIndex: 9999,
};

export default function WebLandingPage() {
  return (
    <iframe
      title="Crossbits Landing"
      src="/crossbits-landing.html"
      style={frameStyle}
      allow="clipboard-write"
    />
  );
}
