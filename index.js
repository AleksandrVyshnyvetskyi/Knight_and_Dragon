let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [];

const backGround = document.querySelector(".container");
const knight = document.querySelector(".knight");
const inventoryBTN = document.querySelector(".inventory");
const monsters = document.querySelector(".monsters");

const wolf = document.querySelector(".wolf");
const goblin = document.querySelector(".goblin");
const skeleton = document.querySelector(".skeleton");
const cerber = document.querySelector(".cerber");
const dragon = document.querySelector(".dragon");

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const button6 = document.querySelector("#button6");

const text = document.querySelector(".message");
const xpText = document.querySelector("#xpText");
const hpText = document.querySelector("#hpText");
const dmgText = document.querySelector("#dmgText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "empty",
        power: 10,
    },
    {
        name: "stick",
        power: 20,
    },
    {
        name: "dager",
        power: 50,
    },
    {
        name: "sword",
        power: 75,
    },
];

const monster = [
    {
        name: "wolf",
        level: 2,
        health: 30,
    },
    {
        name: "goblin",
        level: 4,
        health: 75,
    },
    {
        name: "skeleton",
        level: 6,
        health: 150,
    },
    {
        name: "cerber",
        level: 8,
        health: 200,
    },
    {
        name: "dragon",
        level: 10,
        health: 300,
    },
];

const locations = [
    {
        name: "town square",
        "button text": ["Go to shop", "Go to forest"],
        "button functions": [goShop, goForest, hideMode],
        text: 'You are in the town square. You see a sign that says "Shop".',
    },
    {
        name: "shop",
        "button text": [
            "Buy 10 health (10 gold)",
            "Buy weapon (30 gold)",
            "Go to town square",
        ],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the shop.",
    },
    {
        name: "forest",
        "button text": [
            "Fight wolf",
            "Fight goblin",
            "Fight skeleton",
            "Fight cerber",
            "Fight dragon",
            "Go to town square",
        ],
        "button functions": [
            fightWolf,
            fightGoblin,
            fightSkeleton,
            fightCerber,
            fightDragon,
            goTown,
        ],
        text: "You enter the forest. You see some monsters.",
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster.",
    },
];

button1.onclick = openInventory;
button2.onclick = goTown;

function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button4.innerText = location["button text"][3];
    button5.innerText = location["button text"][4];
    button6.innerText = location["button text"][5];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    button4.onclick = location["button functions"][3];
    button5.onclick = location["button functions"][4];
    button6.onclick = location["button functions"][5];
    text.innerText = location.text;
}

function goTown() {
    update(locations[0]);
    backGround.style.backgroundImage = 'url("css/img/backgraunds/city.webp")';
    knight.style.top = "75%";
    knight.style.width = "100px";
    knight.style.animation = "bounce 5s ease-in-out infinite";
    wolf.style.display = "none";
    goblin.style.display = "none";
    skeleton.style.display = "none";
    cerber.style.display = "none";
    dragon.style.display = "none";
    button3.style.display = "none";
}

function goShop() {
    update(locations[1]);
    backGround.style.backgroundImage = 'url("css/img/backgraunds/shop.webp")';
    knight.style.width = "130px";
    knight.style.top = "70%";
    button3.style.display = "block";
}

function goForest() {
    update(locations[2]);
    backGround.style.backgroundImage =
        'url("css/img/backgraunds/forest_bg.jpg")';
    knight.style.animation = "bounceKnight 3s ease-in-out infinite";
    knight.style.top = "65%";
    monsters.style.display = "block";
    button3.style.display = "block";
    button4.style.display = "block";
    button5.style.display = "block";
    // button6.style.display = "block";
}

function goCave() {
    1 + 2;
}

function hideMode() {
    1 + 2;
}

function buyHealth() {
    1 + 2;
}

function buyWeapon() {
    1 + 2;
}

function fightWolf() {
    wolf.style.display = "block";
    goblin.style.display = "none";
    skeleton.style.display = "none";
    cerber.style.display = "none";
    dragon.style.display = "none";
    fighting = 0;
    goFight();
}

function fightGoblin() {
    goblin.style.display = "block";
    wolf.style.display = "none";
    skeleton.style.display = "none";
    cerber.style.display = "none";
    dragon.style.display = "none";
    fighting = 1;
    goFight();
}

function fightSkeleton() {
    skeleton.style.display = "block";
    wolf.style.display = "none";
    goblin.style.display = "none";
    cerber.style.display = "none";
    dragon.style.display = "none";
    fighting = 2;
    goFight();
}

function fightCerber() {
    cerber.style.display = "block";
    wolf.style.display = "none";
    goblin.style.display = "none";
    skeleton.style.display = "none";
    dragon.style.display = "none";
    fighting = 3;
    goFight();
}

function fightDragon() {
    dragon.style.display = "block";
    wolf.style.display = "none";
    goblin.style.display = "none";
    skeleton.style.display = "none";
    cerber.style.display = "none";
    fighting = 4;
    goFight();
}

function attack() {
    1 + 2;
}

function dodge() {
    1 + 2;
}

function openInventory() {
    inventoryBTN.style.display = "block";
}

function goFight() {
    update(locations[3]);
    // monsterHealth = monsters[fighting].health;
    // monsterStats.style.display = "block";
    button4.style.display = "none";
    button5.style.display = "none";
}
