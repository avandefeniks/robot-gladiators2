let playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

let enemyInfo = [
    {
        name: "Roboto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Rumble",
        attack: randomNumber(10, 14)
    }
];

function fight(enemy) {
    // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove player's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }// end of while loop

}; // end of fight function


function startGame() {
    // reset player stats
    // playerInfo.health = 100;
    // playerInfo.attack = 10;
    // playerInfo.money = 10;
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // debugger
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(11, 30);
            // enemy.health = Math.floor(Math.random() * 11) + 19;
            // call fight function with enemy robot
            fight(pickedEnemyObj);

            // if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to go to the store before the next round
                let storeConfirm = window.confirm("The fight is over. Visit the store before the next round?");

                // if yes, take them to the shop
                if (storeConfirm) {
                    shop();
                }

            }
        }

    }

    // startGame();
    endGame();
};

function endGame() {
    // if player is still alive, player wins
    if (playerInfo.health > 0) {
        // window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
        window.alert("The game has ended. Let's see how you did!");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    // check local storage for high score, if it's not there, use 0
    let highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    // if player has more money than the high score, player has new high score!
    // debugger
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they want to play again
    let playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
    
};

function shop() {
    // console.log("entered the shop");
    // ask player what they'd like to do
    let shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 " +
        "to 'REFILL HEALTH', 2 to 'UPGRADE ATTACK', or 3 to 'LEAVE.'");

        shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            // do nothing so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Please try again.");
            // call shop function again
            shop();
            break;
    }
};

// function to generate a ramdom numeric value
function randomNumber(min, max) {
    let value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// function to set name
function getPlayerName() {
    let name = "";

    // function logic
    while (name === "" || name === null) {
        name = prompt("What is your robots name?");
    }

    console.log("Your robots name is " + name);
    return name;
};

// function to fight or skip
function fightOrSkip() {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // conditional recursive function call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            
            // return true if player wants to leave
            return true;
        } 
        else {
            return false;
        }
    }
}

startGame();