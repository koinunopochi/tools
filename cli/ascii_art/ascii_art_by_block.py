import cv2
import numpy as np

ASCII_CHARS = "@%#*+=-:. "

def convert_to_ascii_block_with_space_bg(image_path, block_size=4, new_width=100, threshold=10):
    """
    画像ファイルを読み込み、ブロック単位でASCIIアートに変換して返す。
    画像全体で最頻出の輝度に近いブロックは背景（スペース）に置き換える。
    """
    # 画像の読み込み
    img = cv2.imread(image_path)
    if img is None:
        raise IOError("画像が見つかりません。パスを確認してください。")

    # グレースケール変換
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 指定の幅にリサイズして高さはアスペクト比を保つ
    height, width = gray.shape
    aspect_ratio = height / width
    new_height = int(aspect_ratio * new_width)
    gray_resized = cv2.resize(gray, (new_width, new_height))

    # ヒストグラムを計算し、最も多い輝度値（max_bin）を取得
    # histはshapeが(256, 1)になる（0～255の輝度をカウント）
    hist = cv2.calcHist([gray_resized], [0], None, [256], [0, 256])
    max_bin = np.argmax(hist)  # 輝度値のうち、カウントが最大のもの

    # ブロック単位で平均輝度を計算し、ASCII文字にマッピング
    ascii_art_lines = []
    h, w = gray_resized.shape
    num_chars = len(ASCII_CHARS)

    for row_start in range(0, h, block_size):
        row_end = min(row_start + block_size, h)  # 画像端を超えないように
        ascii_line = []
        for col_start in range(0, w, block_size):
            col_end = min(col_start + block_size, w)
            block = gray_resized[row_start:row_end, col_start:col_end]

            # ブロック内の平均輝度を求める
            avg_val = np.mean(block)

            # 「最も多い輝度」に近い場合はスペースに置き換える
            if abs(avg_val - max_bin) <= threshold:
                ascii_char = ' '
            else:
                # 通常の方法でマッピング（0～255 -> 0～(num_chars-1)）
                index = int(avg_val * (num_chars - 1) / 255)
                ascii_char = ASCII_CHARS[index]

            ascii_line.append(ascii_char)

        ascii_art_lines.append("".join(ascii_line))

    return "\n".join(ascii_art_lines)


if __name__ == "__main__":
    import sys

    # 使い方:
    #   python ascii_art_block_bg.py image.png
    # ブロックサイズや幅、thresholdはお好みで調整
    image_path = sys.argv[1] if len(sys.argv) > 1 else "image.png"
    ascii_art = convert_to_ascii_block_with_space_bg(
        image_path, 
        block_size=2, 
        new_width=80,   # 幅を少し狭めにしてみる例
        threshold=10    # 近いとみなすしきい値
    )
    print(ascii_art)
