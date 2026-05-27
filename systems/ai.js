/* =====================
   AI行動選択
===================== */

export function chooseAction(aiMonster) {

  /* ランダム */

  const random =
    Math.random();

  /* =====================
     スキル使用
  ===================== */

  if (random > 0.5) {

    return {

      type: "skill",

      skillName:
        aiMonster.skill
    };
  }

  /* =====================
     通常攻撃
  ===================== */

  return {

    type: "attack"
  };
}

/* =====================
   AIゲージ倍率
===================== */

export function generateAIMultiplier() {

  /* 1.0〜5.0 */

  const multiplier =
    1 + Math.random() * 4;

  return multiplier;
}
