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
    <div>
              )}
              
              {/* 구분 기호가 클릭되어 활성화된 경우 실제 줄바꿈(문단 분리) 효과 제공 */}
              {isSplitActive && <span className="paragraph-break"></span>}
              
              <span>{sentence} </span>
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          className="btn" 
          style={{ fontSize: '1.25rem', padding: '15px 40px' }}
          onClick={handleSubmit}
        >
          정답 확인하기 ✔️
        </button>
      </div>
    </div>
  );
}

export default Learning;
