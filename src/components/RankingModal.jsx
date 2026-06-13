import React, { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';

function RankingModal({ onClose }) {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const q = query(collection(db, "learning_logs"));
        const querySnapshot = await getDocs(q);
        
        const userStats = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (!userStats[data.nickname]) {
            userStats[data.nickname] = { total: 0, correct: 0 };
          }
          userStats[data.nickname].total += 1;
          if (data.isCorrect) {
            userStats[data.nickname].correct += 1;
          }
        });

        const rankingArray = Object.keys(userStats).map(nickname => {
          const stats = userStats[nickname];
          const accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
          return {
            nickname,
            total: stats.total,
            correct: stats.correct,
            accuracy: accuracy
          };
        });

        // 1순위: 푼 문제 수 (학습량), 2순위: 정답률
        rankingArray.sort((a, b) => {
          if (b.total !== a.total) {
            return b.total - a.total;
          }
          return b.accuracy - a.accuracy;
        });

        setRankings(rankingArray);
      } catch (error) {
        console.error("Error fetching rankings: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="heading" style={{ marginBottom: '24px', textAlign: 'center' }}>🏆 명예의 전당</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--ink-muted)' }}>랭킹 데이터를 불러오는 중입니다...</p>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {rankings.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--ink-muted)' }}>아직 참여한 학생이 없습니다. 첫 번째로 도전해 보세요!</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--hairline)' }}>
                    <th style={{ padding: '12px 8px', color: 'var(--ink-muted)', fontWeight: '600', fontSize: '12px' }}>순위</th>
                    <th style={{ padding: '12px 8px', color: 'var(--ink-muted)', fontWeight: '600', fontSize: '12px' }}>닉네임</th>
                    <th style={{ padding: '12px 8px', color: 'var(--ink-muted)', fontWeight: '600', fontSize: '12px' }}>푼 문제 수</th>
                    <th style={{ padding: '12px 8px', color: 'var(--ink-muted)', fontWeight: '600', fontSize: '12px' }}>정답률</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((user, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid var(--hairline)' }}>
                      <td style={{ padding: '16px 8px', fontWeight: '600', color: index < 3 ? 'var(--primary)' : 'var(--ink)' }}>
                        {index + 1}
                      </td>
                      <td style={{ padding: '16px 8px', fontWeight: '500' }}>{user.nickname}</td>
                      <td style={{ padding: '16px 8px' }}>{user.total}</td>
                      <td style={{ padding: '16px 8px' }}>{user.accuracy.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        <button 
          className="btn-secondary" 
          style={{ width: '100%', marginTop: '32px' }}
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default RankingModal;
