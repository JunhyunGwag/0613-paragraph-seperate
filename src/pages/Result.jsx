import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { problem, userSplits } = location.state || {};

  if (!problem) {
    navigate('/');
    return null;
  }

  // 배열 정렬 (인덱스 순서대로)
  const sortedUserSplits = [...(userSplits || [])].sort((a, b) => a - b);
  const sortedCorrectSplits = [...problem.splitIndices].sort((a, b) => a - b);

  // 정답 비교 로직
  const isCorrect = 
    sortedUserSplits.length === sortedCorrectSplits.length &&
    sortedUserSplits.every((val, index) => val === sortedCorrectSplits[index]);

  const renderTextWithSplits = (sentences, splits, isCorrectAnswer) => {
    return (
      <div className="sentence-container" style={{ 
        background: isCorrectAnswer ? '#F0FDF4' : '#F9FAFB', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        border: `2px solid ${isCorrectAnswer ? '#4CAF50' : '#E5E7EB'}`,
        fontSize: '1.1rem',
        lineHeight: '2'
      }}>
        {sentences.map((sentence, index) => {
          const hasSplitBefore = splits.includes(index);
          return (
            <React.Fragment key={index}>
              {hasSplitBefore && (
                <>
                  <br/>
                  <span style={{ color: isCorrectAnswer ? '#4CAF50' : 'var(--split-color)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    [문단 나뉨]
                  </span>
                  <br/>
                </>
              )}
              <span>{sentence} </span>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: isCorrect ? '#4CAF50' : '#F59E0B' }}>
        {isCorrect ? '🎉 훌륭해요! 정답입니다!' : '👀 아쉽네요, 다시 한번 살펴볼까요?'}
      </h1>

      <div className="grid grid-cols-2" style={{ gap: '2rem', marginTop: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>내가 나눈 결과</h2>
          {renderTextWithSplits(problem.sentences, sortedUserSplits, false)}
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: '#4CAF50' }}>올바른 정답</h2>
          {renderTextWithSplits(problem.sentences, sortedCorrectSplits, true)}
        </div>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '2rem', 
        background: '#EFF6FF', 
        borderRadius: '16px',
        borderLeft: '6px solid var(--split-color)'
      }}>
        <h2 style={{ color: 'var(--split-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          👨‍🏫 선생님의 풀이
        </h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          {problem.explanation}
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button 
          className="btn" 
          style={{ fontSize: '1.2rem', padding: '12px 30px' }}
          onClick={() => navigate('/')}
        >
          다른 문제 풀러 가기 🏠
        </button>
      </div>
    </div>
  );
}

export default Result;
