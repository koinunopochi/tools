[CmdletBinding()]
param(
    [Parameter()]
    [Alias('h')]
    [switch]$Help,

    [Parameter()]
    [Alias('f')]
    [ValidateRange(37, 32767)]
    [int]$Frequency = 500,
    
    [Parameter()]
    [Alias('l')]
    [switch]$Long,
    
    [Parameter()]
    [Alias('n', 'c')]
    [ValidateRange(1, 100)]
    [int]$Count = 1,
    
    [Parameter()]
    [Alias('i')]
    [ValidateRange(0, 5000)]
    [int]$Interval = 200
)

function Get-Help {
    $helpText = @"
ビープ音生成スクリプト

構文: beep [-Frequency <int>] [-Long] [-Count <int>] [-Interval <int>] [-Help]

パラメータ:
  -Frequency, -f  : ビープ音の周波数（37-32767 Hz）
  -Long, -l       : ビープ音を長く鳴らす（1000ms）
  -Count, -n, -c  : ビープ音を鳴らす回数（1-100回）
  -Interval, -i   : ビープ音の間隔（0-5000ms）
  -Help, -h       : このヘルプメッセージを表示

例:
  beep -f 1000 -n 3 -i 500
  beep -Frequency 800 -Long
  beep -c 5 -f 2000
"@
    Write-Host $helpText
    exit
}

function New-Beep {
    [CmdletBinding()]
    param(
        [Parameter(Position = 0)]
        [ValidateRange(37, 32767)]
        [int]$Frequency = 500,
        
        [Parameter(Position = 1)]
        [int]$Duration = 300
    )
    
    try {
        [Console]::Beep($Frequency, $Duration)
    }
    catch {
        Write-Error "ビープ音の生成に失敗しました: $_"
    }
}

# メイン処理
try {
    # ヘルプメッセージの表示
    if ($Help) {
        Get-Help
    }

    # 長さの設定
    $Duration = if ($Long) { 1000 } else { 300 }
    
    for ($i = 0; $i -lt $Count; $i++) {
        New-Beep -Frequency $Frequency -Duration $Duration
        if ($i -lt $Count - 1) {
            Start-Sleep -Milliseconds $Interval
        }
    }
}
catch {
    Write-Error "スクリプトの実行中にエラーが発生しました: $_"
}
