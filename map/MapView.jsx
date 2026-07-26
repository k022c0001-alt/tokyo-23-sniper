import React, { useState } from 'react';
import { DistrictDetailCard } from './DistrictDetailCard';
import './MapView.css';

// 指標のメタ情報
const METRIC_LABELS = {
  park:          { label: 'みどり・公園',   emoji: '🌳' },
  disaster:      { label: '防災・避難所',   emoji: '🏠' },
  aed:           { label: 'AED・救急対応',  emoji: '💗' },
  sports:        { label: 'スポーツ・運動', emoji: '⚽' },
  childcare:     { label: '子育て・保育',   emoji: '👶' },
  commerce_life: { label: '普段の買い物',   emoji: '🛍️' },
  commerce_cbd:  { label: '繁華街の賑わい', emoji: '🌆' },
  library:       { label: '図書館',         emoji: '📚' },
};

// 解析ロジック（強み・弱点・補完区の算出）
function analyzeDistrict(selected, allDistricts) {
  if (!selected || !selected.scores) return null;

  const entries = Object.entries(selected.scores);
  if (entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const bestKey = sorted[0][0];
  const worstKey = sorted[sorted.length - 1][0];

  const complementDistrict = allDistricts
    .filter(d => d.code !== selected.code)
    .reduce((prev, curr) => {
      const prevScore = prev?.scores?.[worstKey] || 0;
      const currScore = curr?.scores?.[worstKey] || 0;
      return currScore > prevScore ? curr : prev;
    }, null);

  return {
    best: {
      key: bestKey,
      score: sorted[0][1],
      meta: METRIC_LABELS[bestKey] || { label: bestKey, emoji: '✨' }
    },
    worst: {
      key: worstKey,
      score: sorted[sorted.length - 1][1],
      meta: METRIC_LABELS[worstKey] || { label: worstKey, emoji: '⚠️' }
    },
    complement: complementDistrict
  };
}

export function MapView({ districtsData = [] }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // ① 背景クリック -> リセット
  const handleBackgroundClick = () => {
    setSelectedDistrict(null);
  };

  // ② 粒子クリック -> 選択
  const handleMarkerClick = (e, district) => {
    e.stopPropagation();
    setSelectedDistrict(district);
  };

  // ③ 補完区へジャンプ
  const handleJumpToComplement = (e, complementDistrict) => {
    e.stopPropagation();
    setSelectedDistrict(complementDistrict);
  };

  // ④ Google検索
  const handleGoogleSearch = (e, districtName, metricLabel) => {
    e.stopPropagation();
    const query = `${districtName} ${metricLabel}`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const analysis = analyzeDistrict(selectedDistrict, districtsData);

  return (
    <div className="map-view-container" onClick={handleBackgroundClick}>
      {/* 23区の粒子描画 */}
      <div className={`map-canvas ${selectedDistrict ? 'is-zoomed' : ''}`}>
        {districtsData.map((district) => {
          const isSelected = selectedDistrict?.code === district.code;
          return (
            <button
              key={district.code}
              className={`district-particle ${isSelected ? 'selected' : ''}`}
              style={{
                left: `${district.x || 50}%`,
                top: `${district.y || 50}%`
              }}
              onClick={(e) => handleMarkerClick(e, district)}
              title={district.name}
            >
              <span className="particle-icon">✨</span>
              <span className="particle-label">{district.name}</span>
            </button>
          );
        })}
      </div>

      {/* 🌟 独立したカードコンポーネントを接続 */}
      <DistrictDetailCard
        selectedDistrict={selectedDistrict}
        analysis={analysis}
        onClose={handleBackgroundClick}
        onJumpToComplement={handleJumpToComplement}
        onGoogleSearch={handleGoogleSearch}
      />
    </div>
  );
}
