import React from 'react';
import { getGoogleSearchUrl, getGoogleMapsUrl } from '../constants/pillarMeta';

/**
 * 選択された区の詳細カードコンポーネント（花火・グラスモフィズムテーマ）
 * 
 * @param {Object} district - 選択された区のデータ
 * @param {Object} activeCategory - 現在選択されているカテゴリ情報
 * @param {Function} onClose - カードを閉じる（選択解除）コールバック関数
 */
export function DistrictDetailCard({ district, activeCategory, onClose }) {
  if (!district) return null;

  // 各評価指標の日本語ラベルとアイコン設定
  const pillarLabels = {
    childcare: { label: '子育て支援', icon: '👶' },
    park: { label: '公園・自然', icon: '🌳' },
    disaster: { label: '防災・地盤', icon: '🛡️' },
    crime: { label: '治安・防犯', icon: '👮' },
    transit: { label: '交通アクセス', icon: '🚃' },
    shopping: { label: '買い物利便', icon: '🛍️' },
    medical: { label: '医療・福祉', icon: '🏥' },
    cost: { label: 'コスパ・家賃', icon: '💰' },
    quietness: { label: '閑静さ', icon: '🌙' },
  };

  // Google検索を開くハンドラー
  const handleGoogleSearch = (e) => {
    e.stopPropagation();
    const metricLabel = activeCategory?.label || '住みやすさ';
    const url = getGoogleSearchUrl(district.name, metricLabel);
    window.open(url, '_blank');
  };

  // Googleマップを開くハンドラー
  const handleGoogleMaps = (e) => {
    e.stopPropagation();
    const metricKey = activeCategory?.key || 'park';
    const url = getGoogleMapsUrl(district.name, metricKey);
    window.open(url, '_blank');
  };

  // 点数に応じたネオンカラーの切り替え
  const getScoreColor = (score) => {
    if (score >= 90) return '#00ff9f'; // Sランク：エメラルド
    if (score >= 80) return '#ffd700'; // Aランク：ゴールド
    if (score >= 70) return '#05d5e7'; // Bランク：シアン
    return '#ff5e00';                 // Cランク：オレンジ
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: 'calc(100% - 48px)',
        maxWidth: '400px',
        maxHeight: '85vh',
        backgroundColor: 'rgba(10, 14, 35, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 215, 0, 0.35)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.15)',
        color: '#ffffff',
        padding: '24px',
        boxSizing: 'border-box',
        zIndex: 100,
        overflowY: 'auto',
        fontFamily: "'Hiragino Kaku Gothic ProN', 'メイリオ', sans-serif",
        animation: 'cardSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* カード起動時のポップアップアニメーション */}
      <style>{`
        @keyframes cardSlideUp {
          from { transform: translateY(40px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .detail-card-btn {
          transition: all 0.2s ease;
        }
        .detail-card-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.25);
        }
      `}</style>

      {/* 閉じるボタン */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#aaaaaa',
          fontSize: '16px',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#aaaaaa';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        ✕
      </button>

      {/* ヘッダーエリア */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
        <span style={{ fontSize: '38px', filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))' }}>
          {district.bestEmoji || '✨'}
        </span>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px', color: '#ffffff' }}>
            {district.name}
          </h2>
          <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
            行政コード: {district.code}
          </span>
        </div>
      </div>

      {/* 概要メッセージ */}
      {district.description && (
        <p
          style={{
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#dddddd',
            marginBottom: '20px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '10px 14px',
            borderRadius: '12px',
            borderLeft: '3px solid #ffd700',
          }}
        >
          {district.description}
        </p>
      )}

      {/* 選択中モードの強調スコア表示 */}
      {activeCategory && district.scores && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.12), rgba(255, 42, 109, 0.12))',
            border: '1px solid rgba(255, 215, 0, 0.4)',
            borderRadius: '16px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>{activeCategory.icon}</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{activeCategory.label} スコア</span>
          </div>
          <span
            style={{
              fontSize: '22px',
              fontWeight: '900',
              color: getScoreColor(district.scores[activeCategory.key] || 0),
              textShadow: '0 0 10px currentColor',
            }}
          >
            {district.scores[activeCategory.key] ?? district.categoryTotalScore ?? '-'} 点
          </span>
        </div>
      )}

      {/* 各項目のプログレスバーリスト */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '13px', color: '#ffd700', margin: '0 0 12px 0', letterSpacing: '0.5px' }}>
          📊 指標別スコア一覧
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {district.scores &&
            Object.entries(district.scores).map(([key, score]) => {
              const meta = pillarLabels[key] || { label: key, icon: '📌' };
              const scoreColor = getScoreColor(score);
              const isActive = activeCategory?.key === key;

              return (
                <div key={key} style={{ opacity: isActive ? 1 : 0.85 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ color: isActive ? '#ffd700' : '#ffffff', fontWeight: isActive ? 'bold' : 'normal' }}>
                      {meta.icon} {meta.label}
                    </span>
                    <span style={{ fontWeight: 'bold', color: scoreColor }}>{score}点</span>
                  </div>
                  {/* スコアバー */}
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${score}%`,
                        height: '100%',
                        backgroundColor: scoreColor,
                        boxShadow: `0 0 8px ${scoreColor}`,
                        borderRadius: '3px',
                        transition: 'width 0.6s ease-out',
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 外部連携アクションボタン */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
        <button
          className="detail-card-btn"
          onClick={handleGoogleSearch}
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 215, 0, 0.4)',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 0, 0.2))',
            color: '#ffd700',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          🔍 Google検索
        </button>
        <button
          className="detail-card-btn"
          onClick={handleGoogleMaps}
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(5, 213, 231, 0.4)',
            background: 'linear-gradient(135deg, rgba(5, 213, 231, 0.2), rgba(0, 255, 159, 0.2))',
            color: '#05d5e7',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          🗺️ Google Maps
        </button>
      </div>
    </div>
  );
}
