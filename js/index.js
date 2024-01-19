let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [];
let lang = "en";

const windowWidth = window.innerWidth;
const langWindow = document.querySelector(".lang-wrap");
const enBtn = document.querySelector("#english");
const uaBtn = document.querySelector("#ukrainian");

const backGround = document.querySelector(".container");
const knight = document.querySelector(".knight");

const winGameWindow = document.querySelector(".win-game");
const winGameButton = document.querySelector(".win-game-button");

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
const allButton = document.querySelector(".controls-list");

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
        en: { name: "fist" },
        ua: { name: "кулак" },
        power: 10,
    },
    { en: { name: "stick" }, ua: { name: "дубина" }, power: 20 },
    { en: { name: "dager" }, ua: { name: "кинджал" }, power: 50 },
    { en: { name: "sword" }, ua: { name: "меч" }, power: 75 },
];

const monster = [
    {
        en: { name: "Wolf" },
        ua: { name: "Вовк" },
        level: 2,
        health: 30,
    },
    {
        en: { name: "Goblin" },
        ua: { name: "Гоблін" },
        level: 5,
        health: 75,
    },
    {
        en: { name: "Skeleton" },
        ua: { name: "Скелет" },
        level: 7,
        health: 300,
    },
    {
        en: { name: "Cerber" },
        ua: { name: "Цербер" },
        level: 15,
        health: 600,
    },
    {
        en: { name: "Dragon" },
        ua: { name: "Дракон" },
        level: 20,
        health: 1200,
    },
];

