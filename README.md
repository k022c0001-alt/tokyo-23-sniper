# tokyo-23-sniper
```text
"""
tokyo-23-sniper/                            # ★ 単一のGitリポジトリ（Root）
├── .gitignore                              # node_modules や SQLite、Pythonキャッシュ等をまとめて除外
├── README.md                               # プロジェクト全体の説明書
│
├── backend/                                # バックエンド（Python / FastAPI / データ基盤）
│   ├── app/                                # Web API エンドポイント
│   │   ├── api.py                          # FastAPI エントリポイント（CORS設定含む）
│   │   └── routers/                        # ルーティング分割（/scores, /wards, /evidence等）
│   │
│   ├── orchestrator/                       # ワークフロー制御
│   │   └── opendata_workflow.py
│   │
│   ├── engines/                            # ★ コア計算・解析エンジン群
│   │   ├── score_engine.py                 # スコア計算（密度・品質・ランキング）
│   │   ├── normalize_engine.py             # カラム名・単位・表記揺れ吸収
│   │   ├── snapshot_engine.py              # 根拠データ・タイムスタンプ保持
│   │   ├── evidence_engine.py              # スコアから行・列・CSVセルへの追跡機能
│   │   └── metrics_engine.py               # 密度・カバー率・最新性等の指標計算
│   │
│   ├── services/                           # ★ 共通補助サービス群
│   │   ├── catalog_indexer.py              # CKANメタデータインデックス
│   │   ├── cache_manager.py                # 24時間キャッシュ・ローカル保持
│   │   ├── report_generator.py             # 処理結果 report.html 生成
│   │   ├── field_mapper.py                 # テーマ別エイリアス変換
│   │   └── source_registry.py              # 自治体別（東京都・横浜市等）CKAN定義
│   │
│   ├── collectors/                         # データ収集モジュール
│   │   ├── ckan_client.py
│   │   ├── opendata_collector.py
│   │   ├── csv_collector.py
│   │   └── html_collector.py
│   │
│   ├── themes/                             # テーマ定義 YAML
│   │   ├── childcare.yaml
│   │   ├── sports.yaml
│   │   └── library.yaml
│   │
│   ├── config/                             # 環境変数・ライセンス定義
│   ├── scripts/                            # CLI実行用スクリプト（run_all_themes.py など）
│   ├── tests/                              # バックエンド用テスト
│   ├── docs/
│   ├── logs/
│   ├── data/                               # データベース・バックアップ
│   │   ├── opendata_queue.db
│   │   └── backups/
│   │
│   ├── output/                             # 中間生成物（ raw / normalized ）
│   │   ├── raw/
│   │   └── normalized/
│   │
│   ├── requirements.txt                    # Python 依存ライブラリ
│   └── Dockerfile                          # バックエンド用コンテナ定義（任意）
│
└── frontend/                               # フロントエンド（React / Vite / Next.jsなど）
    ├── package.json                        # Node.js 依存ライブラリ
    ├── vite.config.js                      # ビルド設定（APIプロキシ設定など）
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── services/                       # backend/app/api.py 通信用 Client
    │   ├── hooks/
    │   ├── components/
    │   │   ├── map/
    │   │   ├── ranking/
    │   │   ├── detail/
    │   │   │   └── panels/                 # テーマ別（Childcare, Sports, Library等）
    │   │   └── evidence/                   # ★ evidence_engine連携用（根拠ポップアップ表示）
    │   └── utils/
    └── Dockerfile                          # フロントエンド用コンテナ定義（任意）
```
