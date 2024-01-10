let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick", "dager", "sword"];

const backGround = document.querySelector(".container");
const knight = document.querySelector(".knight");

const inventoryBox = document.querySelector(".inventory");
const closeInventory = document.querySelector(".close");
const stick = document.querySelector(".stick");
const dager = document.querySelector(".dager");
const sword = document.querySelector(".sword");

const monsters = document.querySelector(".monsters");
const targetMonster = document.querySelector(".target-monster");

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
        "button text": ["Inventory", "Go to shop", "Go to forest"],
        "button functions": [openInventory, goShop, goForest],
        text: 'You are in the town square. You see a sign that says "Shop".',
    },
    {
        name: "shop",
        "button text": [
            "Inventory",
            "Buy 10 health (10 gold)",
            "Buy weapon (30 gold)",
            "Go to town square",
        ],
        "button functions": [openInventory, buyHealth, buyWeapon, goTown],
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
closeInventory.onclick = close;

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

function animationText() {
    text.classList.remove("animate-message");
    void text.offsetWidth;
    text.classList.add("animate-message");
}

function goTown() {
    update(locations[0]);
    backGround.style.backgroundImage = 'url("css/img/backgraunds/city.webp")';
    knight.style.top = "75%";
    knight.style.left = "40%";
    knight.style.width = "100px";
    knight.style.animation = "bounce 5s ease-in-out infinite";
    targetMonster.style.display = "none";
    targetMonster.classList = "";
    button3.style.display = "block";
    button4.style.display = "none";
    button5.style.display = "none";
    button6.style.display = "none";
    animationText();
    close();
}

function goShop() {
    update(locations[1]);
    backGround.style.backgroundImage = 'url("css/img/backgraunds/shop.webp")';
    knight.style.width = "130px";
    knight.style.top = "70%";
    button3.style.display = "block";
    button4.style.display = "block";
    animationText();
    close();
}

function goForest() {
    update(locations[2]);
    backGround.style.backgroundImage =
        'url("css/img/backgraunds/forest_bg.jpg")';
    knight.style.animation = "bounceKnight 3s ease-in-out infinite";
    knight.style.top = "65%";
    knight.style.left = "30%";

    animationText();
    monsters.style.display = "block";
    button3.style.display = "block";
    button4.style.display = "block";
    button5.style.display = "block";
    button6.style.display = "block";
    close();
}

function openInventory() {
    inventoryBox.style.display = "block";
    inventoryBox.classList.remove("hiden");
    if (inventory.includes("stick")) {
        console.log("STICK === TRUE !!!");
        stick.style.display = "block";
    }
    if (inventory.includes("dager")) {
        console.log("dager === TRUE !!!");
        dager.style.display = "block";
    }
    if (inventory.includes("sword")) {
        console.log("sword === TRUE !!!");
        sword.style.display = "block";
    } else {
        knight.src = "./css/img/knights/knight.png";
    }
}

function close() {
    inventoryBox.classList.add("hiden");
}

stick.onclick = equipStick;
dager.onclick = equipDager;
sword.onclick = equipSword;

function equipStick() {
    knight.src = "./css/img/knights/knight_stick.png";
}

function equipDager() {
    knight.src = "./css/img/knights/knight_dager.png";
}

function equipSword() {
    knight.src = "./css/img/knights/knight_sword.png";
}

function buyHealth() {
    1 + 2;
}

function buyWeapon() {
    1 + 2;
}

function fightWolf() {
    targetMonster.src = "./css/img/monsters/wolf.png";
    targetMonster.classList = "";
    targetMonster.classList.add("wolf");

    fighting = 0;
    goFight();
}

function fightGoblin() {
    targetMonster.src = "./css/img/monsters/goblin.png";
    targetMonster.classList = "";
    targetMonster.classList.add("goblin");

    fighting = 1;
    goFight();
}

function fightSkeleton() {
    targetMonster.src = "./css/img/monsters/skeleton.png";
    targetMonster.classList = "";
    targetMonster.classList.add("skeleton");

    fighting = 2;
    goFight();
}

function fightCerber() {
    targetMonster.src = "./css/img/monsters/cerber.png";
    targetMonster.classList = "";
    targetMonster.classList.add("cerber");

    fighting = 3;
    goFight();
}

function fightDragon() {
    targetMonster.src = "./css/img/monsters/dragon.png";
    targetMonster.classList = "";
    targetMonster.classList.add("dragon");

    fighting = 4;
    goFight();
}

function attack() {
    1 + 2;
}

function dodge() {
    1 + 2;
}

function goFight() {
    update(locations[3]);
    // monsterHealth = monsters[fighting].health;
    // monsterStats.style.display = "block";
    targetMonster.style.display = "block";
    button4.style.display = "none";
    button5.style.display = "none";
    button6.style.display = "none";
}
