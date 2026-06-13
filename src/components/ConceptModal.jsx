import React from 'react';

function ConceptModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ color: 'var(--primary-dark)', marginTop: 0 }}>💡 문단이란 무엇일까요?</h2>
        
        <div style={{ background: '#f3f4f6', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <strong>문단</strong>은 몇 개의 문장이 모여서 하나의 중심 생각을 나타내는 덩어리입니다.
        </div>

        <h3>✅ 문단을 나누는 방법</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>시간이나 장소가 바뀔 때 나눕니다.</li>
          <li>글쓴이의 생각이나 느낌이 바뀔 때 나눕니다.</li>
          <li>새로운 인물이 등장하거나 화제가 바뀔 때 나눕니다.</li>
        </ul>

        <div style={{ background: '#fffbeb', padding: '15px', borderLeft: '4px solid #f59e0b', margin: '20px 0' }}>
          <strong>예시:</strong><br/>
          (문단1) 오늘 아침에는 비가 내렸다. 우산을 쓰고 학교에 갔다.<br/>
          <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>-- 장소가 학교에서 교실로 바뀜 --</span><br/>
          (문단2) 교실에 도착하니 친구들이 벌써 와 있었다. 우리는 재미있게 놀았다.
        </div>

        <button 
          className="btn" 
          style={{ width: '100%', marginTop: '10px' }}
          onClick={onClose}
        >
          알겠어요!
        </button>
      </div>
    </div>
  );
}

export default ConceptModal;
