# AWS SAM DynamoDB CRUDサンプル

## 概要
AWS SAMを使用したDynamoDBの基本的なCRUD操作サンプルです。  
以下の操作が可能なAPIを提供します：
- アイテム作成
- アイテム取得
- アイテム更新
- アイテム削除

## 動作要件
- AWSアカウント
- AWS SAM CLI インストール済み
- PowerShell環境

## デプロイ手順
```powershell
sam build
sam deploy --guided
```

## APIエンドポイント設定
```powershell
$env:API_ENDPOINT="YOUR_API_ENDPOINT_URL"  # deploy出力のApiEndpoint値を設定
```

## サンプルコマンド
### アイテム作成
```powershell
curl.exe -X POST `
  -H "Content-Type: application/json" `
  -d "{ \`"id\`": \`"1001\`", \`"data\`": \`"test data\`" }" `
  $env:API_ENDPOINT/items
```

### アイテム取得
```powershell
curl.exe -X GET $env:API_ENDPOINT/items/1001
```

### アイテム更新
```powershell
curl.exe -X PUT `
  -H "Content-Type: application/json" `
  -d "{ \`"data\`": \`"updated data\`" }" `
  $env:API_ENDPOINT/items/1001
```

### アイテム削除
```powershell
curl.exe -X DELETE $env:API_ENDPOINT/items/1001
```

## 動作確認手順
1. 上記コマンドを順次実行
2. 各操作後にAWSコンソールでDynamoDBテーブルを確認
3. エラー発生時はCloudWatchログで調査

## クリーンアップ
```powershell
sam delete
```

> **⚠ 注意**  
> 実際の環境では`YOUR_API_ENDPOINT_URL`をデプロイ時に出力されたURLに置き換えてください

