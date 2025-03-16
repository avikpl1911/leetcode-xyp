import React from 'react';

function RuntimeDisplay({ runtime, percentile }) {
  return (
    <div style={{ 
      backgroundColor: '#282c34', // Dark background like in the image
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      fontFamily: 'sans-serif',
      width: '100%', // Adjust as needed
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      marginTop:"10px"
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span role="img" aria-label="clock" style={{ marginRight: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </span>
          <span>Runtime</span>
        </div>
        <span role="button" aria-label="info" style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </span>
      </div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
        {runtime} ms <span style={{ fontSize: '16px', fontWeight: 'normal' }}>Beats {percentile}%</span>
      </div>
      <div style={{ marginTop: '16px', color: '#61dafb', cursor: 'pointer' }}>
        
      </div>
    </div>
  );
}

export default RuntimeDisplay;