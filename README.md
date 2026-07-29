# tokyo-23-sniper
```text
frontend70％ backend%
"""
opendata-app/
├── backend/                         # Python データ基盤 & Web API
│   ├── collectors/
│   │   ├── __init__.py
│   │   └── opendata_collector.py     # CKAN APIデータ収集モジュール
│   │
│   ├── themes/                       # テーマ定義YAML
│   │   └── childcare.yaml
│   │
│   ├── data/                         # データベース & 取得データ
│   │   └── opendata_queue.db         # SQLite（キュー・スコア・正規化データ）
│   │
│   ├── output/                       # ダウンロードJSON一時保存先
│   │   └── opendata_jsons/
│   │
│   ├── workflow.py                   # データ収集・ダウンロード・スコア計算
│   ├── normalizer.py                 # 表記揺れJSONを共通テーブルへ変換
│   ├── api.py                        # FastAPI サーバー
│   └── requirements.txt              # Python依存ライブラリ
│
└── frontend/                         # React フロントエンド
    ├── public/
    │   └── favicon.ico
    │
    └── src/
        ├── assets/                   # アイコン・画像・CSS
        │
        ├── services/                 # backend(api.py)との通信
        │   └── api.js                # fetch API
        │
        ├── hooks/                    # カスタムフック
        │   ├── useWardScores.js      # 23区ランキング取得
        │   └── useWardDetail.js      # 詳細取得
        │
        ├── components/
        │   ├── map/                  # 地図表示
        │   │   ├── MapView.jsx
        │   │   ├── WardMarker.jsx
        │   │   └── WardTooltip.jsx
        │   │
        │   ├── ranking/              # ランキング表示
        │   │   ├── RankingList.jsx
        │   │   ├── RankingCard.jsx
        │   │   └── ScoreBadge.jsx
        │   │
        │   ├── detail/               # 詳細モーダル
        │   │   ├── WardDetailModal.jsx
        │   │   ├── ScoreBreakdown.jsx
        │   │   ├── FacilityList.jsx
        │   │   ├── DatasetSourceList.jsx
        │   │   │
        │   │   └── panels/
        │   │       ├── SafetyPanel.jsx
        │   │       ├── ChildcarePanel.jsx
        │   │       ├── MedicalPanel.jsx
        │   │       ├── EducationPanel.jsx
        │   │       └── SummaryPanel.jsx
        │   │
        │   ├── common/
        │   │   ├── Button.jsx
        │   │   ├── Card.jsx
        │   │   ├── Modal.jsx
        │   │   ├── Loading.jsx
        │   │   └── EmptyState.jsx
        │   │
        │   └── FilterButtons.jsx     # テーマ切替
        │
        ├── utils/
        │   ├── scoreCalculator.js
        │   ├── safetyAnalyzer.js
        │   ├── childcareAnalyzer.js
        │   └── aiSummary.js
        │
        ├── App.jsx                   # 選択状態・モーダル管理
        └── main.jsx                  # エントリポイント"""
```
