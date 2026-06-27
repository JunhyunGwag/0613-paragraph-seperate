import React from 'react';

function PdfModal({ title, pdfUrl, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 2000 }}>
      <div className="modal-card pdf-modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 className="heading" style={{ fontSize: '1.2rem', margin: 0 }}>{title}</h2>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: 'var(--ink-muted)' }}
          >
            ×
          </button>
        </div>
        
        <div className="pdf-container">
          <iframe 
            src={pdfUrl} 
            title={title}
            width="100%" 
            height="100%" 
            style={{ border: 'none', borderRadius: '8px' }}
          />
        </div>
      </div>
    </div>
  );
}

export default PdfModal;