const locations = [
    {
        en: {
            name: "town square",
            "button text": ["Inventory", "Go to shop", "Go to forest"],
            "button functions": [openInventory, goShop, goForest],
            text: 'You are in the town square. You see a sign that says "Shop".',
        },
        ua: {
            name: "Місто",
            "button text": ["Інвентар", "В магазин", "В ліс"],
            "button functions": [openInventory, goShop, goForest],
            text: "Ви на міській площі. Ви бачите вивіску з написом «Магазин».",
        },
    },
    {
        en: {
            name: "shop",
            "button text": [
                "Inventory",
                "Buy 15 health (10 gold)",
                "Buy weapon (100 gold)",
                "Go to town square",
            ],
            "button functions": [openInventory, buyHealth, buyWeapon, goTown],
            text: "You enter the shop.",
        },
        ua: {
            name: "Магазин",
            "button text": [
                "Інвентар",
                "15 здоровья (10 золотих)",
                "Зброя (100 золотих)",
                "В місто",
            ],
            "button functions": [openInventory, buyHealth, buyWeapon, goTown],
            text: "Ви зайшли в магазин.",
        },
    },
    {
        en: {
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
        ua: {
            name: "Ліс",
            "button text": [
                "Вовк",
                "Гоблін",
                "Скелет",
                "Цербер",
                "Дракон",
                "В місто",
            ],
            "button functions": [
                fightWolf,
                fightGoblin,
                fightSkeleton,
                fightCerber,
                fightDragon,
                goTown,
            ],
            text: "Ви заходите в ліс. Ви бачите деяких монстрів.",
        },
    },
    {
        en: {
            name: "fight",
            "button text": ["Attack", "Dodge", "Run"],
            "button functions": [attack, dodge, goTown],
            text: "You are fighting a monster.",
        },
        ua: {
            name: "бій",
            "button text": ["Атакувати", "Ухилятись", "Втікти"],
            "button functions": [attack, dodge, goTown],
            text: "Ви в бою з монстром.",
        },
    },
    {
        en: {
            name: "kill monster",
            "button text": [
                "Go to town square",
                "Go to town square",
                "Go to town square",
            ],
            "button functions": [goTown, goTown, goTown],
            text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
        },
        ua: {
            name: "вбитий монстер",
            "button text": ["В місто", "В місто", "В місто"],
            "button functions": [goTown, goTown, goTown],
            text: "Мостра повержено ! Ви знаходите золото та набираєтесь досвіду !",
        },
    },
    {
        en: {
            name: "lose",
            "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
            "button functions": [restart, restart, restart],
            text: "You die. ☠️",
        },
        ua: {
            name: "lose",
            "button text": ["ЗАНОВО?", "ЗАНОВО?", "ЗАНОВО?"],
            "button functions": [restart, restart, restart],
            text: "Ви мертві☠️",
        },
    },
    {
        en: {
            name: "win",
            "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
            "button functions": [restart, restart, restart],
            text: "You defeat the dragon! YOU WIN THE GAME! 🎉",
        },
        ua: {
            name: "win",
            "button text": ["ЗАНОВО?", "ЗАНОВО?", "ЗАНОВО?"],
            "button functions": [restart, restart, restart],
            text: "Дракон мертвий ! Ви перемогли 🎉",
        },
    },
];

button1.onclick = openInventory;
button2.onclick = goTown;
closeInventory.onclick = close;
winGameButton.onclick = restart;

enBtn.onclick = function () {
    language("en");
};
uaBtn.onclick = function () {
    language("ua");
};

function language(item) {
    lang = item;
    if (item === "ua") {
        const title = document.querySelector(".lang-title");
        title.innerText = "Оберіть вашу мову :";
        button1.innerText = "Інвентар";
        button2.innerText = "В місто";
        text.innerText = "Ви у лісі. Неподалік видніється місто.";
    }
    if (item === "en") {
        const title = document.querySelector(".lang-title");
        title.innerText = "Select your language :";
    }
    langWindow.style.opacity = "0";
    langWindow.style.pointerEvents = "none";
}

function update(location) {
    if (lang === "en") {
        button1.innerText = location.en["button text"][0];
        button2.innerText = location.en["button text"][1];
        button3.innerText = location.en["button text"][2];
        button4.innerText = location.en["button text"][3];
        button5.innerText = location.en["button text"][4];
        button6.innerText = location.en["button text"][5];
        button1.onclick = location.en["button functions"][0];
        button2.onclick = location.en["button functions"][1];
        button3.onclick = location.en["button functions"][2];
        button4.onclick = location.en["button functions"][3];
        button5.onclick = location.en["button functions"][4];
        button6.onclick = location.en["button functions"][5];
        text.innerText = location.en.text;
    }
    if (lang === "ua") {
        button1.innerText = location.ua["button text"][0];
        button2.innerText = location.ua["button text"][1];
        button3.innerText = location.ua["button text"][2];
        button4.innerText = location.ua["button text"][3];
        button5.innerText = location.ua["button text"][4];
        button6.innerText = location.ua["button text"][5];
        button1.onclick = location.ua["button functions"][0];
        button2.onclick = location.ua["button functions"][1];
        button3.onclick = location.ua["button functions"][2];
        button4.onclick = location.ua["button functions"][3];
        button5.onclick = location.ua["button functions"][4];
        button6.onclick = location.ua["button functions"][5];
        text.innerText = location.ua.text;
    }
}

function animationText() {
    if (windowWidth > 768) {
        text.classList.remove("animate-message");
        void text.offsetWidth;
        text.classList.add("animate-message");
    }
    if (windowWidth < 768) {
        text.classList.remove("animate-message");
    }
}

animationText();

function goTown() {
    update(locations[0]);
    backGround.style.backgroundImage = 'url("css/img/backgraunds/city.webp")';
    if (windowWidth < 768) {
        knight.style.top = "75%";
        knight.style.left = "20%";
        knight.style.width = "10%";
        knight.style.animation = "bounce 5s ease-in-out infinite";
    } else {
        knight.style.top = "75%";
        knight.style.left = "40%";
        knight.style.width = "100px";
        knight.style.animation = "bounce 5s ease-in-out infinite";
    }

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
    if (windowWidth < 768) {
        knight.style.top = "75%";
        knight.style.left = "10%";
        knight.style.width = "20%";
    } else {
        knight.style.width = "130px";
        knight.style.top = "70%";
    }
    button3.style.display = "block";
    button4.style.display = "block";
    if (inventory.length === 3) {
        button3.style.display = "none";
    }
    animationText();
    close();
}

function goForest() {
    update(locations[2]);
    backGround.style.backgroundImage =
        'url("css/img/backgraunds/forest_bg.webp")';
    knight.style.animation = "bounceKnight 3s ease-in-out infinite";
    knight.style.top = "65%";
    knight.style.left = "30%";

    if (windowWidth < 768) {
        knight.style.top = "70%";
        knight.style.left = "10%";
        knight.style.width = "10%";
    }

    animationText();
    monsters.style.display = "block";
    button3.style.display = "block";
    button4.style.display = "block";
    button5.style.display = "block";
    button6.style.display = "block";
    button6.style.marginLeft = "200px";
    if (windowWidth < 768) {
        button6.style.marginLeft = "2px";
        allButton.style.bottom = "-85px";
    }
    close();
}

function openInventory() {
    inventoryBox.style.display = "block";
    inventoryBox.classList.remove("hiden");
    if (inventory.includes("stick") || inventory.includes("дубина")) {
        stick.style.display = "block";
    }
    if (inventory.includes("dager") || inventory.includes("кинджал")) {
        dager.style.display = "block";
    }
    if (inventory.includes("sword") || inventory.includes("меч")) {
        sword.style.display = "block";
    }
    if (inventory.length === 0) {
        knight.src = "./css/img/knights/knight.webp";
    }
}

function close() {
    inventoryBox.classList.add("hiden");
}

stick.onclick = equipStick;
dager.onclick = equipDager;
sword.onclick = equipSword;

function equipStick() {
    knight.src = "./css/img/knights/knight_stick.webp";
    fighting = 20;
    dmgText.innerText = "20";
    close();
}

function equipDager() {
    knight.src = "./css/img/knights/knight_dager.webp";
    fighting = 50;
    dmgText.innerText = 50;
    close();
}

function equipSword() {
    knight.src = "./css/img/knights/knight_sword.webp";
    fighting = 75;
    dmgText.innerText = 75;
    close();
}

function dmgMetr() {
    if (weapons.length < 1) {
        fighting = 10;
        dmgText.innerText = "10";
    }
    if (inventory.includes("stick") || inventory.includes("дубина")) {
        fighting = 20;
        dmgText.innerText = "20";
    }
    if (inventory.includes("dager") || inventory.includes("кинджал")) {
        fighting = 50;
        dmgText.innerText = 50;
    }
    if (inventory.includes("sword") || inventory.includes("меч")) {
        fighting = 75;
        dmgText.innerText = 75;
    }
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 15;
        goldText.innerText = gold;
        hpText.innerText = health;
    } else {
        animationText();
        if (lang === "en") {
            text.innerText = "You do not have enough gold to buy health.";
        }
        if (lang === "ua") {
            text.innerText = "У вас недостатньо золота, щоб купити здоров'я.";
        }
    }
}

