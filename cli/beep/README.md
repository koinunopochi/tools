# PowerShell Beep Script

PowerShellでビープ音を鳴らすためのシンプルなスクリプトです。エイリアスとして `beep` コマンドを使用可能です。

## 機能

- シンプルなコマンドでビープ音を生成
- ショートオプション対応（-l, -n, -c, -f）
- 長いビープ音と通常のビープ音の切り替え
- 複数回のビープ音に対応

## インストール方法

1. このリポジトリをクローンまたはダウンロードします

2. PowerShellプロファイルにエイリアスを追加します
```powershell
# PowerShellプロファイルを開く
notepad $PROFILE

# 以下の行を追加
Set-Alias -Name beep -Value "フルパスを指定/Beep.ps1"
```

## 使用方法

### 基本的な使い方

```powershell
# 通常のビープ音
beep

# 長いビープ音
beep -l

# 3回ビープ音を鳴らす
beep -n 3

# 長いビープ音を3回鳴らす
beep -l -n 3

# 高い音（1000Hz）で鳴らす
beep -f 1000
```

### オプション

| オプション | エイリアス | 説明 | デフォルト値 |
|------------|------------|------|--------------|
| -Frequency | -f | ビープ音の周波数（37-32767Hz） | 500Hz |
| -Long | -l | 長いビープ音（1秒）を鳴らす | false |
| -Count | -n | ビープ音を鳴らす回数（1-100） | 1 |
| -Interval | -i | 複数回鳴らす場合の間隔（ミリ秒） | 200ms |

## 動作要件

- Windows PowerShell 5.1以上
- Windows環境（Console.Beep()メソッドを使用するため）

## トラブルシューティング

エイリアスが機能しない場合：
1. PowerShellプロファイルが存在することを確認
```powershell
Test-Path $PROFILE
```

2. プロファイルが存在しない場合は作成
```powershell
New-Item -Path $PROFILE -Type File -Force
```

3. プロファイルを編集してエイリアスを追加
```powershell
Add-Content $PROFILE 'Set-Alias -Name beep -Value "フルパスを指定/Beep.ps1"'
```

## ライセンス

[MITライセンス](LICENSE)

## 貢献について

バグ報告や機能改善の提案は、GitHubのIssueやPull Requestsでお待ちしております。
