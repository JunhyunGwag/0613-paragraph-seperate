import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Learning from './pages/Learning';
import Result from './pages/Result';
import ConceptModal from './components/ConceptModal';
import EthicsGateModal from './components/EthicsGateModal';
import Footer from './components/Footer';

function App() {
  const [isEthicsModalOpen, setIsEthicsModalOpen] = useState(false);

  useEffect(() => {
    const hasAgreed = localStorage.getItem('ethics_agreed');
    if (!hasAgreed) {
      setIsEthicsModalOpen(true);
    }
  }, []);

  const handleEthicsAccept = () => {
    localStorage.setItem('ethics_agreed', 'true');
    setIsEthicsModalOpen(false);
  };

  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {isEthicsModalOpen && (
          <EthicsGateModal 
            onClose={() => {}} // 닫기 버튼으로 닫지 못하게 함
            onAccept={handleEthicsAccept}
          />
        )}
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learning />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
