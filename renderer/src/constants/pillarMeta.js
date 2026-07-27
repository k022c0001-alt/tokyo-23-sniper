// src/constants/pillarMeta.js

// ----------------------------------------------------------------
// 1. 定数（タイポ防止 & 自動補完用）
// ----------------------------------------------------------------
export const METRIC_KEYS = {
  PARK: 'park',
  DISASTER: 'disaster',
  AED: 'aed',
  SPORTS: 'sports',
  CHILDCARE: 'childcare',
  COMMERCE_LIFE: 'commerce_life',
  COMMERCE_CBD: 'commerce_cbd',
  LIBRARY: 'library',
  COMMERCE: 'commerce',
  POPULATION: 'population',
  SAFETY: 'safety',
};

export const CATEGORY_KEYS = {
  ALL: 'all',
  CHILDCARE: 'childcare_group',
  EDUCATION: 'education_group',
  POPULATION: 'population_group',
  SAFETY: 'safety_group',
};

// ----------------------------------------------------------------
// 2. 各指標のメタ情報（基本データ）
// ----------------------------------------------------------------
export const PILLAR_META = {
  [METRIC_KEYS.PARK]: {
    emoji: '🌳',
    label: 'みどり・公園',
    color: '#2ecc71',
    unit: '箇所',
    chip: true,
    desc: '公園の多さや自然環境の豊かさ',
    mapsQuery: n => `${n} 公園`
  },
  [METRIC_KEYS.DISASTER]: {
    emoji: '🏠',
    label: '防災・避難所',
    color: '#e67e22',
    unit: '箇所',
    chip: true,
    desc: '避難所や防災拠点のアクセス性',
    mapsQuery: n => `${n} 避難所`
  },
  [METRIC_KEYS.AED]: {
    emoji: '💗',
    label: 'AED・救急対応',
    color: '#e74c3c',
    unit: '台',
    chip: true,
    desc: 'AED設置数や医療救急体制',
    mapsQuery: n => `${n} AED`
  },
  [METRIC_KEYS.SPORTS]: {
    emoji: '⚽',
    label: 'スポーツ・運動',
    color: '#3498db',
    unit: '施設',
    chip: true,
    desc: '体育館や運動場の充実度',
    mapsQuery: n => `${n} スポーツ施設`
  },
  [METRIC_KEYS.CHILDCARE]: {
    emoji: '👶',
    label: '子育て・保育園',
    color: '#f1c40f',
    unit: '園',
    chip: true,
    desc: '保育園数や子育て支援体制',
    mapsQuery: n => `${n} 保育園`
  },
  [METRIC_KEYS.COMMERCE_LIFE]: {
    emoji: '🛍️',
    label: '普段の買い物',
    color: '#9b59b6',
    unit: '店舗',
    chip: true,
    desc: 'スーパーや日常使いの商店街',
    mapsQuery: n => `${n} 商店街`
  },
  [METRIC_KEYS.COMMERCE_CBD]: {
    emoji: '🌆',
    label: '繁華街の賑わい',
    color: '#8e44ad',
    unit: 'エリア',
    chip: true,
    desc: '大型商業施設や賑わいスポット',
    mapsQuery: n => `${n} 繁華街`
  },
  [METRIC_KEYS.LIBRARY]: {
    emoji: '📚',
    label: '図書館',
    color: '#1abc9c',
    unit: '館',
    chip: true,
    desc: '図書館や学習環境の充実度',
    mapsQuery: n => `${n} 図書館`
  },
  [METRIC_KEYS.COMMERCE]: {
    emoji: '🏪',
    label: '商業・お店の多さ',
    color: '#34495e',
    unit: '店',
    chip: false,
    desc: '店舗の総数や利便性',
    mapsQuery: n => `${n} 商店街`
  },
  [METRIC_KEYS.POPULATION]: {
    emoji: '📈',
    label: '人口増加率',
    color: '#16a085',
    unit: '%',
    chip: true,
    desc: '街の活気や将来性',
    mapsQuery: n => `${n} 街並み`
  },
  [METRIC_KEYS.SAFETY]: {
    emoji: '🛡️',
    label: '治安・防犯',
    color: '#2980b9',
    unit: '件',
    chip: true,
    desc: '交番の多さや防犯対策',
    mapsQuery: n => `${n} 交番`
  },
};

