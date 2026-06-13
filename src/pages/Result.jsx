import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

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

  const hasSaved = useRef(false);

  useEffect(() => {
    const saveResult = async () => {
      if (hasSaved.current || !location.state?.nickname) return;
      hasSaved.current = true;

      try {
        await addDoc(collection(db, "learning_logs"), {
          nickname: location.state.nickname,
          problemId: problem.id,
          isCorrect: isCorrect,
          timestamp: serverTimestamp()
        });
      } catch (error) {
        console.error("Error saving log: ", error);
      }
    };

    saveResult();
  }, [problem.id, isCorrect, location.state?.nickname]);

  const renderTextWithSplits = (sentences, splits, isCorrectAnswer) => {
    return (
      <div className="feature-card" style={{ marginBottom: '24px', border: isCorrectAnswer ? '1px solid var(--primary)' : '1px solid var(--accent-pink)' }}>
        <h3 className="title" style={{ color: isCorrectAnswer ? 'var(--primary)' : 'var(--accent-pink)', marginBottom: '16px' }}>
          {isCorrectAnswer ? '정답' : '나의 답안'}
        </h3>
        <div style={{ fontSize: '16px', lineHeight: '2' }}>
          {sentences.map((sentence, index) => {
            const isSplit = splits.includes(index);
            return (
              <React.Fragment key={index}>
                <span>{sentence}</span>
                {index < sentences.length - 1 && isSplit && (
                  <span style={{ color: isCorrectAnswer ? 'var(--primary)' : 'var(--accent-pink)', margin: '0 8px', fontWeight: 'bold' }}>
                    ↵
                  </span>
                )}
                {isSplit && <br />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="display" style={{ color: isCorrect ? 'var(--primary)' : 'var(--accent-pink)' }}>
          {isCorrect ? '🎉 정답입니다!' : '😅 아쉽네요, 다시 도전해볼까요?'}
        </h1>
      </div>

      {renderTextWithSplits(problem.sentences, sortedCorrectSplits, true)}
      {!isCorrect && renderTextWithSplits(problem.sentences, sortedUserSplits, false)}

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
