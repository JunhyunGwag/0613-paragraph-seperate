import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { problemTypes, problemLevels } from '../data/problems';
import ConceptModal from '../components/ConceptModal';
import RankingModal from '../components/RankingModal';

function Home() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const savedNickname = localStorage.getItem('paragraph_nickname');
    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    localStorage.setItem('paragraph_nickname', e.target.value);
  };

  const handleStart = () => {
    if (!nickname.trim()) {
      alert('먼저 닉네임을 입력해주세요!');
      return;
    }
    if (selectedType && selectedLevel) {
      navigate('/learn', { state: { type: selectedType, level: selectedLevel, nickname } });
    } else {
      alert('글의 종류와 수준을 모두 선택해주세요!');
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 className="display">📝 문단 나누기 연습장</h1>
        <button 
          className="btn-utility" 
          onClick={() => setIsRankingOpen(true)}
        >
          🏆 랭킹 보기
        </button>
      </div>

      <div className="feature-card" style={{ marginBottom: '32px' }}>
        <h3 className="title" style={{ marginBottom: '12px' }}>👋 내 닉네임 설정</h3>
        <input 
          type="text" 
          className="text-input"
          placeholder="닉네임을 입력하세요 (예: 똑똑이)"
          value={nickname}
          onChange={handleNicknameChange}
        />
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 className="heading" style={{ marginBottom: '16px' }}>1. 글의 종류를 선택하세요</h2>
        <div className="grid-2">
          {problemTypes.map((type) => (
            <div 
              key={type.id}
              className={`feature-card ${selectedType === type.id ? 'selected' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              <h3 className="title" style={{ marginBottom: '8px' }}>{type.title}</h3>
              <p style={{ margin: 0, color: 'var(--ink-muted)' }}>{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 className="heading" style={{ marginBottom: '16px' }}>2. 글의 수준을 선택하세요</h2>
        <div className="grid-2">
          {problemLevels.map((level) => (
            <div 
              key={level.id}
              className={`feature-card ${selectedLevel === level.id ? 'selected' : ''}`}
              onClick={() => setSelectedLevel(level.id)}
            >
              <h3 className="title" style={{ marginBottom: '8px' }}>{level.title}</h3>
              <p style={{ margin: 0, color: 'var(--ink-muted)' }}>{level.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <button 
          className="btn-secondary"
          onClick={() => setIsModalOpen(true)}
        >
          💡 문단이 뭔가요?
        </button>
        <button 
          className="btn-primary" 
          onClick={handleStart}
        >
          🚀 학습 시작하기
        </button>
      </div>

      {isModalOpen && <ConceptModal onClose={() => setIsModalOpen(false)} />}
      {isRankingOpen && <RankingModal onClose={() => setIsRankingOpen(false)} />}
    </div>
  );
}

export default Home;
