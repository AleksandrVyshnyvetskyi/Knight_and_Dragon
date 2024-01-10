let xp = 0;
let health = 100;
let gold = 5000;
let currentWeapon = 0;
let fighting = 10;
let monsterHealth;
let inventory = [];

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
const monsterDmg = document.querySelector("#monsterDmg");
const monsterLvl = document.querySelector("#monsterLvl");

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
        name: "Wolf",
        level: 2,
        health: 30,
    },
    {
        name: "Goblin",
        level: 4,
        health: 75,
    },
    {
        name: "Skeleton",
        level: 6,
        health: 150,
    },
    {
        name: "Cerber",
        level: 8,
        health: 200,
    },
    {
        name: "Dragon",
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
            "Buy 10 health (50 gold)",
            "Buy weapon (100 gold)",
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
    monsterStats.style.display = "none";
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
    button6.style.marginLeft = "200px";
    close();
}

function openInventory() {
    inventoryBox.style.display = "block";
    inventoryBox.classList.remove("hiden");
    if (inventory.includes("stick")) {
        stick.style.display = "block";
    }
    if (inventory.includes("dager")) {
        dager.style.display = "block";
    }
    if (inventory.includes("sword")) {
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
    fighting = 20;
    dmgText.innerText = "20";
    console.log("stick");
    close();
}

function equipDager() {
    knight.src = "./css/img/knights/knight_dager.png";
    fighting = 50;
    dmgText.innerText = 50;
    close();
}

function equipSword() {
    knight.src = "./css/img/knights/knight_sword.png";
    fighting = 75;
    dmgText.innerText = 75;
    close();
}

function dmgMetr() {
    if (weapons.length < 1) {
        fighting = 10;
        dmgText.innerText = "10";
    }
    if (inventory.includes("stick")) {
        fighting = 20;
        console.log("stick");
        dmgText.innerText = "20";
    }
    if (inventory.includes("dager")) {
        fighting = 50;
        dmgText.innerText = 50;
    }
    if (inventory.includes("sword")) {
        fighting = 75;
        dmgText.innerText = 75;
    }
}

function buyHealth() {
    if (gold >= 50) {
        gold -= 50;
        health += 10;
        goldText.innerText = gold;
        hpText.innerText = health;
    } else {
        animationText();
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 100) {
            gold -= 100;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
            if (inventory.includes("stick")) {
                knight.src = "./css/img/knights/knight_stick.png";
            }
            if (inventory.includes("dager")) {
                knight.src = "./css/img/knights/knight_dager.png";
            }
            if (inventory.includes("sword")) {
                knight.src = "./css/img/knights/knight_sword.png";
            }
            dmgMetr();
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
    }
}

function fightWolf() {
    targetMonster.src = "./css/img/monsters/wolf.png";
    targetMonster.classList = "";
    targetMonster.classList.add("wolf");

    monsterStats.style.display = "flex";
    monsterName.innerText = monster[0].name;
    monsterHealthText.innerText = monster[0].health;
    monsterLvl.innerText = monster[0].level;

    fighting = 0;
    goFight();
}

function fightGoblin() {
    targetMonster.src = "./css/img/monsters/goblin.png";
    targetMonster.classList = "";
    targetMonster.classList.add("goblin");

    monsterStats.style.display = "flex";
    monsterName.innerText = monster[1].name;
    monsterHealthText.innerText = monster[1].health;
    monsterLvl.innerText = monster[1].level;

    fighting = 1;
    goFight();
}

function fightSkeleton() {
    targetMonster.src = "./css/img/monsters/skeleton.png";
    targetMonster.classList = "";
    targetMonster.classList.add("skeleton");

    monsterStats.style.display = "flex";
    monsterName.innerText = monster[2].name;
    monsterHealthText.innerText = monster[2].health;
    monsterLvl.innerText = monster[2].level;

    fighting = 2;
    goFight();
}

function fightCerber() {
    targetMonster.src = "./css/img/monsters/cerber.png";
    targetMonster.classList = "";
    targetMonster.classList.add("cerber");

    monsterStats.style.display = "flex";
    monsterName.innerText = monster[3].name;
    monsterHealthText.innerText = monster[3].health;
    monsterLvl.innerText = monster[3].level;

    fighting = 3;
    goFight();
}

function fightDragon() {
    targetMonster.src = "./css/img/monsters/dragon.png";
    targetMonster.classList = "";
    targetMonster.classList.add("dragon");

    monsterStats.style.display = "flex";
    monsterName.innerText = monster[4].name;
    monsterHealthText.innerText = monster[4].health;
    monsterLvl.innerText = monster[4].level;

    fighting = 4;
    goFight();
}

function attack() {
    const currentHealMonster = monster[0].health;
    // monsterHealthText.innerText = currentHealMonster;
    // const resultHeal = currentHealMonster - 10;
    // monster[0].health = resultHeal;
    // monsterHealthText.innerText = resultHeal;
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