export function getMetricMeta(key) {
  return PILLAR_META[key] || {
    emoji: '✨',
    label: key || '指標',
    color: '#7f8c8d',
    unit: '点',
    chip: true,
    desc: '詳細データ',
    mapsQuery: n => `${n}`
  };
}

// ----------------------------------------------------------------
// 3. カテゴリ定義（重み付け weights を追加可能に）
// ----------------------------------------------------------------
export const CATEGORIES = {
  [CATEGORY_KEYS.ALL]: {
    id: CATEGORY_KEYS.ALL,
    label: '総合バランス',
    icon: '✨',
    desc: 'あらゆる生活指標をバランスよく考慮',
    metrics: [
      METRIC_KEYS.PARK, METRIC_KEYS.DISASTER, METRIC_KEYS.AED, 
      METRIC_KEYS.SPORTS, METRIC_KEYS.CHILDCARE, METRIC_KEYS.COMMERCE_LIFE, 
      METRIC_KEYS.LIBRARY, METRIC_KEYS.SAFETY
    ]
  },
  [CATEGORY_KEYS.CHILDCARE]: {
    id: CATEGORY_KEYS.CHILDCARE,
    label: '保育・防災安心',
    icon: '👶',
    desc: '子育てファミリーや万が一の備えを重視',
    metrics: [METRIC_KEYS.CHILDCARE, METRIC_KEYS.DISASTER, METRIC_KEYS.AED],
    // 💡 例: 子育て指標の比率を高める重み付け（任意指定）
    weights: { [METRIC_KEYS.CHILDCARE]: 0.5, [METRIC_KEYS.DISASTER]: 0.3, [METRIC_KEYS.AED]: 0.2 }
  },
  [CATEGORY_KEYS.EDUCATION]: {
    id: CATEGORY_KEYS.EDUCATION,
    label: '教育・育成',
    icon: '📚',
    desc: '子どもの習い事や学習・運動環境が充実',
    metrics: [METRIC_KEYS.LIBRARY, METRIC_KEYS.SPORTS, METRIC_KEYS.COMMERCE]
  },
  [CATEGORY_KEYS.POPULATION]: {
    id: CATEGORY_KEYS.POPULATION,
    label: '人口推移',
    icon: '📈',
    desc: '若い世代が集まる将来性と賑わい',
    metrics: [METRIC_KEYS.POPULATION, METRIC_KEYS.COMMERCE_CBD]
  },
  [CATEGORY_KEYS.SAFETY]: {
    id: CATEGORY_KEYS.SAFETY,
    label: '治安・防犯',
    icon: '🛡️',
    desc: '一人暮らしやシニアも安心な街づくり',
    metrics: [METRIC_KEYS.SAFETY, METRIC_KEYS.DISASTER, METRIC_KEYS.AED]
  }
};

// 💡 便利配列（事前抽出）
export const CATEGORIES_LIST = Object.values(CATEGORIES);
export const METRIC_LIST = Object.values(PILLAR_META);
export const CHIP_METRIC_LIST = METRIC_LIST.filter(m => m.chip); // チップ表示用リスト

// ----------------------------------------------------------------
// 4. スコア計算 ＆ ランクスタイル定義
// ----------------------------------------------------------------

// 💡 ランク定義（デザイン統一用）
export const RANK_CONFIG = {
  S: { label: 'Sランク', color: '#f1c40f', bg: '#fef9e7', border: '#f39c12' },
  A: { label: 'Aランク', color: '#2ecc71', bg: '#e8f8f5', border: '#27ae60' },
  B: { label: 'Bランク', color: '#3498db', bg: '#ebf5fb', border: '#2980b9' },
  C: { label: 'Cランク', color: '#95a5a6', bg: '#f2f4f4', border: '#7f8c8d' },
};

