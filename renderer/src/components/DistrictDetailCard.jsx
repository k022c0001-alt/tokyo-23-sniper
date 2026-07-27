import React, { useState } from 'react';
import { getGoogleSearchUrl, getGoogleMapsUrl } from '../constants/pillarMeta';
import {
  getTwitterShareUrl,
  getLineShareUrl,
  copyToClipboard,
  shareNative,
} from '../utils/shareUtils';

/**
 * 選択された区の詳細カードコンポーネント（SNS共有・グラスモフィズム機能付き）
 * 
 * @param {Object} district - 選択された区のデータ
 * @param {Object} activeCategory - 現在選択されているカテゴリ情報
 * @param {Function} onClose - カードを閉じるコールバック関数
 */
export function DistrictDetailCard({ district, activeCategory, onClose }) {
  if (!district) return null;

  // コピー成功時のトースト通知状態
  const [copied, setCopied] = useState(false);

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

  // Google検索を開く
  const handleGoogleSearch = (e) => {
    e.stopPropagation();
    const metricLabel = activeCategory?.label || '住みやすさ';
    const url = getGoogleSearchUrl(district.name, metricLabel);
    window.open(url, '_blank');
  };

  // Googleマップを開く
  const handleGoogleMaps = (e) => {
    e.stopPropagation();
    const metricKey = activeCategory?.key || 'park';
    const url = getGoogleMapsUrl(district.name, metricKey);
    window.open(url, '_blank');
  };

  // X (Twitter) でシェア
  const handleShareX = (e) => {
    e.stopPropagation();
    const url = getTwitterShareUrl(district, activeCategory);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // LINE でシェア
  const handleShareLine = (e) => {
    e.stopPropagation();
    const url = getLineShareUrl(district, activeCategory);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // リンク・結果テキストをコピー（スマホはWeb Share API優先）
  const handleCopyLink = async (e) => {
    e.stopPropagation();
    
    // スマホ等の標準共有メニューが使える場合は優先
    const sharedNatively = await shareNative(district, activeCategory);
    if (sharedNatively) return;

    // クリップボードにコピー
    const success = await copyToClipboard(district, activeCategory);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // スコアに応じたカラー判定
  const getScoreColor = (score) => {
    if (score >= 90) return '#00ff9f'; // Sランク
    if (score >= 80) return '#ffd700'; // Aランク
    if (score >= 70) return '#05d5e7'; // Bランク
    return '#ff5e00';                 // Cランク
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
        backgroundColor: 'rgba(10, 14, 35, 0.90)',
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
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>
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
            marginBottom: '18px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '10px 14px',
            borderRadius: '12px',
            borderLeft: '3px solid #ffd700',
          }}
        >
          {district.description}
        </p>
      )}

      {/* カテゴリスコア表示 */}
      {activeCategory && district.scores && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.12), rgba(255, 42, 109, 0.12))',
            border: '1px solid rgba(255, 215, 0, 0.4)',
            borderRadius: '16px',
            padding: '12px 16px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>{activeCategory.icon}</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{activeCategory.label}</span>
          </div>
          <span
            style={{
              fontSize: '22px',
              fontWeight: '900',
              color: getScoreColor(district.scores[activeCategory.key] || 0),
            }}
          >
            {district.scores[activeCategory.key] ?? district.categoryTotalScore ?? '-'} 点
          </span>
        </div>
      )}

      {/* スコア一覧 */}
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '13px', color: '#ffd700', margin: '0 0 10px 0' }}>
          📊 指標別スコア一覧
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {district.scores &&
            Object.entries(district.scores).map(([key, score]) => {
              const meta = pillarLabels[key] || { label: key, icon: '📌' };
              const scoreColor = getScoreColor(score);
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}>
                    <span>{meta.icon} {meta.label}</span>
                    <span style={{ fontWeight: 'bold', color: scoreColor }}>{score}点</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px' }}>
                    <div style={{ width: `${score}%`, height: '100%', backgroundColor: scoreColor, borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 🔍 周辺検索ボタン群 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        <button
          className="detail-card-btn"
          onClick={handleGoogleSearch}
          style={{
            padding: '9px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            background: 'rgba(255, 215, 0, 0.1)',
            color: '#ffd700',
            fontSize: '11px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          🔍 Google検索
        </button>
        <button
          className="detail-card-btn"
          onClick={handleGoogleMaps}
          style={{
            padding: '9px',
            borderRadius: '10px',
            border: '1px solid rgba(5, 213, 231, 0.3)',
            background: 'rgba(5, 213, 231, 0.1)',
            color: '#05d5e7',
            fontSize: '11px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          🗺️ Google Maps
        </button>
      </div>

      {/* 📤 SNS共有ボタン群 */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '14px' }}>
        <h3 style={{ fontSize: '12px', color: '#aaaaaa', margin: '0 0 10px 0' }}>
          📤 この結果をシェアする
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          {/* X (Twitter) ボタン */}
          <button
            className="detail-card-btn"
            onClick={handleShareX}
            style={{
              padding: '9px 4px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: '#000000',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            𝕏 で投稿
          </button>

          {/* LINE ボタン */}
          <button
            className="detail-card-btn"
            onClick={handleShareLine}
            style={{
              padding: '9px 4px',
              borderRadius: '10px',
              border: '1px solid rgba(6, 199, 85, 0.4)',
              background: 'rgba(6, 199, 85, 0.2)',
              color: '#06c755',
              fontSize: '11px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            LINE 送信
          </button>

          {/* リンクコピー ボタン */}
          <button
            className="detail-card-btn"
            onClick={handleCopyLink}
            style={{
              padding: '9px 4px',
              borderRadius: '10px',
              border: copied ? '1px solid #00ff9f' : '1px solid rgba(255, 255, 255, 0.2)',
              background: copied ? 'rgba(0, 255, 159, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              color: copied ? '#00ff9f' : '#ffffff',
              fontSize: '11px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {copied ? '✅ コピー完了' : '🔗 リンク作成'}
          </button>
        </div>
      </div>
    </div>
  );
}
