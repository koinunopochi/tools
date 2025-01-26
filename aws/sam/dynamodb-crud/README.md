# DynamoDB CRUD プロジェクト

このプロジェクトは、AWS DynamoDBを使用した基本的なCRUD操作を実装するためのテンプレートです。バージョン管理と機能拡張を考慮したディレクトリ構造を採用しており、長期メンテナンスや並行開発に適しています。

---

## ディレクトリ構造

```
dynamodb-crud/
├── versions/                 # バージョン管理用ディレクトリ
│   ├── v1.0.0-basic-crud/    # 初期バージョン（基本的なCRUD操作）
│   │   ├── template.yaml     # SAMテンプレート
│   │   └── src/              # ソースコード
│   └── v1.1.0-validation-layer/  # バリデーションレイヤー追加バージョン
│       ├── template.yaml     # SAMテンプレート
│       ├── src/              # ソースコード
│       └── layers/           # バリデーションレイヤー
├── current/ -> versions/v1.1.0-validation-layer  # 最新バージョンへのシンボリックリンク
├── package.json              # スクリプト管理用ファイル
└── CHANGELOG.md              # 変更履歴
```

---

## スクリプトの使用方法

`package.json`に定義されたスクリプトを使用して、ディレクトリの管理やバージョン管理を行います。以下は主要なスクリプトの一覧です。

### 1. プロジェクト名の変更
```bash
npm run rename-project
```
- プロジェクトのルートディレクトリ名を変更します。

### 2. バージョンディレクトリの作成
```bash
npm run create-version-dir
```
- `versions/`ディレクトリに新しいバージョンのディレクトリを作成します。

### 3. 現在のディレクトリ内容をバージョンディレクトリに移動
```bash
npm run move-to-version
```
- 現在のプロジェクト内容を指定したバージョンディレクトリに移動します。

### 4. シンボリックリンクの作成
```bash
npm run create-symlink
```
- `current/`ディレクトリに、指定したバージョンディレクトリへのシンボリックリンクを作成します。

### 5. シンボリックリンクの更新
```bash
npm run update-symlink
```
- `current/`ディレクトリのシンボリックリンクを新しいバージョンに更新します。

### 6. バージョン一覧の表示
```bash
npm run list-versions
```
- `versions/`ディレクトリ内のバージョン一覧を表示します。

---

## バージョン管理

### バージョン番号のルール
バージョン番号は[Semantic Versioning](https://semver.org/)に従い、以下の形式で管理します。
- **メジャーバージョン (vX.0.0)**: 後方互換性のない大きな変更
- **マイナーバージョン (v1.X.0)**: 後方互換性のある機能追加
- **パッチバージョン (v1.0.X)**: バグ修正や軽微な変更

### バージョンアップの手順
1. 新しいバージョンディレクトリを作成します。
   ```bash
   npm run create-version-dir
   ```
2. 現在のディレクトリ内容を新しいバージョンディレクトリに移動します。
   ```bash
   npm run move-to-version
   ```
3. シンボリックリンクを新しいバージョンに更新します。
   ```bash
   npm run update-symlink
   ```

---

## CHANGELOGの更新

各バージョンの変更内容は`CHANGELOG.md`に記録します。以下は記録例です。

```markdown
# CHANGELOG

## [v1.1.0] - 2024-01-26
### Added
- バリデーションレイヤーの実装
- 詳細なエラーレスポンス形式

## [v1.0.0] - 2024-01-25
### Initial Release
- 基本的なCRUD操作の実装
- DynamoDB単一テーブル構成
```

---

## 開発ルール

1. **バージョン管理**: すべての変更は新しいバージョンディレクトリに反映し、`current/`シンボリックリンクで最新版を指向します。
2. **ドキュメント**: 各バージョンの変更内容は必ず`CHANGELOG.md`に記録します。
3. **スクリプトの使用**: ディレクトリ操作は`package.json`のスクリプトを使用し、手動での操作を避けます。
4. **Gitタグ**: 各バージョンに対応するGitタグを作成し、リリース管理を行います。
   ```bash
   git tag -a v1.0.0 -m "Initial release with basic CRUD operations"
   git push origin --tags
   ```

---

## 今後の拡張予定

- **v2.0.0**: 複合キーのサポートを追加予定
- **v1.2.0**: ロギング機能の追加を検討中


