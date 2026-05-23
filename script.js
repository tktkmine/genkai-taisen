const menuScene =
document.getElementById("menuScene");

const gameScene =
document.getElementById("gameScene");

const helpScene =
document.getElementById("helpScene");

let floor;
let player;
let inventory;
let enemy;

let currentChoices = [];

let previousScene = "menu";

const enemyNames = [
"スライム",
"ゴブリン",
"オーク",
"骸骨兵",
"ドラゴン"
];

const eventPool = [
"growth",
"rest",
"gather",
"growth",
"rest",
"gather",
"time",
"chaos"
];

const weapons = [

{name:"木の剣", power:1},
{name:"鉄の剣", power:2},
{name:"鋼の剣", power:3},
{name:"伝説の剣", power:4}
];

const armors = [

{name:"木の鎧", power:1},
{name:"鉄の鎧", power:2},
{name:"鋼の鎧", power:3},
{name:"伝説の鎧", power:4}
];

/* =========================
SCENE
========================= */

showMenu();

function showMenu(){

menuScene.style.display = "flex";

gameScene.style.display = "none";

helpScene.style.display = "none";
}

function showGame(){

menuScene.style.display = "none";

gameScene.style.display = "flex";

helpScene.style.display = "none";
}

function openHelp(){

helpScene.style.display = "flex";

if(gameScene.style.display !== "none"){

previousScene = "game";

gameScene.style.display = "none";
}
else{

previousScene = "menu";

menuScene.style.display = "none";
}
}

function closeHelp(){

helpScene.style.display = "none";

if(previousScene === "game"){

gameScene.style.display = "flex";
}
else{

menuScene.style.display = "flex";
}
}

/* =========================
START
========================= */

function startGame(){

floor = 1;

player = {

maxHp:30,
hp:30,

atk:10,
def:0,
crit:10,

weapon:{
name:"なし",
power:0
},

armor:{
name:"なし",
power:0
}
};

inventory = {

potion:1,
bomb:1
};

currentChoices = [];

document.getElementById("resultArea")
.style.display = "none";

document.getElementById("choiceArea")
.style.display = "none";

document.getElementById("attackBtn")
.style.display = "block";

document.getElementById("itemBtn")
.style.display = "block";

closeItemArea();

createEnemy();

showGame();
}

/* =========================
MENU
========================= */

function returnToMenu(){

showMenu();
}

/* =========================
ITEM
========================= */

function toggleItems(){

const area =
document.getElementById("itemArea");

const attackBtn =
document.getElementById("attackBtn");

const itemBtn =
document.getElementById("itemBtn");

if(area.style.display === "none"){

area.style.display = "block";

attackBtn.style.display = "none";

itemBtn.style.display = "none";
}
else{

closeItemArea();
}
}

function closeItemArea(){

document.getElementById("itemArea")
.style.display = "none";

if(enemy &&
enemy.hp > 0 &&
player &&
player.hp > 0){

document.getElementById("attackBtn")
.style.display = "block";

document.getElementById("itemBtn")
.style.display = "block";
}
}

/* =========================
ENEMY
========================= */

function createEnemy(){

enemy = {

name:
enemyNames[
Math.floor(
Math.random()
* enemyNames.length
)
],

maxHp:20 + floor * 5,
hp:20 + floor * 5,

atk:3 + floor,

def:Math.floor(floor / 5),

crit:5 + Math.floor(floor / 3)
};

if(floor === 30){

enemy.name = "魔王";

enemy.maxHp = 250;
enemy.hp = 250;

enemy.atk = 35;

enemy.def = 8;

enemy.crit = 35;
}

updateUI();

drawSprites();

document.getElementById("log")
.innerHTML =
`${enemy.name}が現れた。<br>
何を行う？`;
}

function spawnTimeKeeper(){

enemy = {

name:"時の番人",

maxHp:120,
hp:120,

atk:22,

def:5,

crit:25
};

updateUI();

drawSprites();
}

/* =========================
UI
========================= */

function updateUI(){

document.getElementById("floor")
.innerText =
floor + "階層";

document.getElementById("playerStats")
.innerHTML =
`
HP ${player.hp}/${player.maxHp}<br>
ATK ${player.atk}<br>
DEF ${player.def}<br>
CRT ${player.crit}%
`;

document.getElementById("enemyName")
.innerText =
enemy.name;

document.getElementById("enemyStats")
.innerHTML =
`
HP ${enemy.hp}/${enemy.maxHp}<br>
ATK ${enemy.atk}<br>
DEF ${enemy.def}<br>
CRT ${enemy.crit}%
`;

document.getElementById("inventory")
.innerHTML =
`
回復薬 ×${inventory.potion}<br>
爆薬 ×${inventory.bomb}
`;

document.getElementById("equipment")
.innerHTML =
`
武器：${player.weapon.name}<br>
防具：${player.armor.name}
`;

document.getElementById("playerHpBar")
.style.width =
Math.max(
0,
(player.hp / player.maxHp)
* 100
) + "%";

document.getElementById("enemyHpBar")
.style.width =
Math.max(
0,
(enemy.hp / enemy.maxHp)
* 100
) + "%";
}

