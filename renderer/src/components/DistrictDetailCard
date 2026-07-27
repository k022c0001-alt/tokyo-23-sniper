import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapView } from './components/MapView';
import { DistrictDetailCard } from './components/DistrictDetailCard';
import {
  CATEGORIES,
  CATEGORIES_LIST,
  rankDistrictsByCategory,
  analyzeDistrict,
  getCategoryGradient,
} from './constants/pillarMeta';
import './LivabilityApp.css';

// ----------------------------------------------------------------
// 🌟 金の紙吹雪（ゴールドコンフェッティ）演出コンポーネント
// ----------------------------------------------------------------
function GoldConfetti({ count = 35 }) {
  // 紙片のランダムパラメータを初期化時に生成
  const confettiPieces = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 画面横位置 (%)
      sizeWidth: Math.random() * 8 + 6, // 幅 (px)
      sizeHeight: Math.random() * 14 + 10, // 高さ (px)
      duration: Math.random() * 4 + 4, // 落ちる速度 (s)
      delay: Math.random() * 5, // アニメーション開始遅延 (s)
      rotateStart: Math.random() * 360, // 初期角度
      skew: Math.random() * 30 - 15, // 歪み
      // 金色のバリエーション（シャンパンゴールド〜リッチゴールド）
      bgGradient: i % 3 === 0
        ? 'linear-gradient(135deg, #ffe066 0%, #d4af37 100%)'
        : i % 3 === 1
        ? 'linear-gradient(135deg, #f9d976 0%, #e6c875 50%, #d4af37 100%)'
        : 'linear-gradient(135deg, #fff3a0 0%, #f1c40f 100%)',
    }));
  }, [count]);

  return (
    <div className="gold-confetti-container" aria-hidden="true">
      {confettiPieces.map((p) => (
        <div
          key={p.id}
          className="gold-confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.sizeWidth}px`,
            height: `${p.sizeHeight}px`,
            background: p.bgGradient,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotateStart}deg) skew(${p.skew}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------
// 🏠 メインアプリケーション：LivabilityApp
// ----------------------------------------------------------------
export function LivabilityApp({ districtsData = [] }) {
  // ① 状態管理
  const [activeCategoryKey, setActiveCategoryKey] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState(null); // 詳細カード表示用
  const [targetDistrict, setTargetDistrict] = useState(null);     // MapView連動用
  const [scrollProgress, setScrollProgress] = useState(0);         // 0 (上) ～ 1 (下)

  const mapSectionRef = useRef(null);

  // ② スクロール監視（0～1で進行度を計算）
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / (maxScroll || 1)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ③ 選択中カテゴリに基づく23区のスコアリング・ランキング計算
  const rankedDistricts = useMemo(() => {
    return rankDistrictsByCategory(districtsData, activeCategoryKey);
  }, [districtsData, activeCategoryKey]);

  // TOP 3の区を取得
  const top3 = useMemo(() => rankedDistricts.slice(0, 3), [rankedDistricts]);

  // 現在選択されているカテゴリの定義情報
  const activeCategory = CATEGORIES[activeCategoryKey] || CATEGORIES.all;

  // ④ イベントハンドラ
  // カテゴリ変更 ＆ MapViewへのスムーズスクロール
  const handleSelectCategory = (categoryKey) => {
    setActiveCategoryKey(categoryKey);
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // TOP3カードクリック時：MapViewへジャンプ＆カード展開
  const handleTop3Click = (district) => {
    setTargetDistrict(district);
    setSelectedDistrict(district);
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 区の分析データ作成（詳細カード用）
  const analysis = useMemo(() => {
    return analyzeDistrict(selectedDistrict, districtsData);
  }, [selectedDistrict, districtsData]);

  return (
    <div className="livability-app">
      {/* 🌟 ひらひら舞い落ちる金の紙吹雪 */}
      <GoldConfetti count={40} />

      {/* 1. ヘッダー ＆ カテゴリ選択ナビゲーション */}
      <header className="app-header">
        <h1 className="app-title">✨ 東京23区 住みやすさナビ</h1>
        <p className="app-subtitle">あなたに最適な「街」を、データとインタラクティブ地図で体感</p>
        
        <nav className="category-bar">
          {CATEGORIES_LIST.map((cat) => {
            const isActive = activeCategoryKey === cat.id;
            return (
              <button
                key={cat.id}
                className={`cat-btn ${isActive ? 'active' : ''}`}
                style={isActive ? { background: getCategoryGradient(cat.id) } : {}}
                onClick={() => handleSelectCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* 2. TOP 3 スポットライトセクション */}
      <section className="top3-section">
        <div className="top3-header">
          <h2>
            {activeCategory.icon} {activeCategory.label} のおすすめ TOP 3
          </h2>
          <p className="category-desc">{activeCategory.desc}</p>
        </div>

        <div className="top3-grid">
          {top3.map((district, index) => {
            const rankNum = index + 1;
            const rankBadgeText = `第${rankNum}位`;

            return (
              <div
                key={district.code}
                className={`top3-card rank-${rankNum}`}
                onClick={() => handleTop3Click(district)}
              >
                {/* 1位・2位・3位バッジ */}
                <div className="rank-crown">
                  {rankNum === 1 ? '👑' : rankNum === 2 ? '🥈' : '🥉'} {rankBadgeText}
                </div>

                <h3>{district.name}</h3>

                {/* 🌟 100点換算・合計スコア表示 */}
                <div className="score-badge-group">
                  <span
                    className="rank-tag"
                    style={{
                      color: district.categoryRankMeta.color,
                      backgroundColor: district.categoryRankMeta.bg,
                      borderColor: district.categoryRankMeta.border,
                    }}
                  >
                    {district.categoryRank}ランク
                  </span>
                  <div className="score-total">
                    合計 <strong>{district.categoryTotalScore}</strong> 点
                  </div>
                </div>

                {/* 🌟 スナップショット表示 (例: AED 50点 + 防災避難所 75点) */}
                <div className="score-snapshot" title={district.snapshotText}>
                  {district.snapshotText}
                </div>

                <div className="card-footer-hint">
                  タップして地図で見る ↗
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. スクロールガイド ＆ 23区完成マップセクション */}
      <section ref={mapSectionRef} className="map-section-wrapper">
        <div className="scroll-indicator">
          <div className="indicator-text">
            {scrollProgress < 0.75
              ? '👇 下へスクロールすると粒子が集まり23区が完成します'
              : '✨ 23区マップ完成！気になる区を選択してください'}
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* 地図コンポーネント（スクロール進捗 scrollProgress を伝達） */}
        <MapView
          districtsData={rankedDistricts}
          activeCategory={activeCategory}
          externalSelectedDistrict={targetDistrict}
          scrollProgress={scrollProgress}
          onSelectDistrict={(district) => setSelectedDistrict(district)}
        />
      </section>

      {/* 4. ポップアップ詳細カード */}
      {selectedDistrict && (
        <DistrictDetailCard
          selectedDistrict={selectedDistrict}
          analysis={analysis}
          onClose={() => {
            setSelectedDistrict(null);
            setTargetDistrict(null);
          }}
          onJumpToComplement={(e, complement) => {
            e.stopPropagation();
            setSelectedDistrict(complement);
            setTargetDistrict(complement);
          }}
        />
      )}
    </div>
  );
}
