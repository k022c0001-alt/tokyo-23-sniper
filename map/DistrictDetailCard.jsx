import React, { useState, useEffect } from 'react';

export function DistrictDetailCard({
  selectedDistrict,
  analysis,
  onClose,
  onJumpToComplement,
}) {
  if (!selectedDistrict || !analysis) return null;

  // 演出1: マッチ度ゲージのカウントアップ用State
  const [matchScore, setMatchScore] = useState(0);
  
  // 仮のマッチ度計算（実際はユーザー属性等に応じて算出）
  const targetMatchScore = Math.min(99, Math.round(analysis.best.score * 1.1));

  useEffect(() => {
    setMatchScore(0);
    const timer = setTimeout(() => {
      setMatchScore(targetMatchScore);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedDistrict, targetMatchScore]);

  // 演出4: Google Mapsへのアクセス（経路検索）
  const handleOpenGoogleMaps = (e, districtName) => {
    e.stopPropagation();
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`東京都${districtName}`)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="detail-card" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={onClose}>✕</button>

      <header className="card-header">
        <span className="district-code">{selectedDistrict.code}</span>
        <h2>{selectedDistrict.name}</h2>
      </header>

      {/* 🌟 演出1: マッチ度ゲージ */}
      <div className="match-section">
        <div className="match-header">
          <span className="match-label">あなたとの相性度</span>
          <span className="match-value">{matchScore}%</span>
        </div>
        <div className="gauge-background">
          <div 
            className="gauge-fill" 
            style={{ 
              width: `${matchScore}%`,
              transition: 'width 0.8s cubic-bezier(0.1, 0.9, 0.2, 1)' 
            }} 
          />
        </div>
      </div>

      <div className="card-body">
        {/* 強み情報 */}
        <div className="status-badge best">
          <span className="badge-label">🏆 ここが強み</span>
          <div className="status-content">
            <span className="emoji">{analysis.best.meta.emoji}</span>
            <span className="name">{analysis.best.meta.label}</span>
            <span className="score">{analysis.best.score}点</span>
          </div>
        </div>

        {/* 弱点補完提案 */}
        {analysis.complement && (
          <div className="complement-box">
            <div className="complement-header">
              💡 <strong>{analysis.worst.meta.emoji} {analysis.worst.meta.label}</strong> を補完したいなら
            </div>
            <div className="complement-card">
              <div className="complement-info">
                <span className="comp-name">{analysis.complement.name}</span>
                <span className="comp-desc">
                  （{analysis.worst.meta.label} スコア：<strong>{analysis.complement.scores[analysis.worst.key]}点</strong>）
                </span>
              </div>
              <button
                className="jump-btn"
                onClick={(e) => onJumpToComplement(e, analysis.complement)}
              >
                {analysis.complement.name}へジャンプ ↗
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🌟 演出4: Googleマップ連携ボタン */}
      <footer className="card-footer">
        <button
          className="map-btn"
          onClick={(e) => handleOpenGoogleMaps(e, selectedDistrict.name)}
        >
          📍 Googleマップで「{selectedDistrict.name}」を開く
        </button>
      </footer>
    </div>
  );
}