/* =========================
ANIMATION
========================= */

function animateHit(id){

const target =
document.getElementById(id);

target.classList.add("damage");

setTimeout(() => {

target.classList.remove("damage");

},150);
}

/* =========================
ATTACK
========================= */

function attack(){

let damage =
Math.max(
1,
player.atk - enemy.def
);

let crit =
Math.random() * 100
< player.crit;

if(crit){
damage *= 2;
}

enemy.hp -= damage;

animateHit("enemySprite");

if(enemy.hp <= 0){

enemy.hp = 0;

updateUI();

document.getElementById("log")
.innerHTML =
`
${enemy.name}撃破<br>
${damage}ダメージ<br>
何を行う？
`;

showChoices();

return;
}

let enemyDamage =
Math.max(
1,
enemy.atk - player.def
);

let enemyCrit =
Math.random() * 100
< enemy.crit;

if(enemyCrit){
enemyDamage *= 2;
}

player.hp -= enemyDamage;

animateHit("playerSprite");

if(player.hp <= 0){

player.hp = 0;

updateUI();

document.getElementById("log")
.innerHTML =
"GAME OVER";

document.getElementById("attackBtn")
.style.display = "none";

document.getElementById("itemBtn")
.style.display = "none";

document.getElementById("resultArea")
.style.display = "block";

return;
}

updateUI();

let log =
`${damage}ダメージ`;

if(crit){
log += "<br>クリティカル！";
}

log +=
`<br>${enemyDamage}ダメージ受けた`;

if(enemyCrit){
log +=
"<br>敵クリティカル！";
}

log +=
"<br>何を行う？";

document.getElementById("log")
.innerHTML = log;
}

/* =========================
ITEM USE
========================= */

function usePotion(){

if(inventory.potion <= 0){

document.getElementById("log")
.innerHTML =
"回復薬がない";

return;
}

inventory.potion--;

player.hp += 20;

if(player.hp > player.maxHp){

player.hp =
player.maxHp;
}

updateUI();

closeItemArea();

document.getElementById("log")
.innerHTML =
"HP20回復<br>何を行う？";
}

function useBomb(){

if(inventory.bomb <= 0){

document.getElementById("log")
.innerHTML =
"爆薬がない";

return;
}

inventory.bomb--;

enemy.hp -= 20;

animateHit("enemySprite");

if(enemy.hp < 0){
enemy.hp = 0;
}

updateUI();

closeItemArea();

document.getElementById("log")
.innerHTML =
"爆薬使用 20ダメージ";

if(enemy.hp <= 0){

showChoices();

document.getElementById("log")
.innerHTML +=
"<br>敵撃破<br>何を行う？";
}
else{

document.getElementById("log")
.innerHTML +=
"<br>何を行う？";
}
}

/* =========================
CHOICE
========================= */

function showChoices(){

const area =
document.getElementById("choiceArea");

area.innerHTML = "";

document.getElementById("attackBtn")
.style.display = "none";

document.getElementById("itemBtn")
.style.display = "none";

if(currentChoices.length === 0){

while(currentChoices.length < 2){

let random =
eventPool[
Math.floor(
Math.random()
* eventPool.length
)
];

if(!currentChoices.includes(random)){

currentChoices.push(random);
}
}
}

currentChoices.forEach(choice => {

let btn =
document.createElement("button");

if(choice === "growth"){

btn.innerText = "成長";

btn.onclick =
growthEvent;
}

if(choice === "rest"){

btn.innerText = "休息";

btn.onclick =
restEvent;
}

if(choice === "gather"){

btn.innerText = "採取";

btn.onclick =
gatherEvent;
}

if(choice === "time"){

btn.innerText = "時巡り";

btn.onclick =
timeEvent;
}

if(choice === "chaos"){

btn.innerText = "時空の渦";

btn.onclick =
chaosEvent;
}

area.appendChild(btn);
});

area.style.display =
"block";
}

/* =========================
GROWTH
========================= */

function growthEvent(){

const area =
document.getElementById("choiceArea");

area.innerHTML =
`
<button onclick="upgrade('atk')">
攻撃+2
</button>

<button onclick="upgrade('hp')">
HP+10
</button>

<button onclick="upgrade('crit')">
CRT+5%
</button>

<button onclick="showChoices()">
戻る
</button>
`;
}

function upgrade(type){

if(type === "atk"){
player.atk += 2;
}

if(type === "hp"){

player.maxHp += 10;
player.hp += 10;
}

if(type === "crit"){
player.crit += 5;
}

nextFloor("能力強化");
}

/* =========================
REST
========================= */

function restEvent(){

let heal =
Math.floor(
player.maxHp * 0.8
);

player.hp += heal;

if(player.hp > player.maxHp){

player.hp =
player.maxHp;
}

nextFloor(
`休息 HP+${heal}`
);
}

/* =========================
GATHER
========================= */

