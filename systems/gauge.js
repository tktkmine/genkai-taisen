/* =====================
   ゲージ開始
===================== */

export function startGauge({

  gaugeBar,

  multiplierText,

  stopButton,

  onStop

}) {

  let gauge = 0;

  let direction = 1;

  let active = true;

  /* =====================
     ゲージ更新
  ===================== */

  const interval = setInterval(() => {

    /* 加速 */

    gauge +=
      direction *
      (1 + gauge * 0.03);

    /* 最大 */

    if (gauge >= 100) {

      gauge = 100;

      direction = -1;
    }

    /* 最小 */

    if (gauge <= 0) {

      gauge = 0;

      direction = 1;
    }

    /* 描画 */

    gaugeBar.style.width =
      `${gauge}%`;

    /* 倍率 */

    const multiplier =
      1 + (gauge / 100) * 4;

    multiplierText.textContent =
      `倍率: x${multiplier.toFixed(1)}`;

  }, 16);

  /* =====================
     STOP
  ===================== */

  stopButton.onclick = () => {

    if (!active) return;

    active = false;

    clearInterval(interval);

    /* 最終倍率 */

    const finalMultiplier =
      1 + (gauge / 100) * 4;

    onStop(finalMultiplier);
  };
}
