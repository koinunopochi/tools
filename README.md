# Tools Collection

このリポジトリは、開発に役立つ様々なツールやサンプルプロジェクトを集めたコレクションです。

## プロジェクト構成

```
.
├── aws/
│   └── sam/
│       └── simple-dynamodb/  # AWS SAM DynamoDBサンプル
└── cli/
    └── beep/                 # PowerShellビープ音生成ツール
```

## プロジェクト詳細

### AWS SAM DynamoDB Sample

DynamoDBを使用したシンプルなCRUD操作のサンプルプロジェクトです。AWS SAMを使用してServerless APIを構築します。

#### 機能
- DynamoDBテーブルの自動作成
- 以下のAPI エンドポイント:
  - POST /items - 新規アイテム作成
  - GET /items/{id} - アイテム取得
  - PUT /items/{id} - アイテム更新
  - DELETE /items/{id} - アイテム削除

#### 技術スタック
- AWS SAM
- Node.js 20.x
- Amazon DynamoDB
- Amazon API Gateway

### PowerShell Beep Tool

PowerShellを使用してカスタマイズ可能なビープ音を生成するツールです。

#### 機能
- カスタム周波数の設定 (37-32767 Hz)
- ビープ音の長さ調整
- 複数回のビープ音生成
- カスタム間隔の設定

#### 使用例
```powershell
# 基本的な使用方法
beep -f 1000 -n 3 -i 500

# 長いビープ音を生成
beep -Frequency 800 -Long

# 複数回のビープ音
beep -c 5 -f 2000
```

## 必要要件

### AWS SAM DynamoDB Sample
- AWS SAM CLI
- Node.js 20.x以上
- AWS認証情報の設定

### PowerShell Beep Tool
- Windows PowerShell 5.1以上
- 管理者権限（オプション）

## ライセンス

各プロジェクトのライセンスについては、個別のLICENSEファイルを参照してください。
