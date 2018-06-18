//
//
// create variable for starWarsRPG object 
var starWarsRPG = {
    characterName: "", 
    characterId: "", 
    characterProfile: {},
    enemyName: "", 
    enemyId: "", 
    enemyProfile: {}, 
    profileArray: ["luke","leia","vader","sidious"], 
    profiles: [ 
        {hp: 120, attack: 8, counterAttack: 15}, 
        {hp: 100, attack: 15, counterAttack: 5}, 
        {hp: 150, attack: 5, counterAttack: 20}, 
        {hp: 180, attack: 3, counterAttack: 25}
    ], 
    playerProfile: {
        hp: 0,
        attack: 0
    }, 
    opponentProfile: {
        hp: 0, 
        counterAttack: 0
    }, 
    // method to shuffle array that will be used to assign player profiles randomly each round 
    shuffle: function () {
        var currentIndex = this.profileArray.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = this.profileArray[currentIndex];
          this.profileArray[currentIndex] = this.profileArray[randomIndex];
          this.profileArray[randomIndex] = temporaryValue;
        }

        return this.profileArray;
    }, 
    // method to assign profile to character 
    assignProfile: function (character) {
        if (character === this.characterId) {
            var profileNum = this.profileArray.indexOf(this.characterId);
            this.characterProfile = this.profiles[profileNum];
        } else {
            var profileNum = this.profileArray.indexOf(this.enemyId);
            this.enemyProfile = this.profiles[profileNum];
        }
    }, 
    // method to set initial hp and attack for player and enemy objects 
    setStats: function (character) {
        if (character === this.characterId) {
            this.playerProfile.hp = this.characterProfile.hp;
            this.playerProfile.attack = this.characterProfile.attack;
        } else {
            this.opponentProfile.hp = this.enemyProfile.hp;
            this.opponentProfile.counterAttack = this.enemyProfile.counterAttack;
        }
    }, 
    // method to replace HTML text of banner message to select enemy 
    selectEnemyMessage: function () {
        $("#banner-message").text("Click on a character to select your first opponent");
    }, 
    // method to replace HTML text of banner message to begin battle 
    beginBattleMessage: function () {
        $("#banner-message").text("Click on your opponent to attack!");
    }, 
    // method to replace banner with reset button 
    createResetButton: function () {
        $("#banner-message").text("");
        $("<button>Reset</button>").appendTo("#banner-message").attr("id","reset-btn");
    }, 
    // method to write HTML text for chosen fighter message 
    yourFighter: function () {
        var chosenFighterMessage = "You've chosen " + this.characterName + "!";
        $("#message-one").text(chosenFighterMessage);
    }, 
    // method to write HTML text for chosen enemy message 
    yourEnemy: function() {
        var chosenEnemyMessage = "Your next opponent is " + this.enemyName + "!";
        $("#message-two").text(chosenEnemyMessage);
    }, 
    // method to append insignia of chosen fighter to attack button column 
    appendInsignia: function () {
        if (this.characterId === "leia" || this.characterId === "luke") {
            $("#insignia").attr("src", "assets/images/alliance-insignia.png");
        } else {
            $("#insignia").attr("src", "assets/images/empire-insignia.png");
        }
    }, 
    // method to move chosen opponent to container in battle area 
    toEnemyContainer: function() {
        if ($("#enemy-container").is(':empty')) {
            var chosenEnemy = this.enemyId;
            $("#" + chosenEnemy).appendTo("#enemy-container");
            this.beginBattleMessage();
        }
    }, 
    // method to move chosen fighter to container in battle area 
    toFighterContainer: function() {
        if ($("#fighter-container").is(':empty')) {
            var chosenFighter = this.characterId;
            $("#" + chosenFighter).appendTo("#fighter-container");
            this.appendInsignia();
            this.selectEnemyMessage();
        }
    }, 
    // method to create HTML for player profile stats 
    displayStats: function (character) {
        if (character === this.characterId) {
            var fighterHP = this.playerProfile.hp;
            var fighterAttack = this.playerProfile.attack;
            var fighterCounterAttack = this.characterProfile.counterAttack;
            $("<div>").appendTo("#fighter-column").attr("id","playerHealth").text("Health Points: " + fighterHP);
            $("<div>").appendTo("#fighter-column").attr("id","playerAttack").text("Attack Damage: " + fighterAttack);
        } else {
            var enemyHP = this.opponentProfile.hp;
            var enemyAttack = this.enemyProfile.attack;
            var enemyCounterAttack = this.enemyProfile.counterAttack;
            $("<div>").appendTo("#enemy-column").attr("id","enemyHealth").text("Health Points: " + enemyHP);
            $("<div>").appendTo("#enemy-column").attr("id","enemyCounterAttack").text("Counter Attack: " + enemyCounterAttack);
        }
    }, 
    // method to handle attack 
    attackHandler: function () {
        this.opponentProfile.hp -= this.playerProfile.attack;
        this.playerProfile.attack += this.playerProfile.attack;
        this.playerProfile.hp -= this.opponentProfile.counterAttack;
        $("#enemyHealth").text("Health Points: " + this.opponentProfile.hp);
        $("#playerAttack").text("Attack Damage: " + this.playerProfile.attack);
        $("#playerHealth").text("Health Points: " + this.playerProfile.hp);
        $("#message-one").text("You inflicted " + this.playerProfile.attack + " points damage!");
        $("#message-two").text(this.enemyName + " countered " + this.opponentProfile.counterAttack + " points!");
    }, 
    // method to handle defeated enemy character 
    defeatedEnemy: function () {
        if ($("#defeated-characters").children().length === 2) {
            var defeatedCharacter = starWarsRPG.enemyId;
            $("#" + defeatedCharacter).appendTo("#defeated-characters");
            $("#message-one").text("You have defeated " + this.enemyName + "!");
            $("#message-two").text("Please select your next opponent.");
            $("#enemyHealth").remove();
            $("#enemyCounterAttack").remove();
            this.winHandler();
        } else {
            var defeatedCharacter = starWarsRPG.enemyId;
            $("#" + defeatedCharacter).appendTo("#defeated-characters");
            $("#message-one").text("You have defeated " + this.enemyName + "!");
            $("#message-two").text("Please select your next opponent.");
            $("#enemyHealth").remove();
            $("#enemyCounterAttack").remove();
        }
    }, 
    // method to handle reset 
    resetButtonHandler: function () {
        this.gameReset();
        this.selectEnemyMessage();
    }, 
    gameReset: function () {
        $("#" + this.characterId).appendTo("#staging-area");
        $("#" + this.enemyId).appendTo("#staging-area");
        $("#defeated-characters").children().appendTo("#staging-area");
        $("#message-one").text("");
        $("#message-two").text("");
        $("#enemyHealth").remove();
        $("#playerHealth").remove();
        $("#enemyCounterAttack").remove();
        $("#playerAttack").remove();
        $("#insignia").attr("src","");
    }, 
    // method to handle win 
    winHandler: function () {
        $("#message-one").text("You have defeated all enemies!");
        if (this.characterId === "luke" || this.characterId === "leia") {
            $("#message-two").text("The Rebellion Prevails!");
        } else {
            $("#message-two").text("The Empire Prevails!");
        }
        alert("You defeated all your enemies! Game will now reset.")
        this.gameReset();
    }, 
    // method to handle loss 
    lossHandler: function () {
        $("#message-one").text("You have been defeated by " + this.enemyId + "!");
        if (this.characterId === "luke" || this.characterId === "leia") {
            $("#message-two").text("The Empire Prevails!");
        } else {
            $("#message-two").text("The Rebellion Prevails!");
        }
        alert("You have been defeated! Game will now reset.")
        this.gameReset();
    }
}

