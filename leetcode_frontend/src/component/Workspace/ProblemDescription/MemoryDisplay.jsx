import React from 'react';

function MemoryDisplay({ memory, percentile }) {
  return (
    <div style={{
      backgroundColor: '#282c34', // Dark background
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      fontFamily: 'sans-serif',
      width: '100%', // Adjust as needed
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      marginTop:"8px"
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span role="img" aria-label="memory" style={{ marginRight: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="2" y1="10" x2="22" y2="10"></line></svg>
        </span>
        <span>Memory</span>
      </div>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {memory} MB <span style={{ fontSize: '16px', fontWeight: 'normal' }}>Beats {percentile}%</span>
      </div>
      <div style={{ marginTop: '16px', color: '#61dafb', cursor: 'pointer' }}>
        
      </div>
    </div>
  );
}

export default MemoryDisplay;