let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["लाठी"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'लाठी', power: 5 },
  { name: 'भाला', power: 30 },
  { name: 'तलवार', power: 50 },
  { name: 'बन्दुक', power: 100 }
];
const monsters = [
  {
    name: "जंगली कुत्ता",
    level: 2,
    health: 15
  },
  {
    name: "जंगली भेड़िया",
    level: 8,
    health: 60
  },
  {
    name: "राक्षस",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["दुकान पर जाओ", "गुफा में जाओ", "राक्षस से लड़ो"],
    "button functions": [goStore, goCave, fightDragon],
    text: "आप शहर के चौराहे पर हैं. और आपको एक साइन बोर्ड दिखाई देता है \"दुकान\"."
  },
  {
    name: "store",
    "button text": ["स्वास्थ्य किट खरीदे (10 सोने की मुहरे)", "हथियार खरीदे (30 सोने की मुहरे)", "चौराहे पर जाये"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "आपने दुकान में प्रवेश किया।"
  },
  {
    name: "cave",
    "button text": ["जंगली कुत्ते से लड़े ", "जंगली भेड़िये से लड़े", "चौराहे पर जाये"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "तुमने गुफा में प्रवेश किया, और तुम्हें एक राक्षस दिखाई देता है।"
  },
  {
    name: "fight",
    "button text": ["आक्रमण करे", "अपनी रक्षा करे ", "बचकर बाग जाये"],
    "button functions": [attack, dodge, goTown],
    text: "आप एक राक्षस से लड़ रहे हैं."
  },
  {
    name: "kill monster",
    "button text": ["चौराहे पर जाये", "चौराहे पर जाये", "चौराहे पर जाये"],
    "button functions": [goTown, goTown, goTown],
    text: 'राक्षस चिल्लाता है "आर्ग!" जैसे यह मर जाता है. आप अनुभव अंक प्राप्त करते हैं और सोना पाते हैं।'
  },
  {
    name: "lose",
    "button text": ["दोबारा खेले ?", "दोबारा खेले ?", "दोबारा खेले ?"],
    "button functions": [restart, restart, restart],
    text: "तुम मर गये. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["दोबारा खेले ?", "दोबारा खेले ?", "दोबारा खेले ?"], 
    "button functions": [restart, restart, restart], 
    text: "आपने राक्षस को हरा दिया! आप गेम जीत गए! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "चौराहे पर जाये?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "आपको एक गुप्त पर पहुंच गए है . ऊपर कोई संख्या चुनें. 0 और 10 के बीच दस संख्याएँ यादृच्छिक रूप से चुनी जाएंगी। यदि आपके द्वारा चुनी गई संख्या यादृच्छिक संख्याओं में से किसी एक से मेल खाती है, तो आप जीत जायेंगे!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "आपके पास स्वास्थ्य खरीदने के लिए पर्याप्त सोना नहीं है।";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "अब आपके पास एक " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " आपके शस्त्रागार में आपके पास है: " + inventory;
    } else {
      text.innerText = "आपके पास हथियार खरीदने के लिए पर्याप्त सोना नहीं है।";
    }
  } else {
    text.innerText = "आपके पास पहले से ही सबसे शक्तिशाली हथियार है!";
    button2.innerText = "15 सोने की मुहरों के लिए हथियार बेचें";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "आपने बेच दिया एक " + currentWeapon + ".";
    text.innerText += " आपके शस्त्रागार में आपके पास है: " + inventory;
  } else {
    text.innerText = "अपना एकमात्र हथियार मत बेचो!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "भयानक " + monsters[fighting].name + " आक्रमण करता है";
  text.innerText += " आप इस पर अपने " + weapons[currentWeapon].name + " से हमला करते है";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " आप चूक गए ";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " आपका " + inventory.pop() + " खत्म हो गया है";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "आप हमले से बच जाते हैं " + monsters[fighting].name +" के";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "आपने चुना " + guess + ". ये कुछ  यादृच्छिक संख्याएं हैं:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "सही! आप 20 स्वर्ण जीतें!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "गलत! आपने 10 स्वास्थ्य किट  खो दी  हैं!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}