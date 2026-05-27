/* =====================
   リザルト表示
===================== */

export function showBattleResult({

  resultScreenId,

  titleId,

  rewardId,

  isWin,

  enemyMonster

}) {

  const resultScreen =
    document.getElementById(
      resultScreenId
    );

  const title =
    document.getElementById(
      titleId
    );

  const reward =
    document.getElementById(
      rewardId
    );

  /* 表示 */

  resultScreen.style.display =
    "block";

  /* =====================
     勝利
  ===================== */

  if (isWin) {

    title.textContent =
      "勝利！";

    reward.textContent =
      `${enemyMonster.name}
      をテイムした！`;

    return;
  }

  /* =====================
     敗北
  ===================== */

  title.textContent =
    "敗北...";

  reward.textContent =
    "モンスターを逃した...";
}

/* =====================
   リザルト非表示
===================== */

export function hideBattleResult(

  resultScreenId

) {

  document.getElementById(
    resultScreenId
  ).style.display =
    "none";
}

/* =====================
   リザルトボタン
===================== */

export function initializeResultButtons({

  retryButtonId,

  menuButtonId,

  onRetry,

  onMenu

}) {

  /* リトライ */

  document.getElementById(
    retryButtonId
  ).onclick = () => {

    onRetry();
  };

  /* メニュー */

  document.getElementById(
    menuButtonId
  ).onclick = () => {

    onMenu();
  };
}