function gatherEvent(){

let rand =
Math.random();

let text = "";

if(rand < 0.5){

if(Math.random() < 0.5){

inventory.potion++;

text =
"回復薬発見";
}
else{

inventory.bomb++;

text =
"爆薬発見";
}
}
else{

if(Math.random() < 0.5){

let selected =
weapons[
Math.floor(
Math.random()
* weapons.length
)
];

if(selected.power >
player.weapon.power){

player.weapon =
selected;

player.atk =
10 + selected.power;

text =
`より強い武器を手に入れた！<br>
${selected.name}装備`;
}
else{

text =
"今の武器より弱いようだ";
}
}
else{

let selected =
armors[
Math.floor(
Math.random()
* armors.length
)
];

if(selected.power >
player.armor.power){

player.armor =
selected;

player.def =
selected.power;

text =
`より強い防具を手に入れた！<br>
${selected.name}装備`;
}
else{

text =
"今の防具より弱いようだ";
}
}
}

nextFloor(text);
}

/* =========================
TIME
========================= */

function timeEvent(){

floor -= 5;

if(floor < 1){
floor = 1;
}

player.hp =
player.maxHp;

currentChoices = [];

document.getElementById("choiceArea")
.style.display = "none";

document.getElementById("attackBtn")
.style.display = "block";

document.getElementById("itemBtn")
.style.display = "block";

if(Math.random() < 0.05){

spawnTimeKeeper();

document.getElementById("log")
.innerHTML =
`
時巡り失敗…<br>
時の番人が現れた！<br>
戦闘開始！
`;

return;
}

createEnemy();

updateUI();

document.getElementById("log")
.innerHTML =
"時が巻き戻る<br>何を行う？";
}

/* =========================
CHAOS
========================= */

function chaosEvent(){

let rand =
Math.floor(
Math.random() * 100
);

/* =========================
5%
時の番人
========================= */

if(rand < 5){

document.getElementById("choiceArea")
.style.display = "none";

document.getElementById("attackBtn")
.style.display = "block";

document.getElementById("itemBtn")
.style.display = "block";

spawnTimeKeeper();

document.getElementById("log")
.innerHTML =
`
時空が裂けた…<br>
時の番人が現れた！<br>
戦闘開始！
`;

return;
}

/* =========================
20%
未来経験
========================= */

if(rand < 25){

player.atk += 5;

nextFloor(
"未来を経験した<br>ATK+5"
);

return;
}

/* =========================
20%
老化
========================= */

if(rand < 45){

player.atk -= 5;

if(player.atk < 1){
player.atk = 1;
}

nextFloor(
"老化した…<br>ATK-5"
);

return;
}

/* =========================
25%
爆薬庫
========================= */

if(rand < 70){

inventory.bomb += 2;

nextFloor(
"爆薬庫を発見<br>爆薬+2"
);

return;
}

/* =========================
30%
時空移動
========================= */

let move =
Math.floor(
Math.random() * 11
) - 5;

floor += move;

if(floor < 1){
floor = 1;
}

document.getElementById("choiceArea")
.style.display = "none";

document.getElementById("attackBtn")
.style.display = "block";

document.getElementById("itemBtn")
.style.display = "block";

createEnemy();

document.getElementById("log")
.innerHTML =
`
時空が歪む…<br>
${move}階移動した<br>
戦闘開始！
`;
}

/* =========================
NEXT FLOOR
========================= */

function nextFloor(message){

currentChoices = [];

floor++;

document.getElementById("choiceArea")
.style.display = "none";

document.getElementById("attackBtn")
.style.display = "block";

document.getElementById("itemBtn")
.style.display = "block";

createEnemy();

updateUI();

document.getElementById("log")
.innerHTML =
message +
"<br>何を行う？";
}

/* =========================
SPRITE
========================= */

function drawSprites(){

document.getElementById("playerSprite")
.innerHTML = `
<div class="sprite">

<svg viewBox="0 0 64 64">

<rect x="24" y="4"
width="16"
height="8"
fill="#663300"/>

<rect x="20" y="12"
width="24"
height="20"
fill="#ffcc99"/>

<rect x="26" y="20"
width="4"
height="4"
fill="#000"/>

<rect x="36" y="20"
width="4"
height="4"
fill="#000"/>

<rect x="18" y="32"
width="28"
height="24"
fill="#2244aa"/>

</svg>

</div>
`;

let color = "#33cc33";

if(enemy.name === "ゴブリン"){
color = "#88cc22";
}

if(enemy.name === "オーク"){
color = "#559933";
}

if(enemy.name === "骸骨兵"){
color = "#dddddd";
}

if(enemy.name === "ドラゴン"){
color = "#cc3333";
}

if(enemy.name === "魔王"){
color = "#9933cc";
}

if(enemy.name === "時の番人"){
color = "#00bcd4";
}

document.getElementById("enemySprite")
.innerHTML = `
<div class="sprite">

<svg viewBox="0 0 64 64">

<rect x="18" y="10"
width="28"
height="18"
fill="${color}"/>

<rect x="24" y="18"
width="4"
height="4"
fill="#fff"/>

<rect x="36" y="18"
width="4"
height="4"
fill="#fff"/>

<rect x="16" y="30"
width="32"
height="22"
fill="${color}"/>

</svg>

</div>
`;
}
