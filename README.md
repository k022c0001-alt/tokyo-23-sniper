# tokyo-23-sniper
```text
```text
src/
│
├── components/                 # 画面の見た目（UI）
│   ├── MapView.jsx             # 地図を表示
│   ├── RankingList.jsx         # ランキング一覧
│   ├── FilterButtons.jsx       # 「治安」「保育」などの切り替えボタン
│   ├── SafetyPanel.jsx         # 治安の詳細パネル
│   ├── ChildcarePanel.jsx      # 子育て環境の詳細
│   ├── MedicalPanel.jsx        # 医療・小児科情報
│   ├── EducationPanel.jsx      # 学校・教育環境
│   ├── SummaryPanel.jsx        # AIによる総合診断
│   └── MissingPointsPanel.jsx  # 不足している要素の一覧
│
├── utils/                      # 計算・解析ロジック
│   ├── scoreCalculator.js      # 各項目のスコア計算
│   ├── safetyAnalyzer.js       # 治安解析
│   ├── childcareAnalyzer.js    # 子育て環境解析
│   ├── educationAnalyzer.js    # 教育環境解析
│   ├── medicalAnalyzer.js      # 医療環境解析
│   ├── lifestyleAnalyzer.js    # 生活利便性解析
│   ├── recommendationEngine.js # おすすめ区を算出
│   └── aiSummary.js            # AIによる総合コメント生成
│
├── data/                       # データ
│   ├── snapshot.json           # 集計済みデータ
│   ├── ward_profiles.json      # 各区の基本情報
│   ├── rankings.json           # ランキングデータ
│   └── pillar_scores.json      # 各評価項目のスコア
│
└── App.jsx                     # 全体を制御する司令塔
```

components/
├── map/
│   ├── MapView.jsx
│   ├── WardMarker.jsx
│   └── WardTooltip.jsx
│
├── ranking/
│   ├── RankingList.jsx
│   ├── RankingCard.jsx
│   └── RankingItem.jsx
│
├── analysis/
│   ├── SafetyPanel.jsx
│   ├── ChildcarePanel.jsx
│   ├── MedicalPanel.jsx
│   ├── EducationPanel.jsx
│   └── SummaryPanel.jsx
│
└── common/
    ├── Button.jsx
    ├── Card.jsx
    ├── Chip.jsx
    ├── Loading.jsx
    └── EmptyState.jsx
```
