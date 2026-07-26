import React from 'react';

export function DistrictDetailCard({
  selectedDistrict,
  analysis,
  onClose,
  onJumpToComplement,
  onGoogleSearch,
}) {
  if (!selectedDistrict || !analysis) return null;

  return (
    <div className="detail-card" onClick={(e) => e.stopPropagation()}>
      {/* 閉じるボタン */}
      <button className="close-btn" onClick={onClose}>✕</button>

      {/* ヘッダー */}
      <header className="card-header">
        <span className="district-code">{selectedDistrict.code}</span>
        <h2>{selectedDistrict.name}</h2>
      </header>

      {/* ボディ（強み・補完提案） */}
      <div className="card-body">
        {/* 🏆 強み情報 */}
        <div className="status-badge best">
          <span className="badge-label">🏆 ここが強み</span>
          <div className="status-content">
            <span className="emoji">{analysis.best.meta.emoji}</span>
            <span className="name">{analysis.best.meta.label}</span>
            <span className="score">{analysis.best.score}点</span>
          </div>
        </div>

        {/* 💡 弱点補完提案 */}
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

      {/* フッター（Google検索ボタン） */}
      <footer className="card-footer">
        <button
          className="search-btn"
          onClick={(e) => onGoogleSearch(e, selectedDistrict.name, analysis.best.meta.label)}
        >
          🔍 Googleで「{selectedDistrict.name} {analysis.best.meta.label}」を探す
        </button>
      </footer>
    </div>
  );
}
