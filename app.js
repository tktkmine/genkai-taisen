import { monsters } from "./data/monsters.js";

import { loadGame, saveGame, addGold, addMonster } from "./systems/save.js";

import {
  initializeBattle,
  playerAttack,
  enemyAttack,
  beginPlayerGauge
} from "./systems/battle.js";

import { executeGacha } from "./systems/gacha.js";

import {
  showMenu,
  initializeMenu,
  hideAllScreens
} from "./ui/menuUI.js";

import {
  showTitle,
  initializeTitle,
  playTitleEffect
} from "./ui/titleUI.js";

import {
  renderBattleMonsters,
  updateHpUI,
  clearBattleLog,
  appendBattleLog
} from "./ui/battleUI.js";

import {
  renderCollection,
  showCollection
} from "./ui/collectionUI.js";

import {
  showGachaResult,
  showGachaScreen,
  clearGachaResult
} from "./ui/gachaUI.js";

import {
  renderHome,
  showHomeScreen
} from "./ui/homeUI.js";

import {
  showVictory,
  showDefeat
} from "./ui/resultUI.js";

/* =====================
   セーブ
===================== */

const playerData = loadGame();

/* =====================
   初期安全化
===================== */

if (!playerData.party || playerData.party.length === 0) {
  playerData.party = ["fire_c_1"];
}

/* =====================
   タイトル
===================== */

playTitleEffect();

initializeTitle({
  onStart: () => {
    hideAllScreens();
    showMenu();
  }
});

/* =====================
   メニュー
===================== */

initializeMenu({
  onBattle: startBattleMode,
  onGacha: openGacha,
  onHome: openHome,
  onCollection: openCollection
});

/* =====================
   バトル状態
===================== */

let currentBattle = null;
let battleLock = false;

/* =====================
   バトル開始
===================== */

function startBattleMode() {
  hideAllScreens();

  const playerMonster = monsters.find(m =>
    m.id === playerData.party[0]
  );

  const enemyMonster =
    monsters[Math.floor(Math.random() * monsters.length)];

  if (!playerMonster || !enemyMonster) {
    alert("モンスターが見つかりません");
    return;
  }

  currentBattle = initializeBattle({
    player: structuredClone(playerMonster),
    enemy: structuredClone(enemyMonster),
    gaugeBarId: "gauge-bar",
    multiplierTextId: "multiplier-text"
  });

  showBattleScreen?.();

  renderBattleMonsters(currentBattle);
  updateHpUI(currentBattle);

  clearBattleLog();
  appendBattleLog("戦闘開始！");

  beginPlayerGauge({
    gaugeBarId: "gauge-bar",
    multiplierTextId: "multiplier-text"
  });
}

/* =====================
   STOPボタン
===================== */

document.getElementById("stop-btn").onclick = async () => {
  if (battleLock) return;
  battleLock = true;

  const result = playerAttack({
    battleData: currentBattle,
    logElementId: "battle-log"
  });

  updateHpUI(currentBattle);

  if (result.finished) {
    showVictory({ gold: 100 });

    addGold({
      saveData: playerData,
      amount: 100
    });

    addMonster({
      saveData: playerData,
      monsterId: currentBattle.enemy.id
    });

    battleLock = false;
    return;
  }

  await delay(800);

  const enemyResult = enemyAttack({
    battleData: currentBattle,
    logElementId: "battle-log"
  });

  updateHpUI(currentBattle);

  if (enemyResult.finished) {
    showDefeat();
    battleLock = false;
    return;
  }

  beginPlayerGauge({
    gaugeBarId: "gauge-bar",
    multiplierTextId: "multiplier-text"
  });

  battleLock = false;
};

/* =====================
   ガチャ
===================== */

function openGacha() {
  hideAllScreens();
  showGachaScreen();
  clearGachaResult();
}

document.getElementById("gacha-btn").onclick = () => {
  const result = executeGacha({ playerData });

  if (!result.success) {
    alert(result.message);
    return;
  }

  showGachaResult({
    monster: result.monster
  });
};

/* =====================
   ホーム
===================== */

function openHome() {
  hideAllScreens();
  showHomeScreen();

  const partyMonsters = monsters.filter(m =>
    playerData.party.includes(m.id)
  );

  renderHome({
    playerData,
    partyMonsters
  });
}

/* =====================
   図鑑
===================== */

function openCollection() {
  hideAllScreens();
  showCollection();

  renderCollection({ playerData });
}

/* =====================
   delay
===================== */

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/* =====================
   起動
===================== */

showTitle();
