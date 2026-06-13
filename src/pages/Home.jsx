import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { problemTypes, problemLevels } from '../data/problems';
import ConceptModal from '../components/ConceptModal';

function Home() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStart = () => {
    if (selectedType && selectedLevel) {
      navigate('/learn', { state: { type: selectedType, level: selectedLevel } });
    } else {
      alert('글의 종류와 수준을 모두 선택해주세요!');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'var(--primary-dark)', marginBottom: '2rem' }}>
        📝 문단 나누기 연습장
      </h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>1. 글의 종류를 선택하세요</h2>
        <div className="grid grid-cols-2">
          {problemTypes.map((type) => (
            <div 
              key={type.id}
              className={`card ${selectedType === type.id ? 'selected' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{type.title}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>2. 글의 수준을 선택하세요</h2>
        <div className="grid grid-cols-2">
          {problemLevels.map((level) => (
            <div 
              key={level.id}
              className={`card ${selectedLevel === level.id ? 'selected' : ''}`}
              onClick={() => setSelectedLevel(level.id)}
            >
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{level.title}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{level.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <button 
          className="btn" 
          style={{ fontSize: '1.25rem', padding: '15px 40px', width: '100%', maxWidth: '300px' }}
          onClick={handleStart}
        >
          학습 시작하기 🚀
        </button>

        <button 
          className="btn" 
          style={{ fontSize: '1.1rem', padding: '12px 30px', width: '100%', maxWidth: '300px', background: 'var(--split-color)' }}
          onClick={() => setIsModalOpen(true)}
        >
          💡 문단의 개념 알아보기
        </button>
      </div>

      {isModalOpen && <ConceptModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Home;
