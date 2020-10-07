// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robotss
//    * Defeat each enemy robots
// "LOSE" - Player robot's health is zero or less


var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth, playerMoney);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"]; 
var enemyHealth = 50;
var enemyAttack = 12;

// create function
var fight = function(enemyName) {
    //repeat and execute aas long as the enemy robot is alive
    while(enemyHealth > 0  && playerHealth > 0) {
  // ask the user to fight or skip battle prompt
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
 
  // if player choses to skip
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    //if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to quit this fight. Goodbye!");
      //subtract money from playerMoney for skipping
      playerMoney = Math.max(0, playerMoney - 10);
      console.log("playerMoney", playerMoney);
      break;
    }
}

// if player choses to fight, then fight
if (promptFight === "fight" || promptFight === "FIGHT") {
    //generate random damage value based on player's attack power
    var damage = randomNumber(playerAttack - 3, playerAttack)
    // remove enemy's health by subtracting the amount set in the damage variable
    enemyHealth = Math.max(0, enemyHealth - damage);
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );
  
    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");
      //award player money for winning
      playerMoney = playerMoney + 20;
      //exit loop if enemyHealth goes below 0
      break;

    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
  
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    // remove player's health by subtracting the amount set in the damage variable
    playerHealth = Math.max(0, playerHealth - damage);
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );
  
    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      //exit loop if playerHealth goes below 0
      break;

    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }

    }
     else {
      window.alert("You need to pick a valid option. Try again!");
    }
  }
}

// function to start a new game
var startGame = function() {
  //reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

for(var i = 0; i < enemyNames.length; i++) {
  // check on the state of the player robot's health
  if (playerHealth > 0) {
    //let user know what round, remember array starts at 0 so it needs to have 1 added to it
    window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );

    //pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];
    //reset enemy health before new fight with randomized health value between 40-60
    enemyHealth = randomNumber(40, 60);
    //use debugger to pause script from running and check what's going on at that moment in the code
    //debugger;

    //pass the pickedEnemyName variable's value into the fight function, where it will asume the value of the enemyName parameter
    fight(pickedEnemyName);

    //if the player is still alive and we're not at the last enemy in the array
    if (playerHealth > 0 && i < enemyNames.length -1) {
      // ask if user wants to use the store before next round
      var storeConfirm = window.confirm("The fight is over, visit the store before next round?");

      // if yes, take them to the store() function
      if (storeConfirm) {
      shop();
      }
    }
  } 
  if (playerHealth <= 0) {
    window.alert("You have lost your robot in battle! Game Over!");
    break;
    }
  }

  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
}

//function to end the entire game
var endGame = function() {
  // if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  }
  else {
    window.alert ("You've lost your robot in battle.");
  }
  // ask player if they would like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// function for the shop
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  
  // ise switch to carry out action
  switch (shopOptionPrompt) {
    case "refill":
    case "REFILL":
      if (playerMoney >= 7) {
      window.alert("Refilling player's heaalth by 20 for 7 dollars.");

      //increase health and decrease money
      playerHealth = playerHealth + 20;
      playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }

      break;
    case "upgrade":
    case "UPGRADE":
      if (playerMoney >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");

      //increase attack and decrease money
      playerAttack = playerAttack + 6;
      playerMoney = playerMoney -7;
      }
      else {
        window.alert("You don't have enough money!");
      }

      break;
    case "leave":
    case "LEAVE":
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again!");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// function to generate a random numeritcal value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

//start the game when the page loads
startGame();