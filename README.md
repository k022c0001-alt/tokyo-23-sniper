# tokyo-23-sniper
```text
tokyo-23-sniper/
│
├── main/                     ⚙️ Electron（デスクトップアプリ）
│   ├── index.js              # アプリ起動・ウィンドウ管理
│   └── ipc-bridge.js         # React ⇔ Python 通信
│
├── engine/                   🧠 Python（解析エンジン）
│   ├── sniper_core/
│   ├── data_models/
│   ├── utils/
│   └── app.py
│
├── renderer/                 💎 React（UI）
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── hooks/
│       ├── components/
│       │   ├── core/
│       │   ├── domain/
│       │   └── states/
│       └── styles/
│
├── alpha-design/             ✨ Design System
│   ├── design-tokens.css
│   ├── animations/
│   └── assets/
│
├── package.json
└── requirements.txt
```