// fix endless character selection bug
// clean up defeated enemy method

$(document).ready(function() {

    $("img").on("click",function() {
        starWarsRPG.shuffle();
        if ($("#fighter-container").is(':empty')) {
            starWarsRPG.characterName = $(this).attr("name");
            starWarsRPG.characterId = $(this).attr("id");
            starWarsRPG.toFighterContainer();
            starWarsRPG.yourFighter();
            starWarsRPG.assignProfile(starWarsRPG.characterId);
            starWarsRPG.setStats(starWarsRPG.characterId);
            starWarsRPG.displayStats(starWarsRPG.characterId);
        } else if ($("#enemy-container").is(':empty')) {
            starWarsRPG.enemyName = $(this).attr("name");
            starWarsRPG.enemyId = $(this).attr("id");
            starWarsRPG.toEnemyContainer();
            starWarsRPG.yourEnemy();
            starWarsRPG.assignProfile(starWarsRPG.enemyId);
            starWarsRPG.setStats(starWarsRPG.enemyId);
            starWarsRPG.displayStats(starWarsRPG.enemyId);
        }
    });
    $("#enemy-container").on("click", function () {
        starWarsRPG.createResetButton();
        if ((starWarsRPG.playerProfile.hp > starWarsRPG.opponentProfile.counterAttack) && 
        starWarsRPG.opponentProfile.hp > starWarsRPG.playerProfile.attack) {
            starWarsRPG.attackHandler();
        } else if (starWarsRPG.opponentProfile.hp <= starWarsRPG.playerProfile.attack) {
            starWarsRPG.defeatedEnemy();
        } else if (starWarsRPG.playerProfile.hp <= starWarsRPG.opponentProfile.counterAttack) {
            
        }
    });
    $(document).on("click", "#reset-btn", function () {
        console.log("reset");
        starWarsRPG.resetButtonHandler();
    });
   
});