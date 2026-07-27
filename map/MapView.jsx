import React, { useState, useEffect, useMemo } from 'react';
import { getGoogleSearchUrl, getGoogleMapsUrl } from '../constants/pillarMeta';

/**
 * 23区 インタラクティブマップコンポーネント（花火＆火粉エフェクト版）
 * 
 * @param {Array} districtsData - ランキング・スコア計算済みの23区データ配列
 * @param {Object} activeCategory - 現在選択されているカテゴリ情報
 * @param {Object} externalSelectedDistrict - TOP3カードなど外部から選択された区
 * @param {number} scrollProgress - スクロール進行度（0:散らばる 〜 1:23区完成）
 * @param {Function} onSelectDistrict - 区が選択された際のコールバック関数
 */
export function MapView({
  districtsData = [],
  activeCategory,
  externalSelectedDistrict = null,
  scrollProgress = 1,
  onSelectDistrict
}) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // ① 外部（TOP 3カード等）から選択された場合、内部状態を同期
  useEffect(() => {
    if (externalSelectedDistrict) {
      setSelectedDistrict(externalSelectedDistrict);
    }
  }, [externalSelectedDistrict]);

  // ② 選択状態の変更を親コンポーネントへ通知
  const handleSelect = (district) => {
    setSelectedDistrict(district);
    if (onSelectDistrict) {
      onSelectDistrict(district);
    }
  };

  // 背景クリックで選択解除
  const handleBackgroundClick = () => {
    handleSelect(null);
  };

  // 粒子（区マーカー）クリック
  const handleMarkerClick = (e, district) => {
    e.stopPropagation();
    handleSelect(district);
  };

  // 区のコードに基づく花火カラー（華やかな発色パターン）の生成
  const getFireworkColor = (code) => {
    const palette = [
      '#ff2a6d', // 紅（牡丹）
      '#ffae19', // 金（黄金）
      '#05d5e7', // 浅葱（シアン）
      '#d300c5', // 紫紺（パープル）
      '#00ff9f', // 翡翠（エメラルド）
      '#ff5e00', // 橙（オレンジ）
      '#fff066', // 輝黄（イエロー）
    ];
    const num = parseInt(code, 10) || 1;
    return palette[num % palette.length];
  };

  // 背景に浮遊する火粉（背景 spark）のランダム位置を生成
  const bgEmbers = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      color: i % 2 === 0 ? '#ffd700' : '#ff7700',
    }));
  }, []);

  return (
    <div
      onClick={handleBackgroundClick}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '800px',
        height: '100vh',
        background: 'radial-gradient(ellipse at center, #0e1026 0%, #050611 70%, #000000 100%)',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: "'Hiragino Kaku Gothic ProN', 'メイリオ', sans-serif",
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)',
      }}
    >
      {/* 🌟 花火＆火粉用 インラインKeyframeアニメーション定義 */}
      <style>{`
        @keyframes emberFlicker {
          0% { transform: scale(0.8) translateY(0px); opacity: 0.2; }
          50% { opacity: 0.9; }
          100% { transform: scale(1.4) translateY(-6px); opacity: 0.3; }
        }
        @keyframes fireworkBurstRing {
          0% { transform: translate(-50%, -50%) scale(0.1); opacity: 1; border-width: 4px; }
          80% { opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; border-width: 1px; }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 12px currentColor, 0 0 25px currentColor; }
          50% { box-shadow: 0 0 25px currentColor, 0 0 50px #ffffff; }
          100% { box-shadow: 0 0 12px currentColor, 0 0 25px currentColor; }
        }
        @keyframes bgEmberFloat {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-50px) rotate(180deg); opacity: 0; }
        }
      `}</style>

      {/* 🎆 夜空に漂う火粉（背景環境エフェクト） */}
      {bgEmbers.map((ember) => (
        <span
          key={ember.id}
          style={{
            position: 'absolute',
            left: `${ember.x}%`,
            top: `${ember.y}%`,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            borderRadius: '50%',
            backgroundColor: ember.color,
            boxShadow: `0 0 6px ${ember.color}`,
            pointerEvents: 'none',
            animation: `bgEmberFloat ${ember.duration}s infinite linear`,
            animationDelay: `${ember.delay}s`,
          }}
        />
      ))}

      {/* 🌟 現在表示中のモード・カテゴリバナー（和風ガラスモフィズム） */}
      {activeCategory && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 24px',
            borderRadius: '30px',
            background: 'rgba(10, 12, 32, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.15), inset 0 0 15px rgba(255, 215, 0, 0.05)',
            color: '#fff',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              padding: '2px 8px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            表示中
          </span>
          <span style={{ fontSize: '15px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            {activeCategory.icon} {activeCategory.label} モード
          </span>
          <span
            style={{
              fontSize: '12px',
              color: scrollProgress >= 0.85 ? '#00ff9f' : '#ffae19',
              fontWeight: '600',
            }}
          >
            {scrollProgress >= 0.85 ? '【23区開花完了】' : '【火粉結集チュウ...】'}
          </span>
        </div>
      )}

      {/* 23区キャンバスエリア */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.5s ease-out',
          transform: selectedDistrict ? 'scale(1.03)' : 'scale(1)',
        }}
      >
        {districtsData.map((district) => {
          const isSelected = selectedDistrict?.code === district.code;
          const fireworkColor = getFireworkColor(district.code);

          // -------------------------------------------------------------
          // 🌟 スクロール量 (scrollProgress: 0~1) に応じた動的座標計算
          // -------------------------------------------------------------
          const codeNum = parseInt(district.code, 10) || 1;
          const xScatter = district.xScatter ?? (Math.sin(codeNum * 1.7) * 38 + 50);
          const yScatter = district.yScatter ?? (Math.cos(codeNum * 2.3) * 38 + 50);
          const xGather = district.x ?? 50;
          const yGather = district.y ?? 50;

          // 補間計算 (Linear Interpolation)
          const currentX = xScatter + (xGather - xScatter) * scrollProgress;
          const currentY = yScatter + (yGather - yScatter) * scrollProgress;
          const currentRotate = (1 - scrollProgress) * ((codeNum * 37) % 180 - 90);
          const currentOpacity = 0.55 + scrollProgress * 0.45;

          return (
            <div
              key={district.code}
              style={{
                position: 'absolute',
                left: `${currentX}%`,
                top: `${currentY}%`,
                transform: `translate(-50%, -50%) rotate(${currentRotate}deg) scale(${isSelected ? 1.3 : 1})`,
                opacity: currentOpacity,
                zIndex: isSelected ? 30 : 10,
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s',
              }}
            >
              {/* 🎆 選択時に咲き誇る「大輪の花火（光環）」エフェクト */}
              {isSelected && (
                <>
                  <span
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      border: `2px solid ${fireworkColor}`,
                      boxShadow: `0 0 20px ${fireworkColor}, inset 0 0 15px ${fireworkColor}`,
                      animation: 'fireworkBurstRing 1.5s infinite ease-out',
                      pointerEvents: 'none',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      border: '1px dashed #ffffff',
                      animation: 'fireworkBurstRing 1.5s infinite ease-out',
                      animationDelay: '0.3s',
                      pointerEvents: 'none',
                    }}
                  />
                </>
              )}

              {/* ✨ 粒子（区マーカー）を取り巻く「火粉（スパーク）」 */}
              {[...Array(6)].map((_, i) => {
                const angle = (i * 60) * (Math.PI / 180);
                const radius = isSelected ? 38 : 24;
                const sparkX = Math.cos(angle) * radius;
                const sparkY = Math.sin(angle) * radius;

                return (
                  <span
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${sparkX}px)`,
                      top: `calc(50% + ${sparkY}px)`,
                      width: `${isSelected ? 5 : 3}px`,
                      height: `${isSelected ? 5 : 3}px`,
                      borderRadius: '50%',
                      backgroundColor: fireworkColor,
                      boxShadow: `0 0 8px ${fireworkColor}, 0 0 12px #ffffff`,
                      animation: `emberFlicker ${1 + (i % 3) * 0.4}s infinite alternate ease-in-out`,
                      animationDelay: `${(i * 0.15).toFixed(2)}s`,
                      pointerEvents: 'none',
                    }}
                  />
                );
              })}

              {/* 🔘 粒子（メインボタン） */}
              <button
                onClick={(e) => handleMarkerClick(e, district)}
                title={`${district.name}\n${district.snapshotText || ''}`}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justify: 'center',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  background: isSelected
                    ? `radial-gradient(circle, ${fireworkColor} 0%, #000000 100%)`
                    : 'rgba(15, 18, 42, 0.85)',
                  border: `2px solid ${fireworkColor}`,
                  boxShadow: isSelected
                    ? `0 0 30px ${fireworkColor}, 0 0 50px #ffffff`
                    : `0 0 12px ${fireworkColor}`,
                  color: '#ffffff',
                  cursor: 'pointer',
                  outline: 'none',
                  backdropFilter: 'blur(4px)',
                  animation: isSelected ? 'pulseGlow 2s infinite ease-in-out' : 'none',
                }}
              >
                {/* アイコン */}
                <span style={{ fontSize: '18px', filter: `drop-shadow(0 0 6px ${fireworkColor})` }}>
                  {isSelected ? '📍' : district.bestEmoji || '✨'}
                </span>

                {/* 区名 ＆ スコア表示 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2px' }}>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 'bold',
                      color: '#ffffff',
                      textShadow: `0 0 8px ${fireworkColor}, 0 0 12px #000000`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {district.name}
                  </span>
                  {district.categoryTotalScore !== undefined && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        color: fireworkColor,
                        background: 'rgba(0, 0, 0, 0.6)',
                        padding: '1px 6px',
                        borderRadius: '8px',
                        marginTop: '2px',
                        border: `1px solid ${fireworkColor}`,
                      }}
                    >
                      {district.categoryTotalScore}点
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