function buyWeapon() {
    animationText();
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 100) {
            gold -= 100;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon;

            if (lang === "en") {
                newWeapon = weapons[currentWeapon].en.name;
                text.innerText = "You now have a " + newWeapon + ".";
            } else if (lang === "ua") {
                newWeapon = weapons[currentWeapon].ua.name;
                text.innerText =
                    "Тепер у вас є нова зброя - " + newWeapon + ".";
            }
            inventory.push(newWeapon);
            if (lang === "en") {
                text.innerText += " In your inventory you have: " + inventory;
            } else if (lang === "ua") {
                newWeapon = weapons[currentWeapon].ua.name;
                text.innerText = text.innerText +=
                    " У вашому інвентарі є: " + inventory;
            }

            if (inventory.includes("stick") || inventory.includes("дубина")) {
                knight.src = "./css/img/knights/knight_stick.webp";
            }
            if (inventory.includes("dager") || inventory.includes("кинджал")) {
                knight.src = "./css/img/knights/knight_dager.webp";
            }
            if (inventory.includes("sword") || inventory.includes("меч")) {
                knight.src = "./css/img/knights/knight_sword.webp";
            }
            dmgMetr();
        } else {
            if (lang === "en") {
                text.innerText = "You do not have enough gold to buy a weapon.";
            }
            if (lang === "ua") {
                text.innerText = "У вас недостатньо золота, щоб купити зброю.";
            }
        }
    } else {
        if (lang === "en") {
            text.innerText = "You already have the most powerful weapon!";
        }
        if (lang === "ua") {
            text.innerText = "У вас вже є найпотужніша зброя!";
        }
    }
    if (inventory.length === 3) {
        button3.style.display = "none";
    }
}

function fightWolf() {
    targetMonster.src = "./css/img/monsters/wolf.webp";
    targetMonster.classList = "";
    targetMonster.classList.add("wolf");
    targetMonster.style.animation = "";
    targetMonster.style.filter = "";

    monsterStats.style.display = "flex";
    if (lang === "ua") {
        monsterName.innerText = monster[0].ua.name;
    }
    if (lang === "en") {
        monsterName.innerText = monster[0].en.name;
    }
    monsterHealthText.innerText = monster[0].health;
    monsterLvl.innerText = monster[0].level;

    fighting = 0;
    goFight();
}

function fightGoblin() {
    targetMonster.src = "./css/img/monsters/goblin.webp";
    targetMonster.classList = "";
    targetMonster.classList.add("goblin");
    targetMonster.style.animation = "";
    targetMonster.style.filter = "";

    monsterStats.style.display = "flex";
    monsterStats.style.display = "flex";
    if (lang === "ua") {
        monsterName.innerText = monster[1].ua.name;
    }
    if (lang === "en") {
        monsterName.innerText = monster[1].en.name;
    }
    monsterHealthText.innerText = monster[1].health;
    monsterLvl.innerText = monster[1].level;

    fighting = 1;
    goFight();
}

