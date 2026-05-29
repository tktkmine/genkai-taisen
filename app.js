<!DOCTYPE html>
<html lang="ja">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>幻界大戦</title>

  <link
    rel="stylesheet"
    href="./style.css"
  />

</head>

<body>

  <!-- =====================
       タイトル
  ====================== -->

  <section
    id="title-screen"
    class="screen active"
  >

    <h1 id="game-title">

      幻界大戦

    </h1>

    <button id="start-btn">

      GAME START

    </button>

  </section>

  <!-- =====================
       メニュー
  ====================== -->

  <section
    id="menu-screen"
    class="screen"
  >

    <h2>

      メインメニュー

    </h2>

    <button id="menu-battle">

      モンスターテイム

    </button>

    <button id="menu-gacha">

      ガチャ

    </button>

    <button id="menu-home">

      マイホーム

    </button>

    <button id="menu-collection">

      図鑑

    </button>

  </section>

  <!-- =====================
       バトル
  ====================== -->

  <section
    id="battle-screen"
    class="screen"
  >

    <h2>

      バトル

    </h2>

    <!-- 敵 -->

    <div>

      <h3 id="enemy-name"></h3>

      <p id="enemy-rank"></p>

      <p id="enemy-desc"></p>

      <div class="hp-bar">

        <div
          id="enemy-hp-fill"
          class="hp-fill"
        ></div>

      </div>

      <p id="enemy-hp-text"></p>

    </div>

    <!-- プレイヤー -->

    <div>

      <h3 id="player-name"></h3>

      <p id="player-rank"></p>

      <p id="player-desc"></p>

      <div class="hp-bar">

        <div
          id="player-hp-fill"
          class="hp-fill"
        ></div>

      </div>

      <p id="player-hp-text"></p>

    </div>

    <!-- ゲージ -->

    <div id="gauge-container">

      <div id="gauge-bar"></div>

    </div>

    <p id="multiplier-text">

      倍率: x1.0

    </p>

    <button id="stop-btn">

      STOP

    </button>

    <button id="battle-back-btn">

      戻る

    </button>

    <div id="battle-log"></div>

  </section>

  <!-- =====================
       ガチャ
  ====================== -->

  <section
    id="gacha-screen"
    class="screen"
  >

    <h2>

      ガチャ

    </h2>

    <button id="gacha-btn">

      ガチャを引く

    </button>

    <button id="gacha-back-btn">

      戻る

    </button>

    <div id="gacha-result"></div>

  </section>

  <!-- =====================
       ホーム
  ====================== -->

  <section
    id="home-screen"
    class="screen"
  >

    <h2>

      マイホーム

    </h2>

    <p id="home-player-name"></p>

    <p id="home-player-world"></p>

    <p id="home-player-gold"></p>

    <div id="party-container"></div>

    <button id="home-back-btn">

      戻る

    </button>

  </section>

  <!-- =====================
       図鑑
  ====================== -->

  <section
    id="collection-screen"
    class="screen"
  >

    <h2>

      モンスター図鑑

    </h2>

    <div id="collection-list"></div>

    <button id="collection-back-btn">

      戻る

    </button>

  </section>

  <!-- =====================
       app.js
  ====================== -->

  <script
    type="module"
    src="./app.js"
  ></script>

</body>

</html>