export function calculateCategoryScore(scores = {}, metricKeys = [], maxSnapshotItems = 2, categoryKey = null) {
  if (!metricKeys.length) {
    return { total: 0, normalizedScore: 0, rank: 'C', rankMeta: RANK_CONFIG.C, snapshotText: '' };
  }

  const category = categoryKey ? CATEGORIES[categoryKey] : null;
  const weights = category?.weights;

  let total = 0;
  let weightedTotal = 0;
  const itemScores = [];

  metricKeys.forEach((key) => {
    const meta = getMetricMeta(key);
    const score = scores[key] || 0;
    total += score;

    // 重み付けがある場合は計算、なければ均等
    const weight = weights?.[key] ?? (1 / metricKeys.length);
    weightedTotal += score * weight;

    itemScores.push({ key, meta, score });
  });

  // スコアが高い順にソートして上限件数分を取得
  const topItems = [...itemScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSnapshotItems);

  const snapshotParts = topItems.map(item => `${item.meta.label} ${item.score}点`);
  
  let snapshotText = snapshotParts.join(' + ');
  if (metricKeys.length > maxSnapshotItems) {
    snapshotText += ` (+他${metricKeys.length - maxSnapshotItems}項目)`;
  }

  // 100点満点換算（重み付け考慮）
  const normalizedScore = weights ? Math.round(weightedTotal) : Math.round(total / metricKeys.length);

  let rank = 'C';
  if (normalizedScore >= 85) rank = 'S';
  else if (normalizedScore >= 70) rank = 'A';
  else if (normalizedScore >= 55) rank = 'B';

  return {
    total,
    normalizedScore,
    rank,
    rankMeta: RANK_CONFIG[rank], // UI側でそのまま使える配色セット
    snapshotText
  };
}

export function rankDistrictsByCategory(districts = [], categoryKey = 'all') {
  const category = CATEGORIES[categoryKey] || CATEGORIES.all;

  return districts
    .map((district) => {
      const scoreInfo = calculateCategoryScore(district.scores, category.metrics, 2, categoryKey);
      return {
        ...district,
        categoryTotalScore: scoreInfo.total,
        categoryNormalizedScore: scoreInfo.normalizedScore,
        categoryRank: scoreInfo.rank,
        categoryRankMeta: scoreInfo.rankMeta,
        snapshotText: scoreInfo.snapshotText
      };
    })
    .sort((a, b) => b.categoryTotalScore - a.categoryTotalScore);
}

// ----------------------------------------------------------------
// 5. 分析 ＆ 比較（VSモード）ユーティリティ
// ----------------------------------------------------------------

export function analyzeDistrict(selected, allDistricts = []) {
  if (!selected || !selected.scores) return null;

  const entries = Object.entries(selected.scores);
  if (entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const [bestKey, bestScore] = sorted[0];
  const [worstKey, worstScore] = sorted[sorted.length - 1];

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
      score: bestScore,
      meta: getMetricMeta(bestKey)
    },
    worst: {
      key: worstKey,
      score: worstScore,
      meta: getMetricMeta(worstKey)
    },
    complement: complementDistrict
  };
}

// 💡 【新規】2区の対戦・比較（VSモード）用ヘルパー
export function compareDistricts(districtA, districtB, categoryKey = 'all') {
  if (!districtA || !districtB) return null;

  const category = CATEGORIES[categoryKey] || CATEGORIES.all;
  const scoreA = calculateCategoryScore(districtA.scores, category.metrics, 2, categoryKey);
  const scoreB = calculateCategoryScore(districtB.scores, category.metrics, 2, categoryKey);

  return {
    districtA: { ...districtA, scoreInfo: scoreA },
    districtB: { ...districtB, scoreInfo: scoreB },
    winnerCode: scoreA.total >= scoreB.total ? districtA.code : districtB.code,
    scoreDiff: Math.abs(scoreA.total - scoreB.total)
  };
}

// ----------------------------------------------------------------
// 6. URL ＆ デザインヘルパー関数
// ----------------------------------------------------------------

export function getGoogleMapsUrl(districtName, metricKey) {
  const meta = getMetricMeta(metricKey);
  const query = meta.mapsQuery(districtName);
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`東京都${query}`)}`;
}

export function getGoogleSearchUrl(districtName, metricKey) {
  const meta = getMetricMeta(metricKey);
  return `https://www.google.com/search?q=${encodeURIComponent(`${districtName} ${meta.label}`)}`;
}

export function getCategoryGradient(categoryKey) {
  const category = CATEGORIES[categoryKey];
  if (!category || !category.metrics.length) {
    return 'linear-gradient(135deg, #2c3e50, #3498db)';
  }
  
  const colors = category.metrics.slice(0, 2).map(k => getMetricMeta(k).color);
  if (colors.length === 1) return colors[0];
  return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}