function fightSkeleton() {
    targetMonster.src = "./css/img/monsters/skeleton.webp";
    targetMonster.classList = "";
    targetMonster.classList.add("skeleton");
    targetMonster.style.animation = "";
    targetMonster.style.filter = "";

    monsterStats.style.display = "flex";
    monsterStats.style.display = "flex";
    if (lang === "ua") {
        monsterName.innerText = monster[2].ua.name;
    }
    if (lang === "en") {
        monsterName.innerText = monster[2].en.name;
    }
    monsterHealthText.innerText = monster[2].health;
    monsterLvl.innerText = monster[2].level;

    fighting = 2;
    goFight();
}

function fightCerber() {
    targetMonster.src = "./css/img/monsters/cerber.webp";
    targetMonster.classList = "";
    targetMonster.classList.add("cerber");
    targetMonster.style.animation = "";
    targetMonster.style.filter = "";

    monsterStats.style.display = "flex";
    monsterStats.style.display = "flex";
    if (lang === "ua") {
        monsterName.innerText = monster[3].ua.name;
    }
    if (lang === "en") {
        monsterName.innerText = monster[3].en.name;
    }
    monsterHealthText.innerText = monster[3].health;
    monsterLvl.innerText = monster[3].level;

    fighting = 3;
    goFight();
}

function fightDragon() {
    targetMonster.src = "./css/img/monsters/dragon.webp";
    targetMonster.classList = "";
    targetMonster.classList.add("dragon");
    targetMonster.style.animation = "";
    targetMonster.style.filter = "";

    monsterStats.style.display = "flex";
    monsterStats.style.display = "flex";
    if (lang === "ua") {
        monsterName.innerText = monster[4].ua.name;
    }
    if (lang === "en") {
        monsterName.innerText = monster[4].en.name;
    }
    monsterHealthText.innerText = monster[4].health;
    monsterLvl.innerText = monster[4].level;

    fighting = 4;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monster[fighting].health;
    targetMonster.style.display = "block";
    button4.style.display = "none";
    button5.style.display = "none";
    button6.style.display = "none";
}

targetMonster.onclick = attack;

function attack() {
    animationText();
    if (lang === "en") {
        text.innerText = "The " + monster[fighting].en.name + " attacks.";
        text.innerText +=
            " You attack it with your " + weapons[currentWeapon].en.name + ".";
    }
    if (lang === "ua") {
        text.innerText = monster[fighting].ua.name + " атакує !";
        text.innerText +=
            " Ви атакуєте його своїм " + weapons[currentWeapon].ua.name + "ом.";
    }
    health -= getMonsterAttackValue(monster[fighting].level);
    monsterDmg.innerText = getMonsterAttackValue(monster[fighting].level);
    if (isMonsterHit()) {
        monsterHealth -=
            weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        if (lang === "en") {
            text.innerText = " You miss.";
        }
        if (lang === "ua") {
            text.innerText = "Ви промахнулися.";
        }
    }
    hpText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 4 ? winGame() : defeatMonster();
    }
}

function getMonsterAttackValue(level) {
    const hit = level * 5 - Math.floor(Math.random() * xp);
    return hit > 0 ? hit : 0;
}

function isMonsterHit() {
    return Math.random() > 0.2 || health < 20;
}

function dodge() {
    animationText();
    if (lang === "en") {
        text.innerText =
            "You dodge the attack from the " + monster[fighting].en.name;
    }
    if (lang === "ua") {
        text.innerText =
            "Ви ухиляєтеся від атаки " + monster[fighting].ua.name + "a";
    }
}

function lose() {
    update(locations[5]);
    animationText();
    knight.style.filter = "brightness(20%)";
    knight.style.top = "75%";
    knight.style.animation = "lose 2s ease 0s 1 normal forwards";
}

function restart() {
    xp = 0;
    xpText.innerText = xp;
    health = 100;
    hpText.innerText = health;
    gold = 50;
    goldText.innerText = gold;
    currentWeapon = 0;
    inventory = [];
    knight.style.filter = "none";
    winGameWindow.style.opacity = "0";
    winGameWindow.style.pointerEvents = "none";
    goTown();
}

function defeatMonster() {
    gold += Math.floor(monster[fighting].level * 6.7);
    xp += monster[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
    targetMonster.style.filter = "brightness(20%)";
    targetMonster.style.animation =
        "defeatMonster 2s ease 0s 1 normal forwards";
}

function winGame() {
    update(locations[6]);
    button4.style.display = "none";
    button5.style.display = "none";
    button6.style.display = "none";
    winGameWindow.style.opacity = "1";
    setTimeout(function () {
        winGameWindow.style.pointerEvents = "inherit";
    }, 1);
}
