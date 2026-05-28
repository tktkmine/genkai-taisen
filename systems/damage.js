import {

  getElementMultiplier

}
from "./elements.js";

/* =====================
   最低保証ダメージ
===================== */

const MIN_DAMAGE = 1;

/* =====================
   ダメージ計算
===================== */

export function calculateDamage({

  attacker,

  defender,

  gaugeMultiplier

}) {

  /* 基礎攻撃力 */

  const baseDamage =

    attacker.atk -
    defender.def;

  /* 最低保証 */

  const fixedDamage =

    Math.max(
      MIN_DAMAGE,
      baseDamage
    );

  /* 属性倍率 */

  const elementMultiplier =

    getElementMultiplier({

      attacker,

      defender

    });

  /* 最終ダメージ */

  const totalDamage =

    fixedDamage
    *
    gaugeMultiplier
    *
    elementMultiplier;

  /* 整数化 */

  return Math.floor(
    totalDamage
  );
}

/* =====================
   HP減少
===================== */

export function applyDamage({

  target,

  damage

}) {

  target.currentHp -= damage;

  /* HP下限 */

  if (target.currentHp < 0) {

    target.currentHp = 0;
  }
}

/* =====================
   生存判定
===================== */

export function isDead(

  target

) {

  return (
    target.currentHp <= 0
  );
}
