/* =====================
   ゲージ状態
===================== */

let gaugeValue = 0;

let gaugeSpeed = 0.8;

let gaugeActive = false;

let animationId = null;

/* =====================
   ゲージ開始
===================== */

export function startGauge({

  gaugeBarId,

  multiplierTextId

}) {

  gaugeValue = 0;

  gaugeSpeed = 0.8;

  gaugeActive = true;

  const gaugeBar =

    document.getElementById(
      gaugeBarId
    );

  const multiplierText =

    document.getElementById(
      multiplierTextId
    );

  /* =====================
     更新ループ
  ===================== */

  function updateGauge() {

    /* 停止済み */

    if (!gaugeActive) {

      return;
    }

    /* 増加 */

    gaugeValue += gaugeSpeed;

    /* 最大接近で加速 */

    gaugeSpeed += 0.003;

    /* 上限 */

    if (gaugeValue >= 100) {

      gaugeValue = 0;

      gaugeSpeed = 0.8;
    }

    /* UI反映 */

    gaugeBar.style.width =
      `${gaugeValue}%`;

    /* 倍率 */

    const multiplier =

      calculateMultiplier(
        gaugeValue
      );

    multiplierText.textContent =

      `倍率: x${multiplier.toFixed(1)}`;

    animationId =
      requestAnimationFrame(
        updateGauge
      );
  }

  updateGauge();
}

/* =====================
   ゲージ停止
===================== */

export function stopGauge() {

  gaugeActive = false;

  cancelAnimationFrame(
    animationId
  );

  return calculateMultiplier(
    gaugeValue
  );
}

/* =====================
   倍率計算
===================== */

export function calculateMultiplier(

  value

) {

  /* 0〜100
     ↓
     1〜5
  */

  return (

    1 +
    (value / 100) * 4

  );
}

/* =====================
   現在値取得
===================== */

export function getGaugeValue() {

  return gaugeValue;
}
