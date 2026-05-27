/* =====================
   画面切り替え
===================== */

export function switchScreen(

  hideScreenId,

  showScreenId

) {

  const hideScreen =
    document.getElementById(
      hideScreenId
    );

  const showScreen =
    document.getElementById(
      showScreenId
    );

  /* 非表示 */

  hideScreen.style.display =
    "none";

  /* 表示 */

  showScreen.style.display =
    "block";
}

/* =====================
   メニュー生成
===================== */

export function initializeMenu({

  onBattle,

  onOnline,

  onPractice,

  onHome

}) {

  /* AI対戦 */

  document.getElementById(
    "menu-battle"
  ).onclick = () => {

    onBattle();
  };

  /* 領土争奪戦 */

  document.getElementById(
    "menu-online"
  ).onclick = () => {

    onOnline();
  };

  /* 練習試合 */

  document.getElementById(
    "menu-practice"
  ).onclick = () => {

    onPractice();
  };

  /* マイホーム */

  document.getElementById(
    "menu-home"
  ).onclick = () => {

    onHome();
  };
}

/* =====================
   タイトル表示
===================== */

export function setTitle(

  titleId,

  subtitleId,

  title,

  subtitle

) {

  document.getElementById(
    titleId
  ).textContent =
    title;

  document.getElementById(
    subtitleId
  ).textContent =
    subtitle;
}
