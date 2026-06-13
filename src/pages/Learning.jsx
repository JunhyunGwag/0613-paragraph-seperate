import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { problems } from '../data/problems';

function Learning() {
  const location = useLocation();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [splitMarks, setSplitMarks] = useState([]);

  useEffect(() => {
    const { type, level } = location.state || {};
    if (!type || !level) {
      navigate('/');
      return;
    }
    
    // 선택된 종류와 수준에 맞는 문제 불러오기 (없으면 임시 데이터 제공)
    const typeProblems = problems[type]?.[level];
    if (typeProblems && typeProblems.length > 0) {
      setProblem(typeProblems[0]);
    } else {
      // 데이터가 없을 때를 대비한 기본 임시 데이터 제공
      setProblem({
        id: 'fallback',
        title: '임시 연습 문제',
        sentences: [
          "이것은 임시로 제공되는 연습 문제입니다.",
          "현재 선택하신 종류와 수준에 맞는 데이터가 아직 등록되지 않았습니다.",
          "하지만 문단을 나누는 연습은 여기서도 해볼 수 있습니다.",
          "문맥이 바뀌는 곳을 찾아 클릭해보세요."
        ],
        splitIndices: [2],
        explanation: "첫 번째 문단은 임시 문제임을 알리는 내용이고, 두 번째 문단은 연습 방법을 안내하는 내용입니다."
      });
    }
  }, [location, navigate]);

  if (!problem) return <div>로딩 중...</div>;

  const toggleSplit = (index) => {
    setSplitMarks(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleSubmit = () => {
    navigate('/result', {
      state: {
        problem,
        userSplits: splitMarks,
        type: location.state.type,
        level: location.state.level,
        nickname: location.state.nickname
      }
    });
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 className="heading">📖 문단 나누기 연습</h2>
        <button 
          className="btn-utility" 
          onClick={() => navigate('/')}
        >
          돌아가기
        </button>
      </div>

      <div className="feature-card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="title">{problem.title}</h3>
          <span style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '500', background: 'rgba(0, 117, 222, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
            {location.state.nickname} 님의 도전
          </span>
        </div>
        <p style={{ margin: 0, color: 'var(--ink-muted)', marginBottom: '24px' }}>
          글을 읽고 문단이 나뉘어야 할 곳을 클릭하세요. (총 {problem.correctSplits.length}곳)
        </p>

        <div style={{ fontSize: '16px', lineHeight: '2' }}>
          {problem.sentences.map((sentence, index) => {
            const isSplitActive = splitMarks.includes(index);
            const isFirstSentence = index === 0;

            return (
              <React.Fragment key={index}>
                {!isFirstSentence && (
                  <span 
                    className={`split-marker ${isSplitActive ? 'active' : ''}`}
                    onClick={() => toggleSplit(index)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      margin: '0 8px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      background: isSplitActive ? 'var(--primary)' : 'var(--canvas-soft)',
                      color: isSplitActive ? '#fff' : 'transparent',
                      transition: 'all 0.2s',
                      verticalAlign: 'middle'
                    }}
                    title="이곳을 클릭하여 문단을 나누세요"
                  >
                    ↵
                  </span>
                )}
                
                {isSplitActive && <br />}
                
                <span>{sentence}</span>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          className="btn-primary" 
          onClick={handleSubmit}
        >
          제출하기
        </button>
      </div>
    </div>
  );
}

export default Learning;
