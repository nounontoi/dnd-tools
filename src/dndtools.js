// Random number generator
function randomIntGenerator(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// +/- buttons
function modifyRollCountValue(value) {
    a = document.getElementById("rollCount").value;
    document.getElementById("rollCount").value = Number(a) + value;
}

function modifyRollModifierValue(value) {
    a = document.getElementById("modifier").value;
    document.getElementById("modifier").value = Number(a) + value;
}

function modifyInitiativeModifierValue(value) {
    a = document.getElementById("initiativeModifier").value;
    document.getElementById("initiativeModifier").value = Number(a) + value;
}

let rolledJSON = [];

function rollDice(sides) {
    const results = {};
    rollCount = document.getElementById("rollCount").value;
    modifier = document.getElementById("modifier").value;
    const rollResults = [];
    const rollResultsMod = [];
    for (i = 0; i < rollCount; i++) {
        roll = randomIntGenerator(1, sides + 1)
        rollResults[i] = roll;
        rollResultsMod[i] = roll + Number(modifier);
    }
    results.sides = sides;
    results.rolls = rollResults;
    results.rollsMod = rollResultsMod;
    results.modifier = modifier;
    results.sum = rollResultsMod.reduce((partialSum, a) => partialSum + a, 0);
    rolledJSON.push(results);
    window.localStorage.setItem("rollHistory", JSON.stringify(rolledJSON));
    updateHistory();
    console.log(rolledJSON);
}

function rollInitiative() {
    const results = {};
    roll = randomIntGenerator(1, 21)
    modifier = document.getElementById("initiativeModifier").value;
    results.sides = "Initiative";
    results.roll = roll;
    results.rollMod = Number(roll) + Number(modifier);
    results.modifier = modifier;
    rolledJSON.push(results);
    window.localStorage.setItem("rollHistory", JSON.stringify(rolledJSON));
    updateHistory();
    console.log(rolledJSON);
}

function displayHistory(rollType, rolls, modifier, total) {
    document.getElementById("rollResults").innerHTML = "<span style='font-size: 40px'>" + rollType + "</span><br>" + rolls + "<br>Modifier: " + modifier + "<br>Total: " + total;
    document.getElementById("rollHistory").insertAdjacentHTML("afterbegin", "<div class='historyElements'><span style='color: #FFE1A8'>" + rollType + "</span><br>" + rolls + "<br>Modifier: " + modifier + "<br>Total: " + total + "</div>");
}

function updateHistory(clear = false) {
    if (!window.localStorage.getItem("rollHistory")) {
        return;
    }

    if (clear) {
        rolledJSON = [];
        window.localStorage.removeItem("rollHistory");
        document.getElementById("rollHistory").innerHTML = "";
        return;
    }

    document.getElementById("rollHistory").innerHTML = "";
    rolledJSON = JSON.parse(window.localStorage.getItem("rollHistory"));
    for (const rollI of rolledJSON) {
        if (rollI.sides == "Initiative") {
            sides = rollI.sides;
            roll = rollI.roll;
            modifier = rollI.modifier;
            total = rollI.rollMod;
            displayHistory(sides, roll, modifier, total);
        }
        else {
            sides = "d" + rollI.sides;
            rolls = rollI.rolls;
            modifier = rollI.modifier;
            sum = rollI.sum;
            displayHistory(sides, rolls, modifier, sum);
        }
    }
}

function validateCount() {
    a = document.getElementById("rollCount").value;
    if (a < 1) {
        document.getElementById("rollCount").value = 1;
    }
    else if (a > 99) {
        document.getElementById("rollCount").value = 99;
    }
}