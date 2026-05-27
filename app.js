import { monsters }
  from './data/monsters.js';

import { calculateDamage }
  from './systems/battle.js';

/* =====================
   モンスター生成
===================== */

const player =
  structuredClone(monsters[0]);

const enemy =
  structuredClone(monsters[1]);

/* =====================
   ゲージ変数
===================== */

let currentMultiplier = 1;

let gauge = 0;

let gaugeDirection = 1;

let gaugeActive = false;

/* =====================
   DOM取得
===================== */

const gaugeBar =
  document.getElementById("gauge-bar");

const multiplierText =
  document.getElementById("multiplier-text");

const stopBtn =
  document.getElementById("stop-btn");

const battleLog =
  document.getElementById("battle-log");

/* =====================
   ログ表示
===================== */

function log(text) {

  battleLog.innerHTML += `
    <p>${text}</p>
  `;

  battleLog.scrollTop =
    battleLog.scrollHeight;
}

/* =====================
   最大HP保持
===================== */

player.maxHp = player.hp;

enemy.maxHp = enemy.hp;

/* =====================
   UI更新
===================== */

function updateUI() {

  /* プレイヤー */

  document.getElementById(
    "player-name"
  ).textContent =
    player.name;

  document.getElementById(
    "player-rank"
  ).textContent =
    player.rank;

  document.getElementById(
    "player-desc"
  ).textContent =
    player.description;

  /* 敵 */

  document.getElementById(
    "enemy-name"
  ).textContent =
    enemy.name;

  document.getElementById(
    "enemy-rank"
  ).textContent =
    enemy.rank;

  document.getElementById(
    "enemy-desc"
  ).textContent =
    enemy.description;

  /* HP表示 */

  document.getElementById(
    "player-hp-text"
  ).textContent =
    `HP: ${player.hp} / ${player.maxHp}`;

  document.getElementById(
    "enemy-hp-text"
  ).textContent =
    `HP: ${enemy.hp} / ${enemy.maxHp}`;

  /* HPバー */

  document.getElementById(
    "player-hp-fill"
  ).style.width =
    `${(player.hp / player.maxHp) * 100}%`;

  document.getElementById(
    "enemy-hp-fill"
  ).style.width =
    `${(enemy.hp / enemy.maxHp) * 100}%`;
}

/* =====================
   ゲージ開始
===================== */

function startGauge(callback) {

  if (gaugeActive) return;

  gaugeActive = true;

  gauge = 0;

  gaugeDirection = 1;

  const interval = setInterval(() => {

    gauge +=
      gaugeDirection *
      (1 + gauge * 0.03);

    /* 最大 */

    if (gauge >= 100) {

      gauge = 100;

      gaugeDirection = -1;
    }

    /* 最小 */

    if (gauge <= 0) {

      gauge = 0;

      gaugeDirection = 1;
    }

    /* ゲージ描画 */

    gaugeBar.style.width =
      `${gauge}%`;

    /* 倍率 */

    currentMultiplier =
      1 + (gauge / 100) * 4;

    multiplierText.textContent =
      `倍率: x${currentMultiplier.toFixed(1)}`;

  }, 16);

  /* STOP */

  stopBtn.onclick = () => {

    clearInterval(interval);

    gaugeActive = false;

    callback(currentMultiplier);
  };
}

/* =====================
   敵ターン
===================== */

function enemyTurn() {

  setTimeout(() => {

    const aiMultiplier =
      1 + Math.random() * 4;

    const damage =
      calculateDamage(
        enemy,
        player,
        aiMultiplier
      );

    player.hp -= damage;

    player.hp =
      Math.max(0, player.hp);

    log(`
      ${enemy.name}
      の攻撃！
      ${damage}ダメージ！
    `);

    updateUI();

    /* 敗北 */

    if (player.hp <= 0) {

      log("敗北...");
    }

  }, 1200);
}

/* =====================
   通常攻撃
===================== */

document.getElementById(
  "attack-btn"
).onclick = () => {

  startGauge((multiplier) => {

    const damage =
      calculateDamage(
        player,
        enemy,
        multiplier
      );

    enemy.hp -= damage;

    enemy.hp =
      Math.max(0, enemy.hp);

    log(`
      ${player.name}
      の攻撃！
      ${damage}ダメージ！
    `);

    updateUI();

    /* 勝利 */

    if (enemy.hp <= 0) {

      log("勝利！");

      return;
    }

    enemyTurn();
  });
};

/* =====================
   スキル攻撃
===================== */

document.getElementById(
  "skill-btn"
).onclick = () => {

  startGauge((multiplier) => {

    const damage =
      calculateDamage(
        player,
        enemy,
        multiplier * 1.3
      );

    enemy.hp -= damage;

    enemy.hp =
      Math.max(0, enemy.hp);

    log(`
      ${player.name}
      の
      ${player.skill}！
      ${damage}ダメージ！
    `);

    updateUI();

    /* 勝利 */

    if (enemy.hp <= 0) {

      log("勝利！");

      return;
    }

    enemyTurn();
  });
};

/* =====================
   初期化
===================== */

updateUI();

log("幻界大戦 Ver1 開始");
