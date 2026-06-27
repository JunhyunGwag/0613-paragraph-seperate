import React, { useState } from 'react';
import PdfModal from './PdfModal';
import './Footer.css';

function Footer() {
  const [activePdf, setActivePdf] = useState(null); // { title, url }

  return (
    <>
      <footer className="app-footer">
        <div className="footer-links">
          <button 
            className="footer-link-btn"
            onClick={() => setActivePdf({ title: '이용약관', url: '/terms.pdf' })}
          >
            이용약관
          </button>
          <span className="footer-divider">|</span>
          <button 
            className="footer-link-btn bold"
            onClick={() => setActivePdf({ title: '개인정보처리방침', url: '/privacy.pdf' })}
          >
            개인정보처리방침
          </button>
        </div>
        
        <div className="footer-info">
          <p>정보관리책임자: 서울거원초 앙리쌤(02-6919-3754)</p>
          <p className="copyright">Copyright © 2026 by 앙리쌤. All rights reserved.</p>
        </div>
      </footer>

      {activePdf && (
        <PdfModal 
          title={activePdf.title} 
          pdfUrl={activePdf.url} 
          onClose={() => setActivePdf(null)} 
        />
      )}
    </>
  );
}

export default Footer;
