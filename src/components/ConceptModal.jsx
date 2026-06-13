import React from 'react';

function ConceptModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="heading">💡 문단이란 무엇일까요?</h2>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--ink-muted)' }}
          >
            ×
          </button>
        </div>
        
        <div style={{ lineHeight: '1.8', color: 'var(--ink-secondary)' }}>
          <p style={{ marginBottom: '16px' }}>
            <strong>문단</strong>은 글에서 <strong>생각이나 내용이 한 덩어리로 묶이는 부분</strong>을 말해요.
          </p>
          <div className="feature-card" style={{ marginBottom: '24px', background: 'var(--canvas-soft)' }}>
            <h3 className="title" style={{ fontSize: '16px', marginBottom: '8px' }}>새로운 문단은 언제 시작할까요?</h3>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>시간이나 장소가 바뀔 때</li>
              <li>등장인물이 바뀔 때</li>
              <li>이야기의 중심 내용이 바뀔 때</li>
            </ul>
          </div>
        </div>

        <button 
          className="btn-primary" 
          style={{ width: '100%' }}
          onClick={onClose}
        >
          이해했어요!
        </button>
      </div>
    </div>
  );
}

export default ConceptModal;
