// src/main.js
import * as THREE from 'three';

// ------------------------------------------------------
// 1. シーン・カメラ・レンダラーの初期化
// ------------------------------------------------------
const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;

// 描画範囲の左端 (x=0) かつ縦軸の中央 (y=0) を原点とする OrthographicCamera の設定
const camera = new THREE.OrthographicCamera(
  0, // left: x=0（左端）
  width, // right: x=width（右端）
  height / 2, // top: y=height/2（上端）
  -height / 2, // bottom: y=-height/2（下端）
  1,
  1000
);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// ------------------------------------------------------
// 2. Audio のセットアップ
// ------------------------------------------------------
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
const FFT_SIZE = 2048; // 時間領域解析用の fftSize
let analyser = null;

audioLoader.load('audio.mp3', (buffer) => {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();

  // AudioAnalyser を生成
  analyser = new THREE.AudioAnalyser(sound, FFT_SIZE);
});

// 自動再生制限対策：ユーザー操作（クリック）で AudioContext を再開
document.addEventListener('click', () => {
  if (sound.context.state === 'suspended') {
    sound.context.resume().then(() => {
      console.log('AudioContext resumed.');
    });
  }
});

// ------------------------------------------------------
// 3. 波形表示用ジオメトリの作成
// ------------------------------------------------------
// 表示する履歴サンプル数（＝ラインの頂点数）を設定
const sampleCount = 256;
// 各頂点の y 値（振幅）を保持する配列。初期値は 0（無音状態）とする
const waveformHistory = new Array(sampleCount).fill(0);

// ラインジオメトリの作成
// x 座標は左端 (x=0) から右端 (x=width) まで均等に配置
const waveformGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(sampleCount * 3);
for (let i = 0; i < sampleCount; i++) {
  const x = (i / (sampleCount - 1)) * width;
  positions[i * 3] = x;
  positions[i * 3 + 1] = 0; // 初期 y 値は 0
  positions[i * 3 + 2] = 0; // z = 0（2D 表示）
}
waveformGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

const waveformMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
const waveformLine = new THREE.Line(waveformGeometry, waveformMaterial);
scene.add(waveformLine);

// FFT サイズに合わせたバッファ（getByteTimeDomainData 用）
const timeDomainData = new Uint8Array(FFT_SIZE);

// ------------------------------------------------------
// 4. ウィンドウリサイズ時の処理
// ------------------------------------------------------
window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.right = w;
  camera.top = h / 2;
  camera.bottom = -h / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

// ------------------------------------------------------
// 5. アニメーションループ
// ------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  if (analyser) {
    // 現在の時間領域の波形データを取得
    analyser.analyser.getByteTimeDomainData(timeDomainData);
    // 配列の中央付近のサンプル値を採用（値は 0～255、中央は約 128）
    const sampleIndex = Math.floor(timeDomainData.length / 2);
    const sampleRaw = timeDomainData[sampleIndex];
    // 中央 (128) を 0 として、[-1, 1] に正規化
    const amplitude = (sampleRaw - 128) / 128;

    // 新しいサンプルを**左端**に追加するため、古い値（右端）を削除し、最新の値を配列先頭に追加
    waveformHistory.pop();
    waveformHistory.unshift(amplitude);

    // ユーザー指定のスケール：scaleY = height * 100
    const scaleY = height * 1.2;

    // 各頂点の y 座標を更新（waveformHistory[0] が左端、[sampleCount-1] が右端）
    const posArray = waveformGeometry.attributes.position.array;
    for (let i = 0; i < sampleCount; i++) {
      posArray[i * 3 + 1] = waveformHistory[i] * scaleY;
    }
    waveformGeometry.attributes.position.needsUpdate = true;
  }

  renderer.render(scene, camera);
}
animate();
